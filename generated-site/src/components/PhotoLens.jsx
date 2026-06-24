import { useEffect, useMemo, useRef, useState } from 'react'
import img1Cutout from '../../../img/img1-cutout.png'
import img2Cutout from '../../../img/img2-cutout.png'
import './PhotoLens.css'

const FOLLOW_LERP = 0.12
const PARALLAX_LERP = 0.08
const RADIUS_BASE = 112
const RADIUS_MAX = 138
const ECHO_MAX = 9

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

export default function PhotoLens({ paused = false }) {
  const frameRef = useRef(null)
  const pointerRef = useRef({ x: 0.68, y: 0.48 })
  const smoothRef = useRef({ x: 0.68, y: 0.48 })
  const parallaxRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef(0)
  const lastPointerRef = useRef({
    x: 0.68,
    y: 0.48,
    time: typeof performance !== 'undefined' ? performance.now() : Date.now(),
  })
  const echoesRef = useRef([])
  const [echoes, setEchoes] = useState([])
  const [lensState, setLensState] = useState({
    x: 0.68,
    y: 0.48,
    radius: RADIUS_BASE,
    opacity: 1,
  })

  const lensStyle = useMemo(
    () => ({
      '--lens-x': `${lensState.x * 100}%`,
      '--lens-y': `${lensState.y * 100}%`,
      '--lens-size': `${lensState.radius}px`,
      '--lens-opacity': lensState.opacity,
      '--parallax-x': `${parallaxRef.current.x}px`,
      '--parallax-y': `${parallaxRef.current.y}px`,
    }),
    [lensState],
  )

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const frame = frameRef.current
    if (!frame) {
      return undefined
    }

    const updateFromEvent = (clientX, clientY) => {
      const rect = frame.getBoundingClientRect()
      if (!rect.width || !rect.height) {
        return
      }

      const now = performance.now()
      const nextX = clamp((clientX - rect.left) / rect.width, 0.03, 0.97)
      const nextY = clamp((clientY - rect.top) / rect.height, 0.05, 0.95)
      const prev = lastPointerRef.current
      const dt = Math.max(16, now - prev.time)
      const distance = Math.hypot(nextX - prev.x, nextY - prev.y)
      const velocity = distance / dt

      pointerRef.current = { x: nextX, y: nextY }
      lastPointerRef.current = { x: nextX, y: nextY, time: now }
      velocityRef.current = velocity

      const intensity = clamp((velocity * 1000 - 10) / 220, 0, 1)
      if (intensity > 0.05) {
        echoesRef.current = [
          ...echoesRef.current.slice(-ECHO_MAX + 1),
          {
            id: `${now}-${Math.random().toString(36).slice(2, 7)}`,
            x: smoothRef.current.x,
            y: smoothRef.current.y,
            radius: 0.72 + intensity * 0.34,
            intensity,
            ttl: 1,
          },
        ]
      }
    }

    const handlePointerMove = (event) => updateFromEvent(event.clientX, event.clientY)
    const handlePointerEnter = (event) => updateFromEvent(event.clientX, event.clientY)
    const handlePointerLeave = () => {
      velocityRef.current = 0
    }

    frame.addEventListener('pointermove', handlePointerMove)
    frame.addEventListener('pointerenter', handlePointerEnter)
    frame.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      frame.removeEventListener('pointermove', handlePointerMove)
      frame.removeEventListener('pointerenter', handlePointerEnter)
      frame.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    let raf = 0
    const tick = () => {
      const target = pointerRef.current
      const smooth = smoothRef.current

      smooth.x += (target.x - smooth.x) * FOLLOW_LERP
      smooth.y += (target.y - smooth.y) * FOLLOW_LERP

      const velocityBoost = clamp(velocityRef.current * 1000, 0, 1)
      const radius = RADIUS_BASE + velocityBoost * (RADIUS_MAX - RADIUS_BASE)
      const parallaxStrength = 28
      parallaxRef.current.x += (((0.5 - smooth.x) * parallaxStrength) - parallaxRef.current.x) * PARALLAX_LERP
      parallaxRef.current.y += (((0.5 - smooth.y) * (parallaxStrength * 0.72)) - parallaxRef.current.y) * PARALLAX_LERP

      echoesRef.current = echoesRef.current
        .map((echo) => ({
          ...echo,
          ttl: echo.ttl - 0.055,
        }))
        .filter((echo) => echo.ttl > 0)

      setEchoes([...echoesRef.current])
      setLensState({
        x: smooth.x,
        y: smooth.y,
        radius,
        opacity: paused ? 0.55 : 1,
      })
      raf = window.requestAnimationFrame(tick)
    }

    raf = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(raf)
  }, [paused])

  return (
    <div className="photo-lens-frame" ref={frameRef}>
      <div className="photo-lens-card" style={lensStyle}>
        <div className="photo-lens-backdrop" aria-hidden="true" />
        <div className="photo-lens-layer photo-lens-layer-back" aria-hidden="true">
          <img
            className="photo-lens-image photo-lens-image-back"
            src={img2Cutout}
            alt=""
          />
        </div>
        <div className="photo-lens-layer photo-lens-layer-front" aria-hidden="true">
          <img
            className="photo-lens-image photo-lens-image-front"
            src={img1Cutout}
            alt=""
          />
        </div>

        <div className="photo-lens-shade" aria-hidden="true" />
        <div
          className="photo-lens-reveal"
          aria-hidden="true"
          style={{
            clipPath: `circle(var(--lens-size) at var(--lens-x) var(--lens-y))`,
            WebkitClipPath: `circle(var(--lens-size) at var(--lens-x) var(--lens-y))`,
          }}
        >
          <img
            className="photo-lens-image photo-lens-image-reveal"
            src={img2Cutout}
            alt=""
          />
        </div>

        <div
          className="photo-lens-glow"
          aria-hidden="true"
          style={{
            clipPath: `circle(calc(var(--lens-size) * 1.18) at var(--lens-x) var(--lens-y))`,
            WebkitClipPath: `circle(calc(var(--lens-size) * 1.18) at var(--lens-x) var(--lens-y))`,
          }}
        />

        {echoes.map((echo) => (
          <span
            key={echo.id}
            className="photo-lens-echo"
            aria-hidden="true"
            style={{
              left: `${echo.x * 100}%`,
              top: `${echo.y * 100}%`,
              width: `${echo.radius * 2.2}px`,
              height: `${echo.radius * 2.2}px`,
              opacity: echo.ttl * 0.7 * echo.intensity,
            }}
          />
        ))}

        <div className="photo-lens-ring" aria-hidden="true" />
        <div className="photo-lens-core" aria-hidden="true" />
      </div>
    </div>
  )
}
