import { Navigate, Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import { heroHighlights, homeRouteCards, readyPageUnlockKey } from '../content/siteContent'

function ReadyPage() {
  const hasUnlocked = typeof window !== 'undefined' && window.sessionStorage.getItem(readyPageUnlockKey) === 'true'

  if (!hasUnlocked) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="page-route page-ready">
      <PageBanner
        eyebrow="Ready"
        title="The next page"
        summary="This page collects the content that used to sit below the homepage hero."
        metaLabel="Unlock"
        metaTitle="Access granted"
        metaText="The lower sections now live on a separate page reached from the homepage button."
        items={[
          { label: 'Entry', value: 'Homepage button only' },
          { label: 'Layout', value: 'Card-heavy continuation' },
          { label: 'Tone', value: 'Same dark premium system' },
          { label: 'Status', value: 'Separated from the hero' },
        ]}
      />

      <section className="content-section hero-signature-section">
        <div className="section-shell hero-signature-shell">
          <div className="hero-panel hero-widget-panel">
            <p className="panel-label">Home Navigation / Quick Overview</p>
            <div className="panel-grid">
              {heroHighlights.map((item) => (
                <article key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>
            <p className="panel-note">Overview of the main sections.</p>
          </div>
        </div>
      </section>

      <section className="content-section ready-route-footer">
        <div className="section-shell">
          <div className="section-header">
            <p className="eyebrow">Navigation</p>
            <h2>Four main sections</h2>
            <p className="section-intro">
              The site keeps one visual system while each page focuses on a different subject.
            </p>
          </div>
          <div className="home-route-grid">
            {homeRouteCards.map((card) => (
              <article key={card.label} className="home-route-card card-surface">
                <p className="micro-label">{card.label}</p>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <Link className="inline-link" to={card.to}>
                  Open Page
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ReadyPage
