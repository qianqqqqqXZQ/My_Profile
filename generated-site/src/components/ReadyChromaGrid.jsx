import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import './ReadyChromaGrid.css'

const CARD_COLOR_THEMES = [
  {
    accent: '#5ad38f',
    glow: 'rgba(90, 211, 143, 0.34)',
    gradient: 'linear-gradient(145deg, rgba(18, 72, 46, 0.68), rgba(6, 12, 10, 0.18) 58%, rgba(90, 211, 143, 0.14))',
  },
  {
    accent: '#d7b66b',
    glow: 'rgba(215, 182, 107, 0.34)',
    gradient: 'linear-gradient(145deg, rgba(79, 57, 16, 0.68), rgba(15, 11, 6, 0.18) 58%, rgba(215, 182, 107, 0.14))',
  },
  {
    accent: '#d86a6f',
    glow: 'rgba(216, 106, 111, 0.34)',
    gradient: 'linear-gradient(145deg, rgba(84, 23, 28, 0.68), rgba(14, 6, 8, 0.18) 58%, rgba(216, 106, 111, 0.14))',
  },
  {
    accent: '#69a8ea',
    glow: 'rgba(105, 168, 234, 0.34)',
    gradient: 'linear-gradient(145deg, rgba(17, 45, 82, 0.68), rgba(6, 9, 15, 0.18) 58%, rgba(105, 168, 234, 0.14))',
  },
]

