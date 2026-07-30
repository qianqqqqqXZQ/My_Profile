import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dancePageContent } from '../content/siteContent'

function DancePage({ language }) {
  const [isEnteringGallery, setIsEnteringGallery] = useState(false)
  const galleryEnterTimer = useRef(null)
  const navigate = useNavigate()
  const copy = dancePageContent[language] ?? dancePageContent.en

  useEffect(() => () => window.clearTimeout(galleryEnterTimer.current), [])

  const enterCovers = () => {
    if (isEnteringGallery) {
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      navigate('/dance/covers')
      return
    }

    setIsEnteringGallery(true)

    galleryEnterTimer.current = window.setTimeout(() => {
      navigate('/dance/covers')
    }, 680)
  }

  return (
    <div className="page-route page-dance-portal" lang={language === 'zh' ? 'zh-CN' : 'en'}>
      <section className={`dance-portal${isEnteringGallery ? ' is-entering' : ''}`} aria-label={copy.heroLabel}>
        <div className="dance-portal-film-grain" aria-hidden="true" />
        <div className="dance-portal-tv-stage">
          <div className="dance-portal-tv-photo">
            <span className="dance-portal-tv-warmth" aria-hidden="true" />
            <button
              type="button"
              className="dance-portal-screen"
              aria-label={copy.galleryLabel}
              title={copy.galleryLabel}
              onClick={enterCovers}
            >
              <video className="dance-hero-video" autoPlay muted loop playsInline aria-hidden="true">
                <source src="/media/video/dance-hero.mp4" type="video/mp4" />
              </video>
              <span className="dance-portal-screen-glass" aria-hidden="true" />
              <span className="dance-portal-screen-enter" aria-hidden="true">
                <span />
              </span>
            </button>
          </div>
        </div>
        <div className="dance-portal-title-shell">
          <div className="dance-portal-title-group">
            <p className="eyebrow dance-portal-eyebrow">{copy.eyebrow}</p>
            <h1 className="dance-portal-title" aria-label={copy.heroTitle}>
              {copy.heroTitleLines.map((line) => (
                <span key={line.join(' ')} className="dance-portal-title-line" aria-hidden="true">
                  {line.map((word) => (
                    <span key={word} className="dance-portal-title-word">
                      {word.split('').map((character, index) => (
                        <span key={`${character}-${index}`} className="dance-portal-title-letter">
                          {character}
                        </span>
                      ))}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DancePage
