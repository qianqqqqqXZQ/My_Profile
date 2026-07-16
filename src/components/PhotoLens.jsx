import { useEffect, useRef } from 'react'
import personImage from '../assets/home-hero/person-source.jpg'
import armorImage from '../assets/home-hero/armor-source.jpg'
import './PhotoLens.css'

const FOLLOW_HALF_LIFE = 0.06
const PARALLAX_HALF_LIFE = 0.09
const RADIUS_BASE = 112
const RADIUS_MAX = 138
const ECHO_MAX = 9
const ECHO_TTL = 0.055
const PARALLAX_STRENGTH = 28

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const expSmooth = (current, target, delta, halfLife) => {
  if (halfLife <= 0) {
    return target
  }

  const factor = 1 - Math.pow(0.5, delta / halfLife)
  return current + (target - current) * clamp(factor, 0, 1)
}

export default function PhotoLens({ paused = false }) {
  const frameRef = useRef(null)
  const cardRef = useRef(null)
  const revealRef = useRef(null)
  const ringRef = useRef(null)
  const coreRef = useRef(null)
  const glowRef = useRef(null)
  const shadeRef = useRef(null)
  const echoLayerRef = useRef(null)
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
  const frameHandleRef = useRef(0)

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

    let lastTime = 0
    let mounted = true

    const applyStyle = (element, property, value) => {
      if (element) {
        element.style.setProperty(property, value)
      }
    }

    const tick = (time) => {
      if (!mounted) {
        return
      }

      const target = pointerRef.current
      const smooth = smoothRef.current
      const delta = lastTime ? Math.min(0.05, (time - lastTime) / 1000) : 0.016
      lastTime = time

      // Keep the visible lens motion in a RAF loop so pointer-heavy updates do not
      // force React re-renders on every frame.
      smooth.x = expSmooth(smooth.x, target.x, delta, FOLLOW_HALF_LIFE)
      smooth.y = expSmooth(smooth.y, target.y, delta, FOLLOW_HALF_LIFE)

      const velocityBoost = clamp(velocityRef.current * 1000, 0, 1)
      const radius = RADIUS_BASE + velocityBoost * (RADIUS_MAX - RADIUS_BASE)

      parallaxRef.current.x = expSmooth(
        parallaxRef.current.x,
        (0.5 - smooth.x) * PARALLAX_STRENGTH,
        delta,
        PARALLAX_HALF_LIFE,
      )
      parallaxRef.current.y = expSmooth(
        parallaxRef.current.y,
        (0.5 - smooth.y) * (PARALLAX_STRENGTH * 0.72),
        delta,
        PARALLAX_HALF_LIFE,
      )

      applyStyle(cardRef.current, '--parallax-x', `${parallaxRef.current.x}px`)
      applyStyle(cardRef.current, '--parallax-y', `${parallaxRef.current.y}px`)
      applyStyle(cardRef.current, '--lens-x', `${smooth.x * 100}%`)
      applyStyle(cardRef.current, '--lens-y', `${smooth.y * 100}%`)
      applyStyle(cardRef.current, '--lens-size', `${radius}px`)
      applyStyle(cardRef.current, '--lens-opacity', paused ? '0.55' : '1')

      const lensSize = radius * 2
      const glowSize = radius * 2.36
      const coreSize = radius * 0.62

      applyStyle(ringRef.current, 'width', `${lensSize}px`)
      applyStyle(ringRef.current, 'height', `${lensSize}px`)
      applyStyle(coreRef.current, 'width', `${coreSize}px`)
      applyStyle(coreRef.current, 'height', `${coreSize}px`)
      applyStyle(glowRef.current, 'opacity', `${paused ? 0.45 : 0.75}`)
      applyStyle(shadeRef.current, 'opacity', `${paused ? 0.55 : 0.8}`)
      applyStyle(revealRef.current, 'clip-path', `circle(${radius}px at ${smooth.x * 100}% ${smooth.y * 100}%)`)
      applyStyle(
        revealRef.current,
        '-webkit-clip-path',
        `circle(${radius}px at ${smooth.x * 100}% ${smooth.y * 100}%)`,
      )
      applyStyle(
        glowRef.current,
        'clip-path',
        `circle(${glowSize}px at ${smooth.x * 100}% ${smooth.y * 100}%)`,
      )
      applyStyle(
        glowRef.current,
        '-webkit-clip-path',
        `circle(${glowSize}px at ${smooth.x * 100}% ${smooth.y * 100}%)`,
      )
      applyStyle(ringRef.current, 'left', `${smooth.x * 100}%`)
      applyStyle(ringRef.current, 'top', `${smooth.y * 100}%`)
      applyStyle(coreRef.current, 'left', `${smooth.x * 100}%`)
      applyStyle(coreRef.current, 'top', `${smooth.y * 100}%`)
      applyStyle(shadeRef.current, '--lens-x', `${smooth.x * 100}%`)
      applyStyle(shadeRef.current, '--lens-y', `${smooth.y * 100}%`)
      applyStyle(glowRef.current, '--lens-x', `${smooth.x * 100}%`)
      applyStyle(glowRef.current, '--lens-y', `${smooth.y * 100}%`)

      // Echo nodes are managed imperatively so the short-lived trail can stay cheap
      // even while the main lens is updating every animation frame.
      echoesRef.current = echoesRef.current
        .map((echo) => ({
          ...echo,
          ttl: echo.ttl - ECHO_TTL,
        }))
        .filter((echo) => echo.ttl > 0)

      if (echoLayerRef.current) {
        echoLayerRef.current.querySelectorAll('.photo-lens-echo').forEach((node) => {
          const echo = echoesRef.current.find((item) => item.id === node.getAttribute('data-echo-id'))
          if (!echo) {
            node.remove()
            return
          }

          node.style.left = `${echo.x * 100}%`
          node.style.top = `${echo.y * 100}%`
          node.style.width = `${echo.radius * 2.2}px`
          node.style.height = `${echo.radius * 2.2}px`
          node.style.opacity = `${echo.ttl * 0.7 * echo.intensity}`
        })

        echoesRef.current
          .filter((echo) => !echoLayerRef.current.querySelector(`[data-echo-id="${echo.id}"]`))
          .forEach((echo) => {
            const node = document.createElement('span')
            node.className = 'photo-lens-echo'
            node.setAttribute('data-echo-id', echo.id)
            node.setAttribute('aria-hidden', 'true')
            node.style.left = `${echo.x * 100}%`
            node.style.top = `${echo.y * 100}%`
            node.style.width = `${echo.radius * 2.2}px`
            node.style.height = `${echo.radius * 2.2}px`
            node.style.opacity = `${echo.ttl * 0.7 * echo.intensity}`
            echoLayerRef.current.appendChild(node)
          })
      }

      frameHandleRef.current = window.requestAnimationFrame(tick)
    }

    frameHandleRef.current = window.requestAnimationFrame(tick)

    return () => {
      mounted = false
      if (frameHandleRef.current) {
        window.cancelAnimationFrame(frameHandleRef.current)
      }
    }
  }, [paused])

  useEffect(() => {
    if (!frameRef.current) {
      return undefined
    }

    const frame = frameRef.current
    const cleanup = () => {
      // Remove any imperatively created echo nodes when pausing or unmounting.
      frame.querySelectorAll('.photo-lens-echo').forEach((node) => node.remove())
      echoesRef.current = []
    }

    cleanup()
    return cleanup
  }, [paused])

  return (
    <div className="photo-lens-frame" ref={frameRef}>
      <div className="photo-lens-card" ref={cardRef}>
        <div className="photo-lens-backdrop" aria-hidden="true" />
        <div className="photo-lens-layer photo-lens-layer-back" aria-hidden="true">
          <img className="photo-lens-image photo-lens-image-back" src={armorImage} alt="" />
        </div>
        <div className="photo-lens-layer photo-lens-layer-front" aria-hidden="true">
          <img className="photo-lens-image photo-lens-image-front" src={personImage} alt="" />
        </div>

        <div className="photo-lens-shade" ref={shadeRef} aria-hidden="true" />
        <div
          className="photo-lens-reveal"
          ref={revealRef}
          aria-hidden="true"
        >
          <img className="photo-lens-image photo-lens-image-reveal" src={armorImage} alt="" />
        </div>

        <div className="photo-lens-glow" ref={glowRef} aria-hidden="true" />

        <div className="photo-lens-echo-layer" ref={echoLayerRef} aria-hidden="true" />
        <div className="photo-lens-ring" ref={ringRef} aria-hidden="true" />
        <div className="photo-lens-core" ref={coreRef} aria-hidden="true" />
      </div>
    </div>
  )
}
