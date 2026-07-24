import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroBackground from '../components/HeroBackground'
import CircularGallery from '../components/CircularGallery'
import ProfileLanyard from '../components/ProfileLanyard'
import Stack from '../components/Stack'
import { profilePageContent } from '../content/siteContent'
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

function ProfilePage({ language }) {
  const heroRef = useRef(null)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [activeGallery, setActiveGallery] = useState(null)
  const copy = profilePageContent[language] ?? profilePageContent.en

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
            {item.organization ? (
              <p className="campus-activity-organization">{item.organization}</p>
            ) : null}
            {item.role ? <h3>{item.role}</h3> : null}

            {item.bullets.length ? (
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
            ) : null}

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
                    aria-label={copy.gallery.openLabel(item.role)}
                  >
                    <span className="campus-photo-card campus-photo-card--single">
                      <span
                        className="campus-photo-card-backdrop"
                        style={{
                          backgroundImage: `url(${coverPhoto.src})`,
                          backgroundPosition: coverPhoto.objectPosition ?? 'center',
                        }}
                        aria-hidden="true"
                      />
                      <img
                        src={coverPhoto.src}
                        alt={coverPhoto.alt}
                        loading="lazy"
                        style={{
                          objectFit: coverPhoto.objectFit ?? 'contain',
                          objectPosition: coverPhoto.objectPosition ?? 'center',
                        }}
                      />
                    </span>
                    <span className="campus-photo-open-indicator">
                      {item.galleryLabel ?? copy.gallery.fallbackLabel(item.photos.length)}
                    </span>
                  </button>
                ) : (
                  <div className="campus-photo-hero campus-photo-hero--static">
                    <span className="campus-photo-card campus-photo-card--single">
                      <span
                        className="campus-photo-card-backdrop"
                        style={{
                          backgroundImage: `url(${coverPhoto.src})`,
                          backgroundPosition: coverPhoto.objectPosition ?? 'center',
                        }}
                        aria-hidden="true"
                      />
                      <img
                        src={coverPhoto.src}
                        alt={coverPhoto.alt}
                        loading="lazy"
                        style={{
                          objectFit: coverPhoto.objectFit ?? 'contain',
                          objectPosition: coverPhoto.objectPosition ?? 'center',
                        }}
                      />
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
    <div className="page-route page-profile" lang={language === 'zh' ? 'zh-CN' : 'en'}>
      <div ref={heroRef}>
        <HeroBackground variant="waves" className="profile-hero-shell" paused={!isHeroVisible}>
          <section className="page-hero page-profile-hero">
            <div className="section-shell page-profile-hero-shell">
              <aside className="profile-hero-visual" aria-hidden="true">
                <ProfileLanyard paused={false} />
              </aside>

              <div className="page-profile-hero-grid">
                <div className="profile-hero-copy">
                  <p className="eyebrow">{copy.hero.eyebrow}</p>
                  <h1>{copy.hero.title}</h1>
                  <p className="page-lead">{copy.hero.lead}</p>

                  <div className="page-hero-actions">
                    <Link className="primary-button" to="/experience">
                      {copy.hero.experienceAction}
                    </Link>
                    <Link className="secondary-button profile-dance-button" to="/dance">
                      {copy.hero.danceAction}
                    </Link>
                  </div>

                  <div className="profile-highlights">
                    {copy.hero.highlights.map((item) => (
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
      </div>

      <section id="campus-activities" className="content-section course-activities-section">
        <div className="section-shell">
          <div className="section-header profile-campus-header">
            <p className="eyebrow">{copy.campus.eyebrow}</p>
            <h2>{copy.campus.title}</h2>
            <p className="section-intro">{copy.campus.intro}</p>
          </div>

          <div className="campus-activity-timeline">
            {renderActivityEntries(copy.campus.activities)}
          </div>
        </div>
      </section>

      <main>
        <section id="off-campus-activities" className="content-section course-activities-section">
          <div className="section-shell">
            <div className="section-header profile-off-campus-header">
              <p className="eyebrow">{copy.offCampus.eyebrow}</p>
              <h2>{copy.offCampus.title}</h2>
              <p className="section-intro">{copy.offCampus.intro}</p>
            </div>

            <div className="campus-activity-timeline">
              {copy.offCampus.activities.length ? (
                renderActivityEntries(copy.offCampus.activities)
              ) : (
                <article className="campus-activity-empty card-surface">
                  <p className="campus-activity-empty-label">{copy.offCampus.empty.label}</p>
                  <h3>{copy.offCampus.empty.title}</h3>
                  <p>{copy.offCampus.empty.description}</p>
                </article>
              )}
            </div>
          </div>
        </section>

        <section className="content-section photo-collection-section">
          <div className="section-shell">
            <div className="section-header">
              <p className="eyebrow">{copy.photos.eyebrow}</p>
              <h2>{copy.photos.title}</h2>
              <p className="section-intro">{copy.photos.intro}</p>
            </div>

            <div className="photo-collection-gallery">
              <CircularGallery images={dailyPhotoPlaceholders} />
            </div>
          </div>
        </section>
      </main>

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
              aria-label={copy.gallery.closeLabel}
            >
              x
            </button>

            <div className="campus-gallery-modal-header campus-gallery-modal-header--stack">
              <p className="eyebrow">{copy.gallery.eyebrow}</p>
              <h3 id="campus-gallery-title">{activeGallery.role}</h3>
              <p>{copy.gallery.countLabel(activeGallery.organization, activeGallery.photos.length)}</p>
              <span className="campus-gallery-stack-hint">{copy.gallery.hint}</span>
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
