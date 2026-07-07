import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroBackground from '../components/HeroBackground'
import ProfileLanyard from '../components/ProfileLanyard'
import { campusActivities, profileHighlights, strengths } from '../content/siteContent'
import './HomePage.css'

function ProfilePage() {
  const heroRef = useRef(null)
  const [isHeroVisible, setIsHeroVisible] = useState(true)

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
              {campusActivities.map((item) => (
                <article key={`${item.organization}-${item.period}`} className="campus-activity-entry card-surface">
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
                    <div className="campus-activity-photo-frame">
                      <span>{item.photoLabel}</span>
                    </div>
                  </div>
                </article>
              ))}
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
    </div>
  )
}

export default ProfilePage
