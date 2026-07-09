import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroBackground from '../components/HeroBackground'
import ProfileLanyard from '../components/ProfileLanyard'
import { campusActivities, profileHighlights, strengths } from '../content/siteContent'
import './HomePage.css'

function ProfilePage() {
  const heroRef = useRef(null)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [activeGallery, setActiveGallery] = useState(null)
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry?.isIntersecting ?? true)
      },
      {
        threshold: 0.05,
        rootMargin: '220px 0px',
      },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!activeGallery || typeof window === 'undefined') {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveGallery(null)
        return
      }

      if (event.key === 'ArrowRight') {
        setActivePhotoIndex((currentIndex) => (currentIndex + 1) % activeGallery.photos.length)
      }

      if (event.key === 'ArrowLeft') {
        setActivePhotoIndex(
          (currentIndex) => (currentIndex - 1 + activeGallery.photos.length) % activeGallery.photos.length,
        )
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeGallery])

  const closeGallery = () => {
    setActiveGallery(null)
    setActivePhotoIndex(0)
  }

  const openGallery = (item, photoIndex = 0) => {
    setActiveGallery(item)
    setActivePhotoIndex(photoIndex)
  }

  const showPreviousPhoto = () => {
    if (!activeGallery) {
      return
    }

    setActivePhotoIndex((currentIndex) => (currentIndex - 1 + activeGallery.photos.length) % activeGallery.photos.length)
  }

  const showNextPhoto = () => {
    if (!activeGallery) {
      return
    }

    setActivePhotoIndex((currentIndex) => (currentIndex + 1) % activeGallery.photos.length)
  }

  const activePhoto = activeGallery?.photos?.[activePhotoIndex] ?? null

  return (
    <div className="page-route page-profile">
      <HeroBackground variant="waves" className="profile-hero-shell" paused={!isHeroVisible}>
        <section ref={heroRef} className="page-hero page-profile-hero">
          <div className="section-shell page-profile-hero-shell">
            <aside className="profile-hero-visual" aria-hidden="true">
              <ProfileLanyard paused={false} />
            </aside>

            <div className="page-profile-hero-grid">
              <div className="profile-hero-copy">
                <p className="eyebrow">Profile</p>
                <h1>Personal Background</h1>
                <p className="page-lead">
                  This page contains my personal information, but it only includes some
                  general details such as educational background and hobbies. If you are
                  interested in my specific development experiences and dance experiences,
                  please click on the two buttons below.
                </p>

                <div className="page-hero-actions">
                  <Link className="primary-button" to="/experience">
                    View Experience
                  </Link>
                  <Link className="secondary-button profile-dance-button" to="/dance">
                    Dance Video
                  </Link>
                </div>

                <div className="profile-highlights">
                  {profileHighlights.map((item) => (
                    <article key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </HeroBackground>

      <main>
        <section id="campus-activities" className="content-section course-activities-section">
          <div className="section-shell">
            <div className="section-header">
              <p className="eyebrow">Campus Activities</p>
              <h2>Leadership, operations, and performance direction</h2>
              <p className="section-intro">
                Two core extracurricular experiences that reflect how I work across
                campus operations, team leadership, and public-facing performance.
              </p>
            </div>

            <div className="campus-activity-timeline">
              {campusActivities.map((item) => {
                const itemKey = `${item.organization}-${item.period}`
                const coverPhoto = item.photos?.[0] ?? null

                return (
                  <article key={itemKey} className="campus-activity-entry card-surface">
                    <div className="campus-activity-copy">
                      <p className="campus-activity-period">{item.period}</p>
                      <p className="campus-activity-organization">{item.organization}</p>
                      <h3>{item.role}</h3>

                      <ul className="campus-activity-bullets">
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>

                      {item.linkHref ? (
                        <a
                          className="inline-link campus-activity-link"
                          href={item.linkHref}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.linkLabel}
                        </a>
                      ) : null}
                    </div>

                    <div className="campus-activity-photo" aria-label={item.photoAlt}>
                      {coverPhoto ? (
                        <div className="campus-photo-gallery">
                          <button
                            type="button"
                            className="campus-photo-hero"
                            onClick={() => openGallery(item, 0)}
                            aria-label={`Open photo gallery for ${item.role}`}
                          >
                            <span className="campus-photo-card campus-photo-card--single">
                              <span
                                className="campus-photo-card-backdrop"
                                style={{ backgroundImage: `url(${coverPhoto.src})` }}
                                aria-hidden="true"
                              />
                              <img src={coverPhoto.src} alt={coverPhoto.alt} loading="lazy" />
                            </span>
                            <span className="campus-photo-open-indicator">
                              Open gallery · {item.photos.length} photos
                            </span>
                          </button>
                        </div>
                      ) : (
                        <div className="campus-activity-photo-frame">
                          <span>{item.photoLabel}</span>
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="content-section strengths-section">
          <div className="section-shell">
            <div className="section-header">
              <p className="eyebrow">Strengths</p>
              <h2>Core qualities</h2>
              <p className="section-intro">
                A concise set of profile statements that now sits beneath the hero instead of
                competing with it.
              </p>
            </div>

            <div className="strength-grid">
              {strengths.map((item, index) => (
                <article key={item.title} className="strength-card card-surface">
                  <span className="strength-index">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {activeGallery && activePhoto ? (
        <div className="campus-gallery-modal-backdrop" onClick={closeGallery}>
          <div
            className="campus-gallery-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="campus-gallery-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="campus-gallery-close"
              onClick={closeGallery}
              aria-label="Close photo gallery"
            >
              x
            </button>

            <div className="campus-gallery-modal-header">
              <p className="eyebrow">Shuffle Crew Gallery</p>
              <h3 id="campus-gallery-title">{activeGallery.role}</h3>
              <p>
                {activeGallery.organization} · {activePhotoIndex + 1} / {activeGallery.photos.length}
              </p>
            </div>

            <div className="campus-gallery-stage">
              <button
                type="button"
                className="campus-gallery-nav campus-gallery-nav--prev"
                onClick={showPreviousPhoto}
                aria-label="Show previous photo"
              >
                {'<'}
              </button>

              <div className="campus-gallery-image-shell">
                <div
                  className="campus-gallery-image-backdrop"
                  style={{ backgroundImage: `url(${activePhoto.src})` }}
                  aria-hidden="true"
                />
                <img src={activePhoto.src} alt={activePhoto.alt} className="campus-gallery-image" />
              </div>

              <button
                type="button"
                className="campus-gallery-nav campus-gallery-nav--next"
                onClick={showNextPhoto}
                aria-label="Show next photo"
              >
                {'>'}
              </button>
            </div>

            <div className="campus-gallery-filmstrip" aria-label="Gallery thumbnails">
              {activeGallery.photos.map((photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  className={`campus-gallery-filmstrip-item${index === activePhotoIndex ? ' is-active' : ''}`}
                  onClick={() => setActivePhotoIndex(index)}
                  aria-label={`Show photo ${index + 1}`}
                >
                  <span
                    className="campus-gallery-filmstrip-backdrop"
                    style={{ backgroundImage: `url(${photo.src})` }}
                    aria-hidden="true"
                  />
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ProfilePage
