import { danceClips } from '../content/siteContent'

function DancePage() {
  return (
    <div className="page-route page-dance">
      <section className="dance-hero" aria-label="Dance video hero">
        <video className="dance-hero-video" autoPlay muted loop playsInline aria-hidden="true">
          <source src="/generated/dance/dance-hero.mp4" type="video/mp4" />
        </video>
        <div className="dance-hero-scrim" />
      </section>

      <section className="content-section">
        <div className="section-shell">
          <article className="featured-card dance-feature-card">
            <div className="dance-preview">
              <div className="dance-preview-frame">
                <div className="dance-preview-label">Dance Preview Area</div>
                <div className="dance-preview-glow" />
                <p>Video cover or motion poster.</p>
              </div>
            </div>

            <div className="featured-copy">
              <p className="micro-label">Curated Motion</p>
              <h3>Street Dance Video Collection</h3>
              <p>Dance reels, stage cuts, and edit highlights.</p>
              <span className="inline-link">Video details</span>
            </div>
          </article>

          <div className="clip-grid">
            {danceClips.map((clip) => (
              <article key={clip.label} className="clip-card card-surface">
                <p className="micro-label">{clip.label}</p>
                <h3>{clip.title}</h3>
                <p>{clip.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default DancePage
