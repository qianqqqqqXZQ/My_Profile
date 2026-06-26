import { useEffect, useRef, useState } from 'react'
import ContactGlobe from '../components/ContactGlobe'
import Radar from '../components/Radar'
import { contactHero, contactLinks } from '../content/siteContent'

function ContactPage() {
  const heroRef = useRef(null)
  const [isHeroVisible, setIsHeroVisible] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === heroRef.current) {
            setIsHeroVisible(entry.isIntersecting)
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: '200px 0px',
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
    <div className="page-route page-contact">
      <section ref={heroRef} className="contact-hero">
        <div className="contact-hero-stage" aria-hidden="true">
          <div className="contact-hero-orbit" />
          <div className="contact-hero-scrim" />
          <div className="contact-hero-noise" />
          <ContactGlobe paused={!isHeroVisible} />
        </div>

        <div className="section-shell contact-hero-shell">
          <div className="contact-hero-copy">
            <h1>{contactHero.title}</h1>
            <p className="page-lead">{contactHero.summary}</p>
          </div>
        </div>
      </section>

      <section className="contact-section page-contact-section">
        <div className="page-contact-radar" aria-hidden="true">
          <Radar
            speed={0.28}
            scale={0.45}
            ringCount={12}
            spokeCount={14}
            ringThickness={0.055}
            spokeThickness={0.01}
            sweepSpeed={1.15}
            sweepWidth={4.4}
            sweepLobes={1}
            color="#f4edf8"
            backgroundColor="#000000"
            falloff={2.8}
            brightness={1.1}
            enableMouseInteraction={true}
            mouseInfluence={0.05}
          />
        </div>
        <div className="page-contact-radar-scrim" aria-hidden="true" />
        <div className="page-contact-radar-noise" aria-hidden="true" />

        <div className="section-shell contact-shell">
          <div className="contact-radar-content">
            <h2 className="contact-section-title">My Contact Information</h2>
            <div className="contact-grid contact-grid--page">
              {contactLinks.map((item) => (
                <a key={item.label} className="contact-card" href={item.href}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
