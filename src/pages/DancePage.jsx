import { danceClips } from '../content/siteContent'
import Masonry from '../components/Masonry'

const danceHeroTitle = 'Welcome to My Dance Space'
const danceHeroTitleLines = [
  ['Welcome', 'to', 'My'],
  ['Dance', 'Space'],
]

function DancePage() {
  return (
    <div className="page-route page-dance">
      <section className="dance-hero" aria-label="Dance video hero">
        <video className="dance-hero-video" autoPlay muted loop playsInline aria-hidden="true">
          <source src="/media/video/dance-hero.mp4" type="video/mp4" />
        </video>
        <div className="dance-hero-scrim" />
        <div className="dance-hero-title-shell">
          <div className="dance-hero-title-group">
            <p className="eyebrow dance-hero-eyebrow">DANCE VIDEO</p>
            <h1 className="dance-hero-title" aria-label={danceHeroTitle}>
              {danceHeroTitleLines.map((line) => (
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

      <section id="dance-gallery" className="dance-gallery-section" aria-label="Dance video collection">
        <div className="section-shell dance-gallery-shell">
          <Masonry items={danceClips} animateFrom="center" />
        </div>
      </section>
    </div>
  )
}

export default DancePage
