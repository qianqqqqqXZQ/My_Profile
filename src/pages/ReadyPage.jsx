import { useEffect, useRef, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import BorderGlow from '../components/BorderGlow'
import Galaxy from '../components/Galaxy'
import { readyPageContent, readyPageUnlockKey } from '../content/siteContent'

function ReadyPage({ language }) {
  const hasUnlocked = typeof window !== 'undefined' && window.sessionStorage.getItem(readyPageUnlockKey) === 'true'
  const routeRef = useRef(null)
  const [isRouteVisible, setIsRouteVisible] = useState(true)
  const copy = readyPageContent[language] ?? readyPageContent.en

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
            density={1.08}
            glowIntensity={0.58}
            saturation={0.06}
            hueShift={140}
            twinkleIntensity={0.48}
            rotationSpeed={0.095}
            repulsionStrength={2.45}
            speed={1}
            starSpeed={0.5}
            maxDpr={0.9}
          />
        </div>
        <div className="page-ready-scrim" />
        <div className="page-ready-noise" />
      </div>

      <section className="ready-hero" aria-label="Ready hero">
        <div className="section-shell ready-hero-shell">
          <div className="ready-hero-copy">
            <h1 className="ready-hero-title">{copy.heroTitle}</h1>
          </div>

          <div className="ready-hero-cards">
            <div className="home-route-grid ready-reflective-grid">
              {copy.routeCards.map((card) => (
                <BorderGlow
                  key={card.to}
                  className="ready-reflective-card-glow"
                  edgeSensitivity={10}
                  glowColor="0 0 100"
                  backgroundColor="rgba(8, 8, 10, 0.38)"
                  borderRadius={28}
                  glowRadius={30}
                  glowIntensity={0.9}
                  coneSpread={24}
                  animated={false}
                  colors={['#f5f5f5', '#d7d7d7', '#ffffff']}
                  fillOpacity={0.18}
                >
                  <Link className="home-route-card ready-reflective-card" to={card.to} aria-label={card.label}>
                    <p className="micro-label">{card.label}</p>
                    <div>
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                      <span className="inline-link">{copy.cardActionLabel}</span>
                    </div>
                  </Link>
                </BorderGlow>
              ))}
            </div>
            <p className="ready-hero-note">{copy.heroNote}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ReadyPage
