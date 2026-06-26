import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { heroHighlights, homeRouteCards } from '../content/siteContent'
import './HomePage.css'

const PhotoLens = lazy(() => import('../components/PhotoLens'))
const Particles = lazy(() => import('../components/Particles'))

function HomePage() {
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const heroRef = useRef(null)
  const touchStartYRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const getScrollTop = () =>
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    const isAtTop = () => getScrollTop() <= 0
    const preventTopBounce = (event) => {
      if (isAtTop() && event.deltaY < 0) {
        event.preventDefault()
      }
    }
    const handleTouchStart = (event) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null
    }
    const preventTouchBounce = (event) => {
      if (isAtTop() && touchStartYRef.current !== null) {
        const touch = event.touches[0]
        if (touch && touch.clientY > touchStartYRef.current) {
          event.preventDefault()
        }
      }
    }
    const preventKeyboardBounce = (event) => {
      if (!isAtTop()) {
        return
      }

      const blockedKeys = new Set(['ArrowUp', 'PageUp', 'Home', 'Space', ' '])

      if (blockedKeys.has(event.key)) {
        event.preventDefault()
      }
    }

    window.addEventListener('wheel', preventTopBounce, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', preventTouchBounce, { passive: false })
    window.addEventListener('keydown', preventKeyboardBounce, { passive: false })

    return () => {
      window.removeEventListener('wheel', preventTopBounce)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', preventTouchBounce)
      window.removeEventListener('keydown', preventKeyboardBounce)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroRef.current) {
            setIsHeroVisible(entry.isIntersecting)
          }
        })
      },
      {
        root: null,
        threshold: 0.05,
        rootMargin: '240px 0px',
      },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="page-home">
      <div className="page-home-background" aria-hidden="true">
        <Suspense fallback={null}>
          <Particles
            className="page-home-particles"
            particleColors={['#d6d1d1']}
            particleCount={1200}
            particleSpread={18}
            speed={0.1}
            particleBaseSize={140}
            moveParticlesOnHover
            particleHoverFactor={0.2}
            alphaParticles={false}
            disableRotation={false}
            sizeRandomness={0.8}
            cameraDistance={34}
            pixelRatio={1.2}
          />
        </Suspense>
        <div className="page-home-scrim" />
        <div className="page-home-noise" />
      </div>

      <div className="page-home-content">
        <header className="hero-section" id="home" ref={heroRef}>
          <div className="hero-content section-shell">
            <div className="hero-copy">
              <p className="eyebrow">This is a personal webpage.</p>
              <h1>
                Hello!
                <br />
                Welcome to
                <br />
                My Space...
                <br />
                I&apos;m
                <br />
                Ziqian Xiong :)
              </h1>
              <p className="hero-summary hero-summary-home">You&apos;re ready to go?</p>

              <div className="hero-actions">
                <Link className="primary-button" to="/profile">
                  Open Profile
                </Link>
                <Link className="secondary-button" to="/experience">
                  View Experience
                </Link>
              </div>
            </div>

            <aside className="hero-visual-column">
              <Suspense
                fallback={<div className="hero-visual-fallback" aria-hidden="true" />}
              >
                <PhotoLens paused={!isHeroVisible} />
              </Suspense>
            </aside>
          </div>
        </header>

        <main className="home-main">
          <section className="content-section hero-signature-section">
            <div className="section-shell hero-signature-shell">
              <div className="hero-panel hero-widget-panel">
                <p className="panel-label">Home Navigation / Quick Overview</p>
                <div className="panel-grid">
                  {heroHighlights.map((item) => (
                    <article key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </article>
                  ))}
                </div>
                <p className="panel-note">
                  Overview of the main sections.
                </p>
              </div>
            </div>
          </section>

          <section className="content-section home-route-section">
            <div className="section-shell">
              <div className="section-header">
                <p className="eyebrow">Pages</p>
                <h2>Four main sections</h2>
                <p className="section-intro">
                  The site keeps one visual system while each page focuses on a different subject.
                </p>
              </div>

              <div className="home-route-grid">
                {homeRouteCards.map((card) => (
                  <article key={card.label} className="home-route-card card-surface">
                    <p className="micro-label">{card.label}</p>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <Link className="inline-link" to={card.to}>
                      Open Page
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default HomePage
