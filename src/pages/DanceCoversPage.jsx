import { Link } from 'react-router-dom'
import Masonry from '../components/Masonry'
import { danceClips, dancePageContent } from '../content/siteContent'

function DanceCoversPage({ language }) {
  const copy = dancePageContent[language] ?? dancePageContent.en
  const localizedClips = danceClips.map((clip) => (
    language === 'zh'
      ? { ...clip, alt: clip.altZh, title: clip.titleZh }
      : clip
  ))

  return (
    <div className="page-route page-dance-covers" lang={language === 'zh' ? 'zh-CN' : 'en'}>
      <div className="dance-covers-atmosphere" aria-hidden="true" />
      <section className="dance-covers-shell" aria-label={copy.galleryLabel}>
        <header className="dance-covers-header">
          <Link to="/dance" className="dance-covers-back" aria-label={copy.backToPortal} title={copy.backToPortal}>
            <span aria-hidden="true" />
          </Link>
          <div>
            <p className="eyebrow dance-covers-eyebrow">{copy.coversEyebrow}</p>
            <h1>{copy.galleryLabel}</h1>
          </div>
          <span className="dance-covers-count" aria-label={`${localizedClips.length} covers`}>
            {String(localizedClips.length).padStart(2, '0')}
          </span>
        </header>
        <div className="dance-covers-wall">
          <Masonry className="dance-covers-masonry" items={localizedClips} animateFrom="center" balanceColumns />
        </div>
      </section>
    </div>
  )
}

export default DanceCoversPage
