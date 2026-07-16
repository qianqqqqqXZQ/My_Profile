/* eslint-disable react/no-unknown-property */
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { Environment, useGLTF, useTexture } from '@react-three/drei'
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
import profileImage from '../assets/profile/profile-card-photo.jpg'
import cardGLB from '../assets/lanyard/card.glb'
import lanyardTexture from '../assets/lanyard/lanyard.png'
import './ProfileLanyard.css'

extend({ MeshLineGeometry, MeshLineMaterial })

const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
const COMPOSITION_SCALE = 2
const CARD_VISUAL_SCALE = COMPOSITION_SCALE * 0.7
const CARD_ATTACHMENT_Y = 1.5 * CARD_VISUAL_SCALE
const ANCHOR_Y_OFFSET = 6.35
const PORTRAIT_BRIGHTNESS = 1.18
const DESKTOP_DRAG_MAX_STEP = 0.85
const MOBILE_DRAG_MAX_STEP = 1.15
const DESKTOP_MAX_SPIN = 10
const MOBILE_MAX_SPIN = 14

export default function ProfileLanyard({
  position = [0, 0, 28],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  paused = false,
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="lanyard-wrapper" aria-label="Profile lanyard widget">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.25 : 1.5]}
        frameloop={paused ? 'never' : 'always'}
        gl={{ alpha: transparent }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 24 : 1 / 45}>
          <Band isMobile={isMobile} paused={paused} />
        </Physics>
        {!paused ? <Environment preset="city" /> : null}
      </Canvas>
    </div>
  )
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, paused = false }) {
  const band = useRef()
  const fixed = useRef()
  const j1 = useRef()
  const j2 = useRef()
  const j3 = useRef()
  const card = useRef()
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

  const { nodes, materials } = useGLTF(cardGLB)
  const texture = useTexture(lanyardTexture)
  const frontTex = useTexture(profileImage || BLANK_PIXEL)
  const backTex = useTexture(BLANK_PIXEL)

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

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map
    if (!baseMap?.image) return baseMap

    const canvas = document.createElement('canvas')
    const baseImg = baseMap.image
    canvas.width = baseImg.width
    canvas.height = baseImg.height
    const ctx = canvas.getContext('2d')
    if (!ctx) return baseMap

    ctx.drawImage(baseImg, 0, 0)

    const drawFitted = (img, rect, filter = 'none') => {
      const rx = rect.x * canvas.width
      const ry = rect.y * canvas.height
      const rw = rect.w * canvas.width
      const rh = rect.h * canvas.height
      const scale = Math.max(rw / img.width, rh / img.height)
      const dw = img.width * scale
      const dh = img.height * scale
      const dx = rx + (rw - dw) / 2
      const dy = ry + (rh - dh) / 2
      ctx.save()
      ctx.beginPath()
      ctx.rect(rx, ry, rw, rh)
      ctx.clip()
      ctx.filter = filter
      ctx.drawImage(img, dx, dy, dw, dh)
      ctx.restore()
    }

    drawFitted(
      frontTex.image,
      { x: 0, y: 0, w: 0.5, h: 0.755 },
      `brightness(${PORTRAIT_BRIGHTNESS}) contrast(1.04) saturate(1.02)`
    )
    drawFitted(backTex.image, { x: 0.5, y: 0, w: 0.5, h: 0.757 })

    const composite = new THREE.CanvasTexture(canvas)
    composite.colorSpace = THREE.SRGBColorSpace
    composite.flipY = baseMap.flipY
    composite.anisotropy = 16
    composite.needsUpdate = true
    return composite
  }, [backTex.image, frontTex.image, materials.base.map])

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1 * COMPOSITION_SCALE])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1 * COMPOSITION_SCALE])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1 * COMPOSITION_SCALE])
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, CARD_ATTACHMENT_Y, 0],
  ])

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => void (document.body.style.cursor = 'auto')
    }
  }, [hovered, dragged])

  useEffect(() => {
    if (!dragged) {
      lastDragTarget.current = null
    }
  }, [dragged])

  useFrame((state, delta) => {
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
            scale={2.25 * CARD_VISUAL_SCALE}
            position={[0, -1.2 * CARD_VISUAL_SCALE, -0.05 * CARD_VISUAL_SCALE]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={handlePointerUp}
            onPointerDown={handlePointerDown}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
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
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
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

useGLTF.preload(cardGLB)
