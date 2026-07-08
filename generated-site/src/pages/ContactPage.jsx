import { useEffect, useRef, useState } from 'react'
import ContactBrandIcon from '../components/ContactBrandIcon'
import ContactGlobe from '../components/ContactGlobe'
import ReadyChromaGrid from '../components/ReadyChromaGrid'
import { contactPageContent } from '../content/siteContent'
import wechatQrImage from '../assets/contact/wechat-qr.jpg'
import '../components/ContactBrandIcon.css'

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
            <h1>{copy.hero.title}</h1>
            <p className="page-lead">{copy.hero.summary}</p>
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
