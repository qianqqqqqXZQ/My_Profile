/* eslint-disable react/no-unknown-property */
'use client'

import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import * as THREE from 'three'
import cardGLB from '../assets/lanyard/profile-card.glb'
import lanyardTexture from '../assets/lanyard/lanyard.png'
import './ProfileLanyard.css'

extend({ MeshLineGeometry, MeshLineMaterial })

const COMPOSITION_SCALE = 2
const CARD_VISUAL_SCALE = COMPOSITION_SCALE * 0.7
const CARD_ATTACHMENT_Y = 1.5 * CARD_VISUAL_SCALE
const ANCHOR_Y_OFFSET = 6.35
const DESKTOP_DRAG_MAX_STEP = 0.85
const MOBILE_DRAG_MAX_STEP = 1.15
const DESKTOP_MAX_SPIN = 10
const MOBILE_MAX_SPIN = 14

function supportsWebGL() {
  if (typeof window === 'undefined') {
    return false
  }

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('webgl2') || canvas.getContext('webgl')

  context?.getExtension('WEBGL_lose_context')?.loseContext()
  return Boolean(context)
}

class LanyardSceneBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    this.props.onError()
  }

  render() {
    return this.state.hasError ? null : this.props.children
  }
}

export default function ProfileLanyard({
  position = [0, 0, 28],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  paused = false,
}) {
  const layoutRef = useRef(null)
  const hitAreaRef = useRef(null)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  const [canRenderScene, setCanRenderScene] = useState(false)
  const [hasSceneError, setHasSceneError] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setCanRenderScene(supportsWebGL())
  }, [])

  const handleContextLoss = (event) => {
    event.preventDefault()
    setHasSceneError(true)
  }

  return (
    <div ref={layoutRef} className="lanyard-wrapper" style={{ pointerEvents: 'none' }} aria-label="Profile lanyard widget">
      {canRenderScene && !hasSceneError ? createPortal(
        <div className="lanyard-viewport" aria-hidden="true">
          <div ref={hitAreaRef} className="lanyard-hit-area" />
          <LanyardSceneBoundary onError={() => setHasSceneError(true)}>
            <Canvas
              camera={{ position, fov, manual: true }}
              eventSource={hitAreaRef}
              eventPrefix="client"
              dpr={[1, isMobile ? 1.25 : 1.5]}
              frameloop={paused ? 'never' : 'always'}
              gl={{ alpha: transparent, antialias: !isMobile, powerPreference: 'high-performance' }}
              onCreated={({ gl }) => {
                gl.domElement.addEventListener('webglcontextlost', handleContextLoss, { once: true })
              }}
            >
              <LayoutCamera layoutRef={layoutRef} />
              <ambientLight intensity={2.4} />
              <directionalLight position={[4, 7, 5]} intensity={3.2} />
              <directionalLight position={[-5, 2, -3]} intensity={1.4} color="#b9d5ff" />
              <Suspense fallback={null}>
                <Physics gravity={gravity} timeStep={isMobile ? 1 / 24 : 1 / 45}>
                  <Band isMobile={isMobile} paused={paused} hitAreaRef={hitAreaRef} />
                </Physics>
              </Suspense>
            </Canvas>
          </LanyardSceneBoundary>
        </div>,
        document.body,
      ) : null}
    </div>
  )
}

// Expand the original projection to the viewport without changing the composition.
// The placeholder retains all of the existing responsive layout dimensions.
function LayoutCamera({ layoutRef }) {
  const previous = useRef('')
  useFrame(({ camera, size }) => {
    const rect = layoutRef.current?.getBoundingClientRect()
    if (!rect?.width || !rect.height) return
    const dimensions = `${rect.left},${rect.top},${rect.width},${rect.height},${size.width},${size.height}`
    if (previous.current === dimensions) return
    camera.setViewOffset(rect.width, rect.height, -rect.left, -rect.top, size.width, size.height)
    previous.current = dimensions
  }, -100)
  return null
}

function cross(a, b, c) {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)
}

