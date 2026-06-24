import PageBanner from '../components/PageBanner'
import { danceClips } from '../content/siteContent'

function DancePage() {
  return (
    <div className="page-route">
      <PageBanner
        eyebrow="Dance Videos"
        title="Dance videos"
        summary="Performance clips, edits, and video links in one place."
        metaLabel="Motion Archive"
        metaTitle="Video-first layout"
        metaText="Bilibili, YouTube, Douyin, or local video links fit here."
        items={[
          { label: 'Format', value: 'Video links and performance clips' },
          { label: 'Tone', value: 'Same dark premium style' },
          { label: 'Layout', value: 'Wide featured card plus clip grid' },
          { label: 'Status', value: 'Waiting for real footage' },
        ]}
      />

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
