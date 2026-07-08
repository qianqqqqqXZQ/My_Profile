import { useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Galaxy from '../components/Galaxy'
import ReadyChromaGrid from '../components/ReadyChromaGrid'
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
            <ReadyChromaGrid items={copy.routeCards} actionLabel={copy.cardActionLabel} />
            <p className="ready-hero-note">{copy.heroNote}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ReadyPage
