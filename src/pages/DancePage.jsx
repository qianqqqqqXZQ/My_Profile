import { useEffect, useRef, useState } from 'react'
import { danceClips, dancePageContent } from '../content/siteContent'
import Masonry from '../components/Masonry'

function DancePage({ language }) {
  const [isEnteringGallery, setIsEnteringGallery] = useState(false)
  const galleryEnterTimer = useRef(null)
  const copy = dancePageContent[language] ?? dancePageContent.en
  const localizedClips = danceClips.map((clip) =>
    language === 'zh'
      ? { ...clip, alt: clip.altZh, title: clip.titleZh }
      : clip
  )

  useEffect(() => () => window.clearTimeout(galleryEnterTimer.current), [])

  const enterGallery = (event) => {
    event.preventDefault()

    if (isEnteringGallery) {
      return
    }

    setIsEnteringGallery(true)

    galleryEnterTimer.current = window.setTimeout(() => {
      document.getElementById('dance-gallery')?.scrollIntoView({ behavior: 'auto' })
      setIsEnteringGallery(false)
    }, 680)
  }

  return (
    <div className="page-route page-dance" lang={language === 'zh' ? 'zh-CN' : 'en'}>
      <section className={`dance-hero${isEnteringGallery ? ' is-entering' : ''}`} aria-label={copy.heroLabel}>
        <div className="dance-hero-atmosphere" aria-hidden="true" />
        <div className="vintage-tv-stage">
          <div className="vintage-tv-shadow" aria-hidden="true" />
          <div className="vintage-tv">
            <span className="vintage-tv-woodgrain" aria-hidden="true" />
            <span className="vintage-tv-highlight" aria-hidden="true" />
            <span className="vintage-tv-side vintage-tv-side--left" aria-hidden="true" />
            <span className="vintage-tv-side vintage-tv-side--right" aria-hidden="true" />

            <a
              className="vintage-tv-screen"
              href="#dance-gallery"
              aria-label={copy.galleryLabel}
              onClick={enterGallery}
            >
              <video className="dance-hero-video" autoPlay muted loop playsInline aria-hidden="true">
                <source src="/media/video/dance-hero.mp4" type="video/mp4" />
              </video>
              <span className="vintage-tv-screen-tint" aria-hidden="true" />
              <span className="vintage-tv-screen-glass" aria-hidden="true" />
              <span className="vintage-tv-screen-scanlines" aria-hidden="true" />
              <span className="vintage-tv-screen-enter" aria-hidden="true">
                <span />
              </span>
            </a>

            <div className="vintage-tv-controls" aria-hidden="true">
              <span className="vintage-tv-brand">DANCE / 1984</span>
              <span className="vintage-tv-status"><i /> ON AIR</span>
              <span className="vintage-tv-dial vintage-tv-dial--channel"><i /></span>
              <span className="vintage-tv-dial vintage-tv-dial--volume"><i /></span>
              <span className="vintage-tv-speaker">
                {Array.from({ length: 14 }, (_, index) => <i key={index} />)}
              </span>
            </div>

            <span className="vintage-tv-foot vintage-tv-foot--left" aria-hidden="true" />
            <span className="vintage-tv-foot vintage-tv-foot--right" aria-hidden="true" />
          </div>
        </div>
        <div className="dance-hero-title-shell">
          <div className="dance-hero-title-group">
            <p className="eyebrow dance-hero-eyebrow">{copy.eyebrow}</p>
            <h1 className="dance-hero-title" aria-label={copy.heroTitle}>
              {copy.heroTitleLines.map((line) => (
                <span key={line.join(' ')} className="dance-hero-title-line" aria-hidden="true">
                  {line.map((word) => (
                    <span key={word} className="dance-hero-title-word">
                      {word.split('').map((character, index) => (
                        <span key={`${character}-${index}`} className="dance-hero-title-letter">
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

      <section id="dance-gallery" className="dance-gallery-section" aria-label={copy.galleryLabel}>
        <div className="section-shell dance-gallery-shell">
          <Masonry items={localizedClips} animateFrom="center" balanceColumns />
        </div>
      </section>
    </div>
  )
}

export default DancePage
