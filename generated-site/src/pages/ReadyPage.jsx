import { useEffect, useRef, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Galaxy from '../components/Galaxy'
import { homeRouteCards, readyPageUnlockKey } from '../content/siteContent'

function ReadyPage() {
  const hasUnlocked = typeof window !== 'undefined' && window.sessionStorage.getItem(readyPageUnlockKey) === 'true'
  const routeRef = useRef(null)
  const [isRouteVisible, setIsRouteVisible] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined' || !hasUnlocked) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsRouteVisible(entry?.isIntersecting ?? true)
      },
      {
        threshold: 0.02,
        rootMargin: '240px 0px',
      },
    )

    if (routeRef.current) {
      observer.observe(routeRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [hasUnlocked])

  if (!hasUnlocked) {
    return <Navigate to="/" replace />
  }

  return (
    <div ref={routeRef} className="page-route page-ready">
      <div className="page-ready-background" aria-hidden="true">
        <div className="page-ready-galaxy">
          <Galaxy
            mouseInteraction
            mouseRepulsion
            paused={!isRouteVisible}
            focal={[0.52, 0.44]}
            rotation={[0.98, 0.18]}
            density={1.18}
            glowIntensity={0.62}
            saturation={0.06}
            hueShift={140}
            twinkleIntensity={0.54}
            rotationSpeed={0.095}
            repulsionStrength={2.8}
            speed={1.08}
            starSpeed={0.56}
            maxDpr={1.1}
          />
        </div>
        <div className="page-ready-scrim" />
        <div className="page-ready-noise" />
      </div>

      <section className="ready-hero" aria-label="Ready hero">
        <div className="section-shell ready-hero-shell">
          <div className="ready-hero-copy">
            <h1 className="ready-hero-title">Where Do You Want to Go ?</h1>
          </div>

          <div className="ready-hero-cards">
            <div className="home-route-grid">
              {homeRouteCards.map((card) => (
                <Link key={card.label} className="home-route-card card-surface" to={card.to} aria-label={card.label}>
                  <p className="micro-label">{card.label}</p>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <span className="inline-link">Open Page</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ReadyPage
