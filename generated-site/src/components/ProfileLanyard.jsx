import { useEffect, useMemo, useRef, useState } from 'react'
import profileImage from '../../../img/Ziqian.jpg'
import './ProfileLanyard.css'

const metrics = [
  { label: 'Focus', value: 'AI / Vision / Systems' },
  { label: 'Base', value: 'UNNC Computer Science' },
]

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

function ProfileLanyard() {
  const sceneRef = useRef(null)
  const animationRef = useRef(null)
  const physicsRef = useRef({
    pointerX: 0,
    pointerY: 0,
    velocityX: 0,
    velocityY: 0,
    spin: 0,
    dragOffsetX: 0,
    dragOffsetY: 0,
    lastTime: 0,
    dragging: false,
    entered: false,
  })
  const [motion, setMotion] = useState({
    offsetX: 0,
    offsetY: 0,
    tiltX: 0,
    tiltY: 0,
    rotate: -5,
    ropeCurve: 0,
    ropeStretch: 0,
    shineX: 0,
    shineY: 0,
    active: false,
    dragging: false,
    dropped: false,
  })

  useEffect(() => {
    const timer = window.setTimeout(() => {
      physicsRef.current.entered = true
      setMotion((current) => ({ ...current, dropped: true, active: true }))
      startPhysicsLoop()
    }, 90)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const startPhysicsLoop = () => {
    if (animationRef.current) return

    const step = (time) => {
      const state = physicsRef.current
      const previous = state.lastTime || time
      const dt = Math.min(32, time - previous || 16) / 16.6667
      state.lastTime = time

      if (state.dragging) {
        state.velocityX *= 0.82
        state.velocityY *= 0.82
        state.spin *= 0.78
      } else {
        state.velocityX += (-state.pointerX * 0.065 - state.velocityX * 0.12) * dt
        state.velocityY += (-state.pointerY * 0.07 - state.velocityY * 0.15) * dt
        state.spin += ((-state.pointerX * 0.038) - state.spin * 0.13) * dt
        state.pointerX += state.velocityX * dt
        state.pointerY += state.velocityY * dt
      }

      state.pointerX = clamp(state.pointerX, -150, 150)
      state.pointerY = clamp(state.pointerY, -170, 210)
      state.spin = clamp(state.spin, -16, 16)

      const nextOffsetX = state.pointerX
      const nextOffsetY = state.pointerY
      const nextTiltX = clamp(nextOffsetY * -0.06, -14, 14)
      const nextTiltY = clamp(nextOffsetX * 0.07, -16, 16)
      const nextRotate = clamp(-5 + state.spin + nextOffsetX * 0.022, -20, 14)
      const nextCurve = clamp(nextOffsetX * 0.2, -26, 26)
      const nextStretch = clamp(Math.max(0, nextOffsetY) * 0.36, 0, 74)
      const nextShineX = clamp(nextOffsetX * 0.78, -120, 120)
      const nextShineY = clamp(nextOffsetY * 0.7, -150, 150)

      const settled =
        !state.dragging &&
        Math.abs(nextOffsetX) < 0.25 &&
        Math.abs(nextOffsetY) < 0.25 &&
        Math.abs(state.velocityX) < 0.02 &&
        Math.abs(state.velocityY) < 0.02 &&
        Math.abs(state.spin) < 0.02

      setMotion((current) => ({
        ...current,
        offsetX: settled ? 0 : nextOffsetX,
        offsetY: settled ? 0 : nextOffsetY,
        tiltX: settled ? 0 : nextTiltX,
        tiltY: settled ? 0 : nextTiltY,
        rotate: settled ? -5 : nextRotate,
        ropeCurve: settled ? 0 : nextCurve,
        ropeStretch: settled ? 0 : nextStretch,
        shineX: settled ? 0 : nextShineX,
        shineY: settled ? 0 : nextShineY,
        active: state.dragging || !settled,
        dragging: state.dragging,
      }))

      if (settled && state.entered) {
        animationRef.current = null
        state.lastTime = 0
        return
      }

      animationRef.current = window.requestAnimationFrame(step)
    }

    animationRef.current = window.requestAnimationFrame(step)
  }

  const sceneStyle = useMemo(
    () => ({
      '--pointer-x': `${motion.shineX}px`,
      '--pointer-y': `${motion.shineY}px`,
      '--tilt-x': `${motion.tiltX}deg`,
      '--tilt-y': `${motion.tiltY}deg`,
      '--card-rotate': `${motion.rotate}deg`,
      '--card-offset-x': `${motion.offsetX}px`,
      '--card-offset-y': `${motion.offsetY}px`,
      '--rope-curve': `${motion.ropeCurve}px`,
      '--rope-stretch': `${motion.ropeStretch}px`,
    }),
    [motion]
  )

  const updatePointer = (event, dragging = false) => {
    const rect = sceneRef.current?.getBoundingClientRect()
    if (!rect) return

    const localX = event.clientX - rect.left - rect.width / 2
    const localY = event.clientY - rect.top - 228
    const targetX = clamp(localX, -150, 150)
    const targetY = clamp(localY, -170, 210)
    const state = physicsRef.current

    if (dragging) {
      const nextX = clamp(targetX - state.dragOffsetX, -150, 150)
      const nextY = clamp(targetY - state.dragOffsetY, -170, 210)
      state.velocityX = (nextX - state.pointerX) * 0.22
      state.velocityY = (nextY - state.pointerY) * 0.22
      state.spin = clamp(nextX * 0.045, -16, 16)
      state.pointerX = nextX
      state.pointerY = nextY
    } else {
      state.pointerX = targetX * 0.16
      state.pointerY = targetY * 0.1
      state.velocityX += (state.pointerX - targetX * 0.08) * 0.015
      state.velocityY += (state.pointerY - targetY * 0.05) * 0.015
    }

    startPhysicsLoop()
  }

  const handlePointerMove = (event) => {
    if (physicsRef.current.dragging) {
      updatePointer(event, true)
      return
    }

    updatePointer(event, false)
  }

  const handlePointerLeave = () => {
    const state = physicsRef.current
    if (state.dragging) return

    state.pointerX *= 0.4
    state.pointerY *= 0.3
    startPhysicsLoop()
  }

  const handlePointerDown = (event) => {
    const rect = sceneRef.current?.getBoundingClientRect()
    if (!rect) return

    const localX = event.clientX - rect.left - rect.width / 2
    const localY = event.clientY - rect.top - 228
    const state = physicsRef.current

    state.dragging = true
    state.dragOffsetX = localX - state.pointerX
    state.dragOffsetY = localY - state.pointerY
    state.velocityX = 0
    state.velocityY = 0
    state.lastTime = 0

    event.currentTarget.setPointerCapture(event.pointerId)
    updatePointer(event, true)
  }

  const handlePointerUp = (event) => {
    const state = physicsRef.current
    if (!state.dragging) return

    event.currentTarget.releasePointerCapture(event.pointerId)
    state.dragging = false
    state.velocityX *= 1.45
    state.velocityY *= 1.28
    state.spin += state.pointerX * 0.02
    startPhysicsLoop()
  }

  return (
    <div
      ref={sceneRef}
      className={`lanyard-scene${motion.active ? ' is-active' : ''}${motion.dragging ? ' is-dragging' : ''}${motion.dropped ? ' is-dropped' : ''}`}
      aria-label="Profile lanyard widget"
      style={sceneStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="lanyard-fall-layer">
        <div className="lanyard-anchor" aria-hidden="true">
          <span className="lanyard-hook" />
        </div>

        <div className="lanyard-rig">
          <div className="lanyard-rope" aria-hidden="true">
            <span className="lanyard-rope-line lanyard-rope-left" />
            <span className="lanyard-rope-line lanyard-rope-center" />
            <span className="lanyard-rope-line lanyard-rope-right" />
            <span className="lanyard-clip" />
          </div>

          <article
            className="lanyard-card"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            <div className="lanyard-card-rim" aria-hidden="true" />
            <div className="lanyard-photo-frame">
              <img
                src={profileImage}
                alt="Portrait of Ziqian Xiong"
                className="lanyard-photo"
              />
            </div>

            <div className="lanyard-copy">
              <p className="lanyard-role">Ziqian Xiong</p>
              <h3>Computer Science Student</h3>
              <p className="lanyard-summary">
                Research-driven builder focused on intelligent systems, visual
                computing, and polished digital presentation.
              </p>

              <div className="lanyard-metrics">
                {metrics.map((item) => (
                  <div key={item.label} className="lanyard-metric">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

export default ProfileLanyard
