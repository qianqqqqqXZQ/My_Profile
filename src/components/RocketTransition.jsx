import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import launchVideo from '../assets/crew-9-liftoff.mp4'
import { RocketTransitionContext } from './useRocketTransition'
import './RocketTransition.css'

gsap.registerPlugin(useGSAP)

export default function RocketTransition({ children, language }) {
  const [phase, setPhase] = useState('idle')
  const [homeEffectsPaused, setHomeEffectsPaused] = useState(false)
  const shellRef = useRef(null)
  const overlayRef = useRef(null)
  const videoRef = useRef(null)
  const activeRef = useRef(null)
  const sequenceRef = useRef(0)
  const focusFrameRef = useRef(null)
  const location = useLocation()
  const locationRef = useRef(location)
  const navigate = useNavigate()

  const { contextSafe } = useGSAP(() => () => {
    activeRef.current?.cancelReady?.()
    videoRef.current?.pause()
    activeRef.current?.context?.revert()
    activeRef.current = null
    cancelAnimationFrame(focusFrameRef.current)
  }, { scope: shellRef })

  const cancelLaunch = useCallback(() => {
    const run = activeRef.current
    if (!run) return
    activeRef.current = null
    run.context?.revert()
    videoRef.current?.pause()
    run.cancelReady?.()
    cancelAnimationFrame(focusFrameRef.current)
    setHomeEffectsPaused(false)
    setPhase('idle')
  }, [])

  useLayoutEffect(() => {
    locationRef.current = location
    const run = activeRef.current
    if (!run) return

    const isOrigin = !run.navigated && location.pathname === '/' && location.key === run.originKey
    const isDestination = run.navigated && location.pathname === '/ready'
      && location.state?.rocketLaunchId === run.id
    if (!isOrigin && !isDestination) cancelLaunch()
  }, [location, cancelLaunch])

  const isActive = phase !== 'idle'
  useLayoutEffect(() => {
    if (!isActive) return undefined
    const html = document.documentElement
    const body = document.body
    const previous = { htmlOverflow: html.style.overflow, bodyOverflow: body.style.overflow, padding: body.style.paddingRight }
    const scrollbar = window.innerWidth - html.clientWidth
    if (scrollbar > 0) body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + scrollbar}px`
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    return () => {
      html.style.overflow = previous.htmlOverflow
      body.style.overflow = previous.bodyOverflow
      body.style.paddingRight = previous.padding
    }
  }, [isActive])

  const startLaunch = useMemo(() => contextSafe(() => {
    if (activeRef.current || locationRef.current.pathname !== '/') return
    cancelAnimationFrame(focusFrameRef.current)

    const run = {
      id: ++sequenceRef.current,
      originKey: locationRef.current.key,
      navigated: false,
      reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    }
    activeRef.current = run
    setPhase('launching')

    run.context = gsap.context(() => {
      const select = gsap.utils.selector(overlayRef.current)
      const veil = select('.rocket-transition-veil')
      gsap.set(overlayRef.current, { autoAlpha: 1 })
      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })

      if (run.reduced) {
        timeline.to(veil, { opacity: 1, duration: 0.1 })
      } else {
        const video = videoRef.current
        video.currentTime = 0
        video.play().catch(() => {})
        timeline
          .to(video, { opacity: 1, duration: 0.25 }, 0)
          .call(() => { if (activeRef.current === run) setHomeEffectsPaused(true) }, [], 0.25)
          .to(veil, { opacity: 1, duration: 0.55, ease: 'sine.inOut' }, 4.25)
          .set(video, { opacity: 0 })
          .call(() => video.pause())
      }

      timeline.call(() => {
        if (activeRef.current !== run) return
        run.navigated = true
        navigate('/ready', { state: { rocketLaunchId: run.id } })
      })
    }, shellRef)
  }), [contextSafe, navigate])

  const registerReadyPage = useMemo(() => contextSafe((root) => {
    const run = activeRef.current
    if (!root || !run?.navigated || run.readyRegistered) return undefined
    run.readyRegistered = true
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    let firstFrame
    let secondFrame
    let cancelled = false

    run.context.add(() => {
      const select = gsap.utils.selector(root)
      const entrance = select('.ready-hero-copy, .ready-reflective-card-glow, .ready-hero-note')
      gsap.set(entrance, { opacity: 0, y: run.reduced ? 0 : 22 })
    })

    // Let the destination's effects and its Galaxy canvas paint before removing the cover.
    firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        if (cancelled || activeRef.current !== run || !root.isConnected) return
        setPhase('revealing')
        run.context.add(() => {
          const select = gsap.utils.selector(root)
          const overlay = gsap.utils.selector(overlayRef.current)
          const timeline = gsap.timeline({
            defaults: { ease: 'power3.out' },
            onComplete: () => {
              if (activeRef.current !== run) return
              activeRef.current = null
              run.context.revert()
              videoRef.current?.pause()
              setHomeEffectsPaused(false)
              setPhase('idle')
              focusFrameRef.current = requestAnimationFrame(() => {
                if (sequenceRef.current === run.id && !activeRef.current && root.isConnected) {
                  root.querySelector('h1')?.focus({ preventScroll: true })
                }
              })
            },
          })
          const duration = run.reduced ? 0.1 : 0.7
          timeline
            .to(overlay('.rocket-transition-veil'), { opacity: 0, duration: run.reduced ? 0.1 : 1.35, ease: 'sine.inOut' }, 0)
            .to(select('.ready-hero-copy'), { opacity: 1, y: 0, duration }, run.reduced ? 0 : 0.4)
            .to(select('.ready-reflective-card-glow'), { opacity: 1, y: 0, duration, stagger: run.reduced ? 0 : 0.07 }, run.reduced ? 0 : 0.55)
            .to(select('.ready-hero-note'), { opacity: 1, y: 0, duration: run.reduced ? 0.1 : 0.5 }, run.reduced ? 0 : 0.9)
        })
      })
    })

    const cleanup = () => {
      cancelled = true
      cancelAnimationFrame(firstFrame)
      cancelAnimationFrame(secondFrame)
      run.readyRegistered = false
    }
    run.cancelReady = cleanup
    return cleanup
  }), [contextSafe])

  return (
    <RocketTransitionContext.Provider value={{ phase, homeEffectsPaused, startLaunch, registerReadyPage }}>
      <div ref={shellRef} className="rocket-transition-shell" data-launch-phase={phase}>
        <div className="rocket-transition-content" inert={isActive ? '' : undefined} aria-busy={isActive}>
          {children}
        </div>
        <div ref={overlayRef} className="rocket-transition-overlay" aria-hidden="true">
          <div className="rocket-transition-veil" />
          <video
            ref={videoRef}
            className="rocket-transition-video"
            src={launchVideo}
            preload="auto"
            muted
            playsInline
          />
        </div>
        <span className="rocket-transition-status" role="status">
          {isActive ? (language === 'zh' ? '正在启程…' : 'Launching…') : ''}
        </span>
      </div>
    </RocketTransitionContext.Provider>
  )
}
