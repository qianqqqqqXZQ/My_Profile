/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { Environment, Image as DreiImage } from '@react-three/drei'
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
import profileImage from '../../../img/Ziqian.jpg'
import './ProfileLanyard.css'

extend({ MeshLineGeometry, MeshLineMaterial })

const NAME = 'Ziqian Xiong'
const TITLE = 'Computer Science Student'
const TAGLINE = 'Research, systems, and visual clarity'
const BASE_METRICS = [
  { label: 'Focus', value: 'AI / Vision / Systems' },
  { label: 'Base', value: 'UNNC Computer Science' },
]

function LanyardScene() {
  const rope = useRef()
  const card = useRef()
  const anchor = useRef()
  const joint1 = useRef()
  const joint2 = useRef()
  const joint3 = useRef()
  const pointer = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const [hovered, setHovered] = useState(false)
  const [dragged, setDragged] = useState(false)

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
    []
  )

  const tempVec = useMemo(() => new THREE.Vector3(), [])
  const tempDir = useMemo(() => new THREE.Vector3(), [])
  const tempRot = useMemo(() => new THREE.Vector3(), [])
  const tempAng = useMemo(() => new THREE.Vector3(), [])
  const tempLin = useMemo(() => ({ x: 0, y: 0, z: 0 }), [])

  useRopeJoint(anchor, joint1, [[0, 0, 0], [0, 0, 0], 0.5])
  useRopeJoint(joint1, joint2, [[0, 0, 0], [0, 0, 0], 0.48])
  useRopeJoint(joint2, joint3, [[0, 0, 0], [0, 0, 0], 0.48])
  useSphericalJoint(joint3, card, [
    [0, 0, 0],
    [0, 1.2, 0],
  ])

  useEffect(() => {
    document.body.style.cursor = hovered ? (dragged ? 'grabbing' : 'grab') : 'auto'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    pointer.current.targetX = THREE.MathUtils.clamp(state.pointer.x * 0.9, -0.9, 0.9)
    pointer.current.targetY = THREE.MathUtils.clamp(state.pointer.y * 0.75, -0.85, 0.85)

    pointer.current.x = THREE.MathUtils.damp(pointer.current.x, pointer.current.targetX, 6.5, delta)
    pointer.current.y = THREE.MathUtils.damp(pointer.current.y, pointer.current.targetY, 6.5, delta)

    if (dragged && card.current) {
      tempVec.set(state.pointer.x, state.pointer.y, 0.35).unproject(state.camera)
      tempDir.copy(tempVec).sub(state.camera.position).normalize()
      tempVec.add(tempDir.multiplyScalar(state.camera.position.length()))
      card.current.setNextKinematicTranslation({
        x: tempVec.x,
        y: tempVec.y - 0.1,
        z: tempVec.z,
      })
      card.current.setNextKinematicRotation({
        x: THREE.MathUtils.degToRad(pointer.current.y * -8),
        y: THREE.MathUtils.degToRad(pointer.current.x * 12),
        z: THREE.MathUtils.degToRad(pointer.current.x * -6),
      })
    }

    if (rope.current && joint1.current && joint2.current && joint3.current && anchor.current) {
      const lerpStrength = 8
      const nextX = THREE.MathUtils.clamp(pointer.current.x * 0.18, -0.2, 0.2)
      const nextY = THREE.MathUtils.clamp(pointer.current.y * 0.16, -0.25, 0.18)
      tempRot.set(nextY * -12, nextX * 8, nextX * 3)

      if (!dragged && card.current) {
        const target = card.current.translation()
        tempAng.set(
          THREE.MathUtils.damp(tempAng.x, tempRot.x, lerpStrength, delta),
          THREE.MathUtils.damp(tempAng.y, tempRot.y, lerpStrength, delta),
          THREE.MathUtils.damp(tempAng.z, tempRot.z, lerpStrength, delta)
        )
        card.current.setAngvel({
          x: tempAng.x,
          y: tempAng.y,
          z: tempAng.z,
        })
        const linvel = card.current.linvel()
        tempLin.x = THREE.MathUtils.damp(linvel.x, -target.x * 0.25, 3.5, delta)
        tempLin.y = THREE.MathUtils.damp(linvel.y, -target.y * 0.3, 3.5, delta)
        tempLin.z = THREE.MathUtils.damp(linvel.z, 0, 3.5, delta)
        card.current.setLinvel(tempLin, true)
      }

      curve.points[0].copy(joint3.current.translation())
      curve.points[1].copy(joint2.current.translation())
      curve.points[2].copy(joint1.current.translation())
      curve.points[3].copy(anchor.current.translation())
      rope.current.geometry.setPoints(curve.getPoints(24))
    }
  })

  return (
    <>
      <group position={[0, 1.75, 0]}>
        <RigidBody ref={anchor} type="fixed" colliders={false} />
        <RigidBody ref={joint1} position={[0, -0.6, 0]} colliders={false} type="dynamic">
          <BallCollider args={[0.05]} />
        </RigidBody>
        <RigidBody ref={joint2} position={[0, -1.15, 0]} colliders={false} type="dynamic">
          <BallCollider args={[0.05]} />
        </RigidBody>
        <RigidBody ref={joint3} position={[0, -1.65, 0]} colliders={false} type="dynamic">
          <BallCollider args={[0.05]} />
        </RigidBody>
        <RigidBody
          ref={card}
          position={[0, -2.35, 0]}
          colliders={false}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
          linearDamping={4.5}
          angularDamping={6}
          mass={1.2}
        >
          <CuboidCollider args={[0.88, 1.05, 0.06]} />
          <group
            position={[0, -0.02, 0]}
            scale={[0.84, 0.84, 0.84]}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onPointerDown={(event) => {
              event.stopPropagation()
              event.target.setPointerCapture(event.pointerId)
              setDragged(true)
            }}
            onPointerUp={(event) => {
              event.stopPropagation()
              event.target.releasePointerCapture(event.pointerId)
              setDragged(false)
            }}
            onPointerCancel={() => setDragged(false)}
          >
            <mesh>
              <boxGeometry args={[2.1, 2.72, 0.16]} />
              <meshPhysicalMaterial
                color="#111111"
                roughness={0.22}
                metalness={0.18}
                clearcoat={0.72}
                clearcoatRoughness={0.18}
              />
            </mesh>
            <DreiImage
              url={profileImage}
              scale={[1.7, 2.1, 1]}
              position={[0, 0.18, 0.11]}
              transparent
            />
            <mesh position={[0, -0.98, 0.11]}>
              <planeGeometry args={[1.72, 0.54]} />
              <meshStandardMaterial color="#f1f1ed" roughness={0.92} metalness={0.02} />
            </mesh>
            <mesh position={[0, -0.98, 0.12]}>
              <planeGeometry args={[1.68, 0.5]} />
              <meshStandardMaterial color="#111111" roughness={0.98} metalness={0} />
            </mesh>
            <mesh position={[0, -0.98, 0.13]}>
              <planeGeometry args={[1.62, 0.42]} />
              <meshStandardMaterial color="#e9e9e4" roughness={0.95} metalness={0.02} />
            </mesh>
            <group position={[0, -0.96, 0.18]}>
              <mesh position={[0, 0.06, 0]}>
                <planeGeometry args={[1.42, 0.12]} />
                <meshStandardMaterial color="#050505" roughness={0.9} metalness={0.05} />
              </mesh>
              <mesh position={[0, -0.14, 0]}>
                <planeGeometry args={[1.22, 0.1]} />
                <meshStandardMaterial color="#5f5f5a" roughness={0.96} metalness={0.02} />
              </mesh>
            </group>
          </group>
        </RigidBody>
      </group>

      <mesh ref={rope}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[1400, 1400]}
          useMap={false}
          lineWidth={0.9}
        />
      </mesh>
    </>
  )
}

export default function ProfileLanyard() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 900
  )

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <section className="lanyard-shell" aria-label="Profile lanyard widget">
      <div className="lanyard-badge">
        <span className="lanyard-badge-label">Profile</span>
        <strong>{NAME}</strong>
      </div>

      <Canvas
        className="lanyard-canvas"
        shadows
        camera={{ position: [0, 0.7, 7.8], fov: 24 }}
        dpr={[1, isMobile ? 1.4 : 1.8]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.35} />
        <directionalLight position={[4, 6, 5]} intensity={2.2} />
        <directionalLight position={[-4, 2, 4]} intensity={0.9} />
        <Physics gravity={[0, -22, 0]} timeStep={1 / 60}>
          <LanyardScene />
        </Physics>
        <Environment preset="city" />
      </Canvas>

      <div className="lanyard-caption">
        <p>{TITLE}</p>
        <span>{TAGLINE}</span>
      </div>

      <div className="lanyard-metrics">
        {BASE_METRICS.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}
