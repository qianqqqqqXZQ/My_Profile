import { Link } from 'react-router-dom'
import HeroBackground from '../components/HeroBackground'
import ProfileLanyard from '../components/ProfileLanyard'
import { contactLinks, profileHighlights, strengths } from '../content/siteContent'
import './HomePage.css'

function ProfilePage() {
  return (
    <div className="page-route page-profile">
      <HeroBackground variant="waves" className="profile-hero-shell" paused={false}>
        <section className="page-hero page-profile-hero">
          <div className="section-shell page-profile-hero-grid">
            <aside className="profile-hero-visual">
              <ProfileLanyard paused={false} />
            </aside>

            <div className="profile-hero-copy">
              <p className="eyebrow">Profile</p>
              <h1>Personal profile, background, and contact</h1>
              <p className="page-lead">
                A cleaner profile layout with the lanyard widget on the left and a large
                editorial title block on the right. The section is designed to feel more
                natural and atmospheric than the home page.
              </p>

              <div className="page-hero-actions">
                <Link className="primary-button" to="/contact">
                  Contact Me
                </Link>
                <Link className="secondary-button" to="/experience">
                  View Experience
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
        </section>
      </HeroBackground>

      <main>
        <section className="content-section">
          <div className="section-shell">
            <div className="section-header">
              <p className="eyebrow">Contact</p>
              <h2>Direct links</h2>
              <p className="section-intro">
                Keep the contact cards lower on the page so the hero stays visually dominant.
              </p>
            </div>

            <div className="contact-grid contact-grid--page">
              {contactLinks.map((item) => (
                <a key={item.label} className="contact-card" href={item.href}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </a>
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