// Only the projected card receives DOM events. The rest of the overlay lets
// links, scrolling, and the background's pointer interactions pass through.
function updateHitArea(area, corners, points, visual, camera, size, dragged) {
  if (!area || !visual) return
  if (dragged) {
    area.style.clipPath = 'none'
    return
  }
  visual.updateWorldMatrix(true, false)
  points.forEach((point, index) => {
    point.copy(corners[index]).applyMatrix4(visual.matrixWorld).project(camera)
    point.x = (point.x + 1) * size.width / 2
    point.y = (1 - point.y) * size.height / 2
  })
  const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y)
  const hull = []
  for (const point of sorted) {
    while (hull.length > 1 && cross(hull.at(-2), hull.at(-1), point) <= 0) hull.pop()
    hull.push(point)
  }
  const lowerLength = hull.length
  for (let index = sorted.length - 2; index >= 0; index--) {
    const point = sorted[index]
    while (hull.length > lowerLength && cross(hull.at(-2), hull.at(-1), point) <= 0) hull.pop()
    hull.push(point)
  }
  hull.pop()
  area.style.clipPath = `polygon(${hull.map(p => `${p.x.toFixed(1)}px ${p.y.toFixed(1)}px`).join(',')})`
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, paused = false, hitAreaRef }) {
  const band = useRef()
  const fixed = useRef()
  const j1 = useRef()
  const j2 = useRef()
  const j3 = useRef()
  const card = useRef()
  const visual = useRef()
  const vec = useMemo(() => new THREE.Vector3(), [])
  const ang = useMemo(() => new THREE.Vector3(), [])
  const dir = useMemo(() => new THREE.Vector3(), [])
  const dragTarget = useMemo(() => new THREE.Vector3(), [])
  const dragDelta = useMemo(() => new THREE.Vector3(), [])
  const cardAnchor = useMemo(() => new THREE.Vector3(), [])
  const cardQuat = useMemo(() => new THREE.Quaternion(), [])
  const jointRefs = useMemo(() => [j1, j2, j3], [])
  const smoothedJointPositions = useRef([
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
  ])
  const smoothedJointReady = useRef([false, false, false])
  const lastDragTarget = useRef(null)
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  )
  const [dragged, drag] = useState(false)
  const [hovered, hover] = useState(false)

  const { nodes, materials } = useGLTF(cardGLB, false, false)
  const texture = useTexture(lanyardTexture)
  const hitCorners = useMemo(() => {
    const bounds = new THREE.Box3()
    for (const node of [nodes.card, nodes.clip, nodes.clamp]) {
      node.geometry.computeBoundingBox()
      bounds.union(node.geometry.boundingBox)
    }
    return Array.from({ length: 8 }, (_, index) => new THREE.Vector3(
      index & 1 ? bounds.max.x : bounds.min.x,
      index & 2 ? bounds.max.y : bounds.min.y,
      index & 4 ? bounds.max.z : bounds.min.z,
    ))
  }, [nodes])
  const hitPoints = useMemo(() => hitCorners.map(() => new THREE.Vector3()), [hitCorners])
  const ribbonUniforms = useMemo(() => ({
    lanyardProjection: { value: new THREE.Matrix4() },
    lanyardViewport: { value: new THREE.Vector4(1, 1, 0, 0) },
  }), [])

  const prepareRibbonShader = (shader) => {
    Object.assign(shader.uniforms, ribbonUniforms)
    // MeshLine extrudes in clip space. Apply the original projection first so
    // the strap retains its exact width and shape in the larger canvas.
    shader.vertexShader = `uniform mat4 lanyardProjection;
      uniform vec4 lanyardViewport;\n${shader.vertexShader}`
      .replaceAll('projectionMatrix', 'lanyardProjection')
      .replace('gl_Position = finalPosition;', `
        finalPosition.xy = finalPosition.xy * lanyardViewport.xy + lanyardViewport.zw * finalPosition.w;
        gl_Position = finalPosition;`)
  }

  const segmentProps = useMemo(
    () => ({
      type: 'dynamic',
      canSleep: isMobile,
      colliders: false,
      angularDamping: isMobile ? 4 : 5.75,
      linearDamping: isMobile ? 4 : 5.25,
    }),
    [isMobile]
  )

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1 * COMPOSITION_SCALE])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1 * COMPOSITION_SCALE])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1 * COMPOSITION_SCALE])
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, CARD_ATTACHMENT_Y, 0],
  ])

  useEffect(() => {
    if (hovered || dragged) {
      const previousCursor = document.body.style.cursor
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => void (document.body.style.cursor = previousCursor)
    }
  }, [hovered, dragged])

  useEffect(() => {
    if (!dragged) {
      lastDragTarget.current = null
    }
  }, [dragged])

  useEffect(() => {
    const area = hitAreaRef.current
    const release = () => {
      lastDragTarget.current = null
      drag(false)
      hover(false)
    }
    area?.addEventListener('pointercancel', release)
    area?.addEventListener('lostpointercapture', release)
    window.addEventListener('blur', release)
    return () => {
      area?.removeEventListener('pointercancel', release)
      area?.removeEventListener('lostpointercapture', release)
      window.removeEventListener('blur', release)
    }
  }, [hitAreaRef])

  useFrame((state, delta) => {
    const { camera, size } = state
    const view = camera.view
    if (view?.enabled) {
      const top = camera.near * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) / camera.zoom
      const right = top * view.fullWidth / view.fullHeight
      ribbonUniforms.lanyardProjection.value.makePerspective(-right, right, top, -top, camera.near, camera.far)
      ribbonUniforms.lanyardViewport.value.set(
        view.fullWidth / size.width,
        view.fullHeight / size.height,
        (view.fullWidth - 2 * view.offsetX) / size.width - 1,
        1 - (view.fullHeight - 2 * view.offsetY) / size.height,
      )
    }
    updateHitArea(hitAreaRef.current, hitCorners, hitPoints, visual.current, state.camera, state.size, dragged)
    if (paused) {
      return
    }

    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))

      dragTarget.copy(vec).sub(dragged)

      if (!lastDragTarget.current) {
        const translation = card.current.translation()
        lastDragTarget.current = new THREE.Vector3(translation.x, translation.y, translation.z)
      }

      dragDelta.copy(dragTarget).sub(lastDragTarget.current)
      if (dragDelta.lengthSq() > 0) {
        dragDelta.setLength(Math.min(dragDelta.length(), isMobile ? MOBILE_DRAG_MAX_STEP : DESKTOP_DRAG_MAX_STEP))
      }
      lastDragTarget.current.add(dragDelta)

      ;[card, ...jointRefs, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current.setNextKinematicTranslation({
        x: lastDragTarget.current.x,
        y: lastDragTarget.current.y,
        z: lastDragTarget.current.z,
      })
    }

    if (fixed.current && card.current && band.current?.geometry) {
      jointRefs.forEach((ref, index) => {
        const body = ref.current
        if (!body) return

        const target = body.translation()
        const smoothed = smoothedJointPositions.current[index]
        if (!smoothedJointReady.current[index]) {
          smoothed.copy(target)
          smoothedJointReady.current[index] = true
          return
        }

        const clampedDistance = Math.max(0.12, Math.min(1, smoothed.distanceTo(target)))
        const lerpAlpha = Math.min(1, delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
        smoothed.lerp(target, lerpAlpha)
      })

      const cardRotation = card.current.rotation()
      cardQuat.set(cardRotation.x, cardRotation.y, cardRotation.z, cardRotation.w)
      cardAnchor.set(0, CARD_ATTACHMENT_Y, 0).applyQuaternion(cardQuat).add(card.current.translation())

      curve.points[0].copy(fixed.current.translation())
      curve.points[1].copy(smoothedJointPositions.current[0])
      curve.points[2].copy(smoothedJointPositions.current[1])
      curve.points[3].copy(smoothedJointPositions.current[2])
      curve.points[4].copy(cardAnchor)
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 40))

      ang.copy(card.current.angvel())
      if (ang.length() > (isMobile ? MOBILE_MAX_SPIN : DESKTOP_MAX_SPIN)) {
        ang.setLength(isMobile ? MOBILE_MAX_SPIN : DESKTOP_MAX_SPIN)
        card.current.setAngvel({ x: ang.x, y: ang.y, z: ang.z })
      }
    }
  })

  curve.curveType = isMobile ? 'chordal' : 'centripetal'
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  const handlePointerDown = (e) => {
    e.stopPropagation()
    e.target.setPointerCapture(e.pointerId)
    const translation = card.current.translation()
    lastDragTarget.current = new THREE.Vector3(translation.x, translation.y, translation.z)
    drag(new THREE.Vector3().copy(e.point).sub(vec.copy(translation)))
  }

  const handlePointerUp = (e) => {
    e.target.releasePointerCapture(e.pointerId)
    lastDragTarget.current = null
    drag(false)
  }

  return (
    <>
      <group position={[0, ANCHOR_Y_OFFSET, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5 * COMPOSITION_SCALE, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1 * COMPOSITION_SCALE]} />
        </RigidBody>
        <RigidBody position={[1 * COMPOSITION_SCALE, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1 * COMPOSITION_SCALE]} />
        </RigidBody>
        <RigidBody position={[1.5 * COMPOSITION_SCALE, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1 * COMPOSITION_SCALE]} />
        </RigidBody>
        <RigidBody
          position={[2 * COMPOSITION_SCALE, 0.35 * COMPOSITION_SCALE, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8 * CARD_VISUAL_SCALE, 1.125 * CARD_VISUAL_SCALE, 0.01 * CARD_VISUAL_SCALE]} />
          <group
            ref={visual}
            scale={2.25 * CARD_VISUAL_SCALE}
            position={[0, -1.2 * CARD_VISUAL_SCALE, -0.05 * CARD_VISUAL_SCALE]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={handlePointerUp}
            onPointerDown={handlePointerDown}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                map-wrapS={THREE.ClampToEdgeWrapping}
                map-wrapT={THREE.ClampToEdgeWrapping}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band} frustumCulled={false}>
        <meshLineGeometry />
        <meshLineMaterial
          onBeforeCompile={prepareRibbonShader}
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={COMPOSITION_SCALE}
        />
      </mesh>
    </>
  )
}

// The atlas contains the original brightness/contrast/crop, baked once and
// encoded losslessly. Model and strap start loading together, before Physics.
useGLTF.preload(cardGLB, false, false)
useTexture.preload(lanyardTexture)
