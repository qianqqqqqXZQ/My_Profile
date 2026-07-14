import { useEffect, useRef, useState } from 'react'
import ContactBrandIcon from '../components/ContactBrandIcon'
import ContactGlobe from '../components/ContactGlobe'
import FadeContent from '../components/FadeContent'
import ReadyChromaGrid from '../components/ReadyChromaGrid'
import { contactPageContent } from '../content/siteContent'
import wechatQrImage from '../assets/contact/wechat-qr.jpg'
import '../components/ContactBrandIcon.css'

const CONTACT_CARD_THEMES = [
  {
    accent: '#ea4335',
    glow: 'rgba(234, 67, 53, 0.34)',
    gradient: 'linear-gradient(145deg, rgba(95, 26, 20, 0.68), rgba(18, 7, 7, 0.18) 58%, rgba(234, 67, 53, 0.14))',
  },
  {
    accent: '#0a66d9',
    glow: 'rgba(10, 102, 217, 0.34)',
    gradient: 'linear-gradient(145deg, rgba(14, 47, 97, 0.68), rgba(6, 10, 18, 0.18) 58%, rgba(10, 102, 217, 0.14))',
  },
  {
    accent: '#d4af37',
    glow: 'rgba(212, 175, 55, 0.34)',
    gradient: 'linear-gradient(145deg, rgba(91, 70, 14, 0.68), rgba(17, 12, 6, 0.18) 58%, rgba(212, 175, 55, 0.14))',
  },
  {
    accent: '#2ccf62',
    glow: 'rgba(44, 207, 98, 0.34)',
    gradient: 'linear-gradient(145deg, rgba(17, 86, 40, 0.68), rgba(6, 13, 9, 0.18) 58%, rgba(44, 207, 98, 0.14))',
  },
]

function ContactPage({ language }) {
  const heroRef = useRef(null)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [isWechatModalOpen, setIsWechatModalOpen] = useState(false)
  const copy = contactPageContent[language] ?? contactPageContent.en

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

  useEffect(() => {
    if (!isWechatModalOpen || typeof window === 'undefined') {
      return undefined
    }

    const previousOverflow = document.body.style.overflow

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsWechatModalOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isWechatModalOpen])

  const closeWechatModal = () => {
    setIsWechatModalOpen(false)
  }

  const renderContactCard = ({ item, cardRef, cardClassName, cardStyle }) => {
    const cardContent = (
      <>
        <div className="contact-card-icon" aria-hidden="true">
          <span className="contact-card-icon-sheen" />
          <ContactBrandIcon name={item.icon} />
        </div>
        <strong>{item.title}</strong>
        <p>{item.description}</p>
        <span>{item.value}</span>
      </>
    )

    if (item.type === 'modal') {
      return (
        <button
          key={item.title}
          ref={cardRef}
          type="button"
          className={`${cardClassName} contact-card contact-card-button`}
          style={cardStyle}
          onClick={() => setIsWechatModalOpen(true)}
        >
          {cardContent}
        </button>
      )
    }

    return (
      <a
        key={item.title}
        ref={cardRef}
        className={`${cardClassName} contact-card`}
        href={item.href}
        target={item.type === 'external' ? '_blank' : undefined}
        rel={item.type === 'external' ? 'noreferrer' : undefined}
        style={cardStyle}
      >
        {cardContent}
      </a>
    )
  }

  return (
    <div className="page-route page-contact">
      <div className="page-contact-background" aria-hidden="true">
        <div className="contact-hero-orbit" />
        <ContactGlobe paused={!isHeroVisible} />
        <div className="contact-hero-scrim" />
        <div className="contact-hero-noise" />
      </div>

      <section ref={heroRef} className="contact-hero">
        <div className="section-shell contact-hero-shell">
          <div className="contact-hero-copy">
            <FadeContent blur duration={1000} ease="power2.out" threshold={0.2}>
              <h1>{copy.hero.title}</h1>
            </FadeContent>
            <FadeContent blur duration={1000} delay={180} ease="power2.out" threshold={0.2}>
              <p className="page-lead">{copy.hero.summary}</p>
            </FadeContent>
          </div>
        </div>
      </section>

      <section className="contact-section page-contact-section">
        <div className="section-shell contact-shell">
          <div className="contact-radar-content">
            <h2 className="contact-section-title">{copy.sectionTitle}</h2>
            <ReadyChromaGrid
              items={copy.cards}
              className="contact-grid contact-grid--page"
              cardClassName="contact-card"
              radius={220}
              themes={CONTACT_CARD_THEMES}
              renderCard={renderContactCard}
            />
          </div>
        </div>
      </section>

      {isWechatModalOpen ? (
        <div
          className="wechat-modal-backdrop"
          role="presentation"
          onClick={closeWechatModal}
        >
          <div
            className="wechat-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wechat-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="wechat-modal-close"
              aria-label={copy.wechatModal.closeLabel}
              onClick={closeWechatModal}
            >
              x
            </button>
            <h3 id="wechat-modal-title">{copy.wechatModal.title}</h3>
            <p>{copy.wechatModal.summary}</p>
            <img src={wechatQrImage} alt={copy.wechatModal.imageAlt} />
            <span>XZQqqqqqian</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ContactPage
