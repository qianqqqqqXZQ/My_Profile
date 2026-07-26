import { danceClips, dancePageContent } from '../content/siteContent'
import Masonry from '../components/Masonry'

function DancePage({ language }) {
  const copy = dancePageContent[language] ?? dancePageContent.en
  const localizedClips = danceClips.map((clip) =>
    language === 'zh'
      ? { ...clip, alt: clip.altZh, title: clip.titleZh }
      : clip
  )

  return (
    <div className="page-route page-dance" lang={language === 'zh' ? 'zh-CN' : 'en'}>
      <section className="dance-hero" aria-label={copy.heroLabel}>
        <video className="dance-hero-video" autoPlay muted loop playsInline aria-hidden="true">
          <source src="/media/video/dance-hero.mp4" type="video/mp4" />
        </video>
        <div className="dance-hero-scrim" />
        <div className="dance-hero-title-shell">
          <div className="dance-hero-title-group">
            <p className="eyebrow dance-hero-eyebrow">{copy.eyebrow}</p>
            <h1 className="dance-hero-title" aria-label={copy.heroTitle}>
              {copy.heroTitleLines.map((line) => (
                <span key={line.join(' ')} className="dance-hero-title-line" aria-hidden="true">
                  {line.map((word) => (
                    <span key={word} className="dance-hero-title-word">
                      {word.split('').map((character, index) => (
                        <span key={`${character}-${index}`} className="dance-hero-title-letter">
                          {character}
                        </span>
                      ))}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
          </div>
        </div>
      </section>

      <section id="dance-gallery" className="dance-gallery-section" aria-label={copy.galleryLabel}>
        <div className="section-shell dance-gallery-shell">
          <Masonry items={localizedClips} animateFrom="center" />
        </div>
      </section>
    </div>
  )
}

export default DancePage
