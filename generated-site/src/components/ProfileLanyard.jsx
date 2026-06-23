import { useEffect, useMemo, useRef, useState } from 'react'
import profileImage from '../../../img/Ziqian.jpg'
import './ProfileLanyard.css'

const metrics = [
  { label: 'Focus', value: 'AI / Vision / Systems' },
  { label: 'Base', value: 'UNNC Computer Science' },
]

function ProfileLanyard() {
  const sceneRef = useRef(null)
  const animationRef = useRef(null)
  const dragRef = useRef({
    dragging: false,
    releaseVelocityX: 0,
    releaseVelocityY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
  })
  const [motion, setMotion] = useState({
    dragX: 0,
    dragY: 0,
    rotateX: 0,
    rotateY: 0,
    swingRotate: 0,
    shineX: 0,
    shineY: 0,
    active: false,
    dragging: false,
    dropped: false,
  })

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMotion((current) => ({ ...current, dropped: true }))
    }, 40)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const resetMotion = () => {
    if (animationRef.current) {
      window.cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    const animateBack = () => {
      setMotion((current) => {
        const nextDragX = current.dragX * 0.84
        const nextDragY = current.dragY * 0.84
        const nextRotateX = current.rotateX * 0.8
        const nextRotateY = current.rotateY * 0.8
        const nextSwing = current.swingRotate * 0.8
        const nextShineX = current.shineX * 0.82
        const nextShineY = current.shineY * 0.82

        const settled =
          Math.abs(nextDragX) < 0.4 &&
          Math.abs(nextDragY) < 0.4 &&
          Math.abs(nextRotateX) < 0.15 &&
          Math.abs(nextRotateY) < 0.15 &&
          Math.abs(nextSwing) < 0.15

        if (settled) {
          animationRef.current = null
          return {
            ...current,
            dragX: 0,
            dragY: 0,
            rotateX: 0,
            rotateY: 0,
            swingRotate: 0,
            shineX: 0,
            shineY: 0,
            active: false,
            dragging: false,
          }
        }

        animationRef.current = window.requestAnimationFrame(animateBack)
        return {
          ...current,
          dragX: nextDragX,
          dragY: nextDragY,
          rotateX: nextRotateX,
          rotateY: nextRotateY,
          swingRotate: nextSwing,
          shineX: nextShineX,
          shineY: nextShineY,
          active: true,
          dragging: false,
        }
      })
    }

    animationRef.current = window.requestAnimationFrame(animateBack)
  }

  const sceneStyle = useMemo(
    () =>
      ({
        '--pointer-x': `${motion.shineX}px`,
        '--pointer-y': `${motion.shineY}px`,
        '--tilt-x': `${motion.rotateX}deg`,
        '--tilt-y': `${motion.rotateY}deg`,
        '--swing-rotate': `${motion.swingRotate}deg`,
        '--swing-shift': `${motion.dragY}px`,
        '--drag-x': `${motion.dragX}px`,
      }),
    [motion]
  )

  const updateMotionFromEvent = (event, dragging = false) => {
    const rect = sceneRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    const boundedX = Math.max(-120, Math.min(120, x))
    const boundedY = Math.max(-150, Math.min(150, y))

    setMotion((current) => ({
      ...current,
      dragX: dragging ? boundedX * 0.32 : current.dragX,
      dragY: dragging ? boundedY * 0.3 : current.dragY,
      rotateX: boundedY * -0.055,
      rotateY: boundedX * 0.06,
      swingRotate: boundedX * 0.036,
      shineX: boundedX,
      shineY: boundedY,
      active: true,
      dragging,
    }))
  }

  const handlePointerMove = (event) => {
    if (dragRef.current.dragging) {
      handlePointerDrag(event)
      return
    }

    updateMotionFromEvent(event, false)
  }

  const handlePointerLeave = () => {
    if (!dragRef.current.dragging) {
      resetMotion()
    }
  }

  const handlePointerDown = (event) => {
    const rect = sceneRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2

    dragRef.current = {
      dragging: true,
      releaseVelocityX: 0,
      releaseVelocityY: 0,
      lastX: x,
      lastY: y,
      lastTime: performance.now(),
    }

    event.currentTarget.setPointerCapture(event.pointerId)
    updateMotionFromEvent(event, true)
  }

  const handlePointerDrag = (event) => {
    if (!dragRef.current.dragging) return

    const rect = sceneRef.current?.getBoundingClientRect()
    if (!rect) return

    const currentX = event.clientX - rect.left - rect.width / 2
    const currentY = event.clientY - rect.top - rect.height / 2
    const now = performance.now()
    const dt = Math.max(16, now - dragRef.current.lastTime)

    dragRef.current.releaseVelocityX =
      (currentX - dragRef.current.lastX) / dt
    dragRef.current.releaseVelocityY =
      (currentY - dragRef.current.lastY) / dt
    dragRef.current.lastX = currentX
    dragRef.current.lastY = currentY
    dragRef.current.lastTime = now

    updateMotionFromEvent(event, true)
  }

  const handlePointerUp = (event) => {
    if (!dragRef.current.dragging) return

    event.currentTarget.releasePointerCapture(event.pointerId)
    dragRef.current.dragging = false

    setMotion((current) => ({
      ...current,
      dragX: current.dragX + dragRef.current.releaseVelocityX * 42,
      dragY: current.dragY + dragRef.current.releaseVelocityY * 55,
      swingRotate: current.swingRotate + dragRef.current.releaseVelocityX * 12,
    }))

    resetMotion()
  }

  return (
    <div
      ref={sceneRef}
      className={`lanyard-scene${motion.active ? ' is-active' : ''}${motion.dragging ? ' is-dragging' : ''}${motion.dropped ? ' is-dropped' : ''}`}
      aria-label="Profile lanyard widget"
      style={sceneStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div className="lanyard-anchor" aria-hidden="true">
        <span className="lanyard-hook" />
      </div>

      <div className="lanyard-rig">
        <div className="lanyard-strap lanyard-strap-left" aria-hidden="true" />
        <div className="lanyard-strap lanyard-strap-right" aria-hidden="true" />

        <article className="lanyard-card">
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
  )
}

export default ProfileLanyard
