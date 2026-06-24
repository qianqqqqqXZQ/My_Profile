import PageBanner from '../components/PageBanner'
import { contactLinks, profileHighlights, strengths } from '../content/siteContent'

function ProfilePage() {
  return (
    <div className="page-route">
      <PageBanner
        eyebrow="Profile"
        title="Profile and contact"
        summary="Background, direction, style, and contact methods in one place."
        metaLabel="Profile Snapshot"
        metaTitle="Personal overview"
        metaText="School, major, style, and a compact set of contact links."
        items={profileHighlights}
      />

      <section className="content-section">
        <div className="section-shell">
          <div className="about-grid">
            <div className="portrait-card">
              <div className="portrait-orbit portrait-orbit-one" />
              <div className="portrait-orbit portrait-orbit-two" />
              <div className="portrait-core">
                <span className="portrait-initial">N</span>
                <p>UNNC</p>
              </div>
            </div>

            <div className="about-copy card-surface">
              <p className="micro-label">Introduction</p>
              <p className="lead-paragraph">
                A concise introduction with your background, visual style, and contact links.
              </p>
              <div className="contact-grid">
                {contactLinks.map((item) => (
                  <a key={item.label} className="contact-card" href={item.href}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section strengths-section">
        <div className="section-shell">
          <div className="section-header">
            <p className="eyebrow">Strengths</p>
            <h2>Personal traits and strengths</h2>
            <p className="section-intro">
              Short, high-contrast cards for the profile page.
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
    </div>
  )
}

export default ProfilePage
