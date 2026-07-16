import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SplitText from '../components/SplitText'
import { homePageContent, readyPageUnlockKey } from '../content/siteContent'
import './HomePage.css'

const PhotoLens = lazy(() => import('../components/PhotoLens'))
const Particles = lazy(() => import('../components/Particles'))

function HomePage({ language }) {
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const heroRef = useRef(null)
  const touchStartYRef = useRef(null)
  const copy = homePageContent[language] ?? homePageContent.en

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

  const handleReady = () => {
    if (typeof window === 'undefined') {
      return
    }

    window.sessionStorage.setItem(readyPageUnlockKey, 'true')
  }

  return (
    <div className="page-home">
      <div className="page-home-background" aria-hidden="true">
        <Suspense fallback={null}>
          <Particles
            className="page-home-particles"
            particleColors={['#d6d1d1']}
            particleCount={760}
            particleSpread={16}
            speed={0.1}
            particleBaseSize={118}
            moveParticlesOnHover
            particleHoverFactor={0.16}
            alphaParticles={false}
            disableRotation={false}
            sizeRandomness={0.65}
            cameraDistance={34}
            pixelRatio={1}
            paused={!isHeroVisible}
            maxIdleFps={18}
          />
        </Suspense>
        <div className="page-home-scrim" />
        <div className="page-home-noise" />
      </div>

      <div className="page-home-content">
        <header className="hero-section" id="home" ref={heroRef}>
          <div className="hero-content section-shell">
            <div className="hero-copy">
              <p className="eyebrow">{copy.eyebrow}</p>
              <h1 className="split-home-title" aria-label={copy.titleAriaLabel}>
                {copy.titleLines.map((line, index) => (
                  <SplitText
                    key={`${language}-${line}`}
                    tag="span"
                    text={line}
                    className="split-home-line"
                    delay={50 + index * 60}
                    duration={0.7}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 42 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="left"
                  />
                ))}
              </h1>
              <p className="hero-summary hero-summary-home">{copy.summary}</p>

              <div className="hero-actions">
                <Link className="ready-button" to="/ready" onClick={handleReady}>
                  {copy.ctaLabel}
                </Link>
              </div>
            </div>

            <aside className="hero-visual-column">
              <Suspense fallback={<div className="hero-visual-fallback" aria-hidden="true" />}>
                <PhotoLens paused={!isHeroVisible} />
              </Suspense>
            </aside>
          </div>
        </header>
      </div>
    </div>
  )
}

export default HomePage