function ReadyChromaGrid({
  items,
  actionLabel,
  className = '',
  cardClassName = '',
  renderCard = null,
  themes = CARD_COLOR_THEMES,
  radius = 260,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
}) {
  const rootRef = useRef(null)
  const fadeRef = useRef(null)
  const cardRefs = useRef([])
  const leaveTimerRef = useRef(null)
  const setX = useRef(null)
  const setY = useRef(null)
  const moveX = useRef(null)
  const moveY = useRef(null)
  const fadeOpacity = useRef(null)
  const setFadeOpacity = useRef(null)
  const boundsRef = useRef({ left: 0, top: 0, width: 0, height: 0 })
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const element = rootRef.current
    const fadeElement = fadeRef.current

    if (!element) {
      return undefined
    }

    setX.current = gsap.quickSetter(element, '--x', 'px')
    setY.current = gsap.quickSetter(element, '--y', 'px')
    moveX.current = gsap.quickTo(element, '--x', {
      duration: damping,
      ease,
      unit: 'px',
    })
    moveY.current = gsap.quickTo(element, '--y', {
      duration: damping,
      ease,
      unit: 'px',
    })
    setFadeOpacity.current = fadeElement ? gsap.quickSetter(fadeElement, 'opacity') : null
    fadeOpacity.current = gsap.quickTo(fadeElement, 'opacity', {
      duration: 0.25,
      ease: 'power2.out',
    })

    const updateMetrics = () => {
      const rect = element.getBoundingClientRect()
      boundsRef.current = rect
      setX.current?.(rect.width / 2)
      setY.current?.(rect.height / 2)
    }

    updateMetrics()

    const resizeObserver = new ResizeObserver(() => {
      updateMetrics()
    })

    resizeObserver.observe(element)

    return () => {
      if (leaveTimerRef.current) {
        window.clearTimeout(leaveTimerRef.current)
      }
      resizeObserver.disconnect()
      gsap.killTweensOf(element)
      if (fadeElement) {
        gsap.killTweensOf(fadeElement)
      }
    }
  }, [damping, ease])

  const handleMove = (event) => {
    const bounds = boundsRef.current

    if (!bounds.width || !bounds.height) {
      return
    }

    if (leaveTimerRef.current) {
      window.clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }

    if (!isActive) {
      setIsActive(true)
    }

    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top

    moveX.current?.(x)
    moveY.current?.(y)
    setFadeOpacity.current?.(0)

    cardRefs.current.forEach((card) => {
      if (!card) {
        return
      }

      const localX = x - card.offsetLeft
      const localY = y - card.offsetTop

      card.style.setProperty('--mouse-x', `${localX}px`)
      card.style.setProperty('--mouse-y', `${localY}px`)

      const logo = card.querySelector('.contact-brand-icon')

      if (logo) {
        const cardRect = card.getBoundingClientRect()
        const logoRect = logo.getBoundingClientRect()

        logo.style.setProperty('--brand-mouse-x', `${event.clientX - logoRect.left}px`)
        logo.style.setProperty('--brand-mouse-y', `${event.clientY - logoRect.top}px`)
        logo.style.setProperty('--brand-distance', `${Math.hypot(event.clientX - (logoRect.left + logoRect.width / 2), event.clientY - (logoRect.top + logoRect.height / 2))}px`)
        card.style.setProperty('--card-width', `${cardRect.width}px`)
      }
    })
  }

  const handleLeave = () => {
    const fadeElement = fadeRef.current

    if (!fadeElement) {
      return
    }

    gsap.to(fadeElement, {
      opacity: 1,
      duration: fadeOut,
      ease: 'power2.out',
      overwrite: true,
    })

    if (leaveTimerRef.current) {
      window.clearTimeout(leaveTimerRef.current)
    }

    leaveTimerRef.current = window.setTimeout(() => {
      setIsActive(false)
      leaveTimerRef.current = null
    }, fadeOut * 1000)
  }

  return (
    <div
      ref={rootRef}
      className={`home-route-grid ready-chroma-grid ${isActive ? 'is-active' : ''} ${className}`.trim()}
      style={{ '--r': `${radius}px` }}
      onPointerEnter={(event) => {
        const element = rootRef.current
        if (leaveTimerRef.current) {
          window.clearTimeout(leaveTimerRef.current)
          leaveTimerRef.current = null
        }
        if (element) {
          const rect = element.getBoundingClientRect()
          boundsRef.current = rect

          const x = event.clientX - rect.left
          const y = event.clientY - rect.top

          setX.current?.(x)
          setY.current?.(y)

          cardRefs.current.forEach((card) => {
            if (!card) {
              return
            }

            const localX = x - card.offsetLeft
            const localY = y - card.offsetTop

            card.style.setProperty('--mouse-x', `${localX}px`)
            card.style.setProperty('--mouse-y', `${localY}px`)

            const logo = card.querySelector('.contact-brand-icon')

            if (logo) {
              const logoRect = logo.getBoundingClientRect()

              logo.style.setProperty('--brand-mouse-x', `${event.clientX - logoRect.left}px`)
              logo.style.setProperty('--brand-mouse-y', `${event.clientY - logoRect.top}px`)
              logo.style.setProperty('--brand-distance', `${Math.hypot(event.clientX - (logoRect.left + logoRect.width / 2), event.clientY - (logoRect.top + logoRect.height / 2))}px`)
            }
          })
        }
        setIsActive(true)
        setFadeOpacity.current?.(0)
      }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {items.map((card, index) => {
        const theme = themes[index % themes.length]
        const cardRef = (element) => {
          cardRefs.current[index] = element
        }
        const mergedClassName = `home-route-card card-surface ready-chroma-card ${cardClassName}`.trim()
        const cardStyle = {
          '--card-accent': theme.accent,
          '--card-glow': theme.glow,
          '--card-gradient': theme.gradient,
        }

        if (renderCard) {
          return renderCard({
            item: card,
            index,
            theme,
            cardRef,
            cardClassName: mergedClassName,
            cardStyle,
          })
        }

        return (
          <Link
            key={card.to}
            ref={cardRef}
            className={mergedClassName}
            to={card.to}
            aria-label={card.label}
            style={cardStyle}
          >
            <div className="ready-chroma-card-content">
              <p className="micro-label">{card.label}</p>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span className="inline-link">{actionLabel}</span>
            </div>
          </Link>
        )
      })}
      <div className="ready-chroma-overlay" />
      <div ref={fadeRef} className="ready-chroma-fade" />
    </div>
  )
}

export default ReadyChromaGrid
