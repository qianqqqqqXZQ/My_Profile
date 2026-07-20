import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroBackground from '../components/HeroBackground'
import CircularGallery from '../components/CircularGallery'
import ProfileLanyard from '../components/ProfileLanyard'
import Stack from '../components/Stack'
import {
  campusActivities,
  offCampusActivities,
  profileHighlights,
} from '../content/siteContent'
import './HomePage.css'

const dailyPhotoPlaceholders = [
  '/media/images/daily-photo/daily-photo-01.jpg',
  '/media/images/daily-photo/daily-photo-02.jpg',
  '/media/images/daily-photo/daily-photo-03.jpg',
  '/media/images/daily-photo/daily-photo-04.jpg',
  '/media/images/daily-photo/daily-photo-05.jpg',
  '/media/images/daily-photo/daily-photo-06.jpg',
  '/media/images/daily-photo/daily-photo-07.jpg',
  '/media/images/daily-photo/daily-photo-08.jpg',
]

function ProfilePage() {
  const heroRef = useRef(null)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [activeGallery, setActiveGallery] = useState(null)

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
  }

  const stackCards = useMemo(() => {
    if (!activeGallery?.photos?.length) {
      return []
    }

    return activeGallery.photos.map((photo, index) => (
      <div key={photo.src} className="shuffle-stack-photo-card">
        <div
          className="shuffle-stack-photo-backdrop"
          style={{ backgroundImage: `url(${photo.src})` }}
          aria-hidden="true"
        />
        <img
          className="shuffle-stack-photo-image"
          src={photo.src}
          alt={photo.alt}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </div>
    ))
  }, [activeGallery])

  const renderActivityEntries = (items) =>
    items.map((item) => {
      const itemKey = `${item.organization}-${item.period}`
      const coverPhoto = item.coverPhoto ?? item.photos?.[0] ?? null
      const hasGallery = Boolean(item.photos?.length)
      const renderActivityLink = (className = 'inline-link campus-activity-link') =>
        item.linkHref ? (
          <a
            className={className}
            href={item.linkHref}
            target="_blank"
            rel="noreferrer"
          >
            {item.linkLabel}
          </a>
        ) : null
      const shouldRenderInlineLink =
        item.linkHref && Number.isInteger(item.linkAfterBulletIndex)

      return (
        <article key={itemKey} className="campus-activity-entry card-surface">
          <div className="campus-activity-copy">
            <p className="campus-activity-period">{item.period}</p>
            <p className="campus-activity-organization">{item.organization}</p>
            <h3>{item.role}</h3>

            <ul className="campus-activity-bullets">
              {item.bullets.map((bullet, index) => (
                <li key={bullet}>
                  {bullet}
                  {shouldRenderInlineLink && item.linkAfterBulletIndex === index ? (
                    <span className="campus-activity-bullet-link">
                      {renderActivityLink('inline-link campus-activity-link campus-activity-link--inline')}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>

            {item.linkHref && !shouldRenderInlineLink ? renderActivityLink() : null}
          </div>

          <div className="campus-activity-photo" aria-label={item.photoAlt}>
            {coverPhoto ? (
              <div className="campus-photo-gallery">
                {hasGallery ? (
                  <button
                    type="button"
                    className="campus-photo-hero"
                    onClick={() => setActiveGallery(item)}
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
                      {item.galleryLabel ?? `Open gallery / ${item.photos.length} photos`}
                    </span>
                  </button>
                ) : (
                  <div className="campus-photo-hero campus-photo-hero--static">
                    <span className="campus-photo-card campus-photo-card--single">
                      <span
                        className="campus-photo-card-backdrop"
                        style={{ backgroundImage: `url(${coverPhoto.src})` }}
                        aria-hidden="true"
                      />
                      <img src={coverPhoto.src} alt={coverPhoto.alt} loading="lazy" />
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="campus-activity-photo-frame">
                <span>{item.photoLabel}</span>
              </div>
            )}
          </div>
        </article>
      )
    })

  return (
    <div className="page-route page-profile">
      <div ref={heroRef}>
        <HeroBackground variant="waves" className="profile-hero-shell" paused={!isHeroVisible}>
          <section className="page-hero page-profile-hero">
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

          <section id="campus-activities" className="content-section course-activities-section">
            <div className="section-shell">
              <div className="section-header profile-campus-header">
                <p className="eyebrow">Experience</p>
                <h2>Campus Activities</h2>
                <p className="section-intro">
                  These are some of the activities I have taken part in on campus,
                  showcasing my strong leadership, communication, innovation, and related
                  abilities. Some experiences can be opened as photo galleries for more
                  details.
                </p>
              </div>

              <div className="campus-activity-timeline">{renderActivityEntries(campusActivities)}</div>
            </div>
          </section>

          <main>
            <section id="off-campus-activities" className="content-section course-activities-section">
              <div className="section-shell">
                <div className="section-header profile-off-campus-header">
                  <p className="eyebrow">Experience</p>
                  <h2>Social Activities</h2>
                  <p className="section-intro">
                    The following are some of the activities I have participated in off
                    campus.
                  </p>
                </div>

                <div className="campus-activity-timeline">
                  {offCampusActivities.length ? (
                    renderActivityEntries(offCampusActivities)
                  ) : (
                    <article className="campus-activity-empty card-surface">
                      <p className="campus-activity-empty-label">Section Ready</p>
                      <h3>Add your off-campus experience here</h3>
                      <p>
                        This module is now in place after Campus Activities. Once you give me
                        the specific experience details, I can turn them into cards in the same
                        layout immediately.
                      </p>
                    </article>
                  )}
                </div>
              </div>
            </section>

            <section className="content-section photo-collection-section">
              <div className="section-shell">
                <div className="section-header">
                  <p className="eyebrow">Photo</p>
                  <h2>Daily Photo Collection</h2>
                  <p className="section-intro">Here are some photos from my daily life.</p>
                </div>

                <div className="photo-collection-gallery">
                  <CircularGallery images={dailyPhotoPlaceholders} />
                </div>
              </div>
            </section>
          </main>
        </HeroBackground>
      </div>

      {activeGallery ? (
        <div className="campus-gallery-modal-backdrop" onClick={closeGallery}>
          <div
            className="campus-gallery-modal campus-gallery-modal--stack"
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

            <div className="campus-gallery-modal-header campus-gallery-modal-header--stack">
              <p className="eyebrow">Shuffle Crew Gallery</p>
              <h3 id="campus-gallery-title">{activeGallery.role}</h3>
              <p>
                {activeGallery.organization} / {activeGallery.photos.length} photos
              </p>
              <span className="campus-gallery-stack-hint">Click or drag the top card to browse.</span>
            </div>

            <div className="campus-gallery-stack-stage">
              <div className="campus-gallery-stack-shell">
                <Stack
                  randomRotation
                  sensitivity={180}
                  sendToBackOnClick
                  mobileClickOnly
                  cards={stackCards}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ProfilePage
