import PageBanner from '../components/PageBanner'
import { contactLinks } from '../content/siteContent'

function ContactPage() {
  return (
    <div className="page-route">
      <PageBanner
        eyebrow="Contact"
        title="Contact"
        summary="Email, social links, and location in one place."
        metaLabel="Final Contact"
        metaTitle="Direct reach"
        metaText="A clear contact page with simple links."
        items={[
          { label: 'Primary action', value: 'Email button and direct links' },
          { label: 'Tone', value: 'Clear, minimal, focused' },
          { label: 'Layout', value: 'Centered contact page' },
          { label: 'Status', value: 'Ready for your final details' },
        ]}
      />

      <section className="contact-section page-contact-section">
        <div className="section-shell contact-shell">
          <p className="eyebrow">Final Contact</p>
          <h2>Close with one clear action.</h2>
          <p className="contact-summary">A direct route to email and social links.</p>
          <div className="contact-actions">
            <a className="primary-button" href="mailto:your.email@example.com">
              your.email@example.com
            </a>
            <a className="secondary-button" href="https://github.com/">
              GitHub
            </a>
          </div>

          <div className="contact-grid contact-grid--page">
            {contactLinks.map((item) => (
              <a key={item.label} className="contact-card" href={item.href}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </a>
            ))}
          </div>

          <p className="footer-note">React and Vite portfolio site.</p>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
