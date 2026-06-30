import { useEffect, useRef, useState } from 'react'
import BorderGlow from '../components/BorderGlow'
import ContactBrandIcon from '../components/ContactBrandIcon'
import ContactGlobe from '../components/ContactGlobe'
import Radar from '../components/Radar'
import { contactHero } from '../content/siteContent'
import wechatQrImage from '../assets/contact/wechat-qr.jpg'
import '../components/ContactBrandIcon.css'

const contactCards = [
  {
    icon: 'gmail',
    title: 'Gmail',
    value: 'ziqianxiong3@gmail.com',
    description:
      'This is my long-term personal email address. You can directly send me emails.',
    href: 'mailto:ziqianxiong3@gmail.com',
    type: 'link',
  },
  {
    icon: 'outlook',
    title: 'Outlook',
    value: 'scyzx7@nottingham.edu.cn',
    description:
      'This is the official email address of my current institution. You can try sending me an email through this.',
    href: 'mailto:scyzx7@nottingham.edu.cn',
    type: 'link',
  },
  {
    icon: 'github',
    title: 'Github',
    value: 'qianqqqqqXZQ',
    description:
      'This is my GitHub page. If you are interested in my code and repositories, please click on it.',
    href: 'https://github.com/qianqqqqqXZQ',
    type: 'external',
  },
  {
    icon: 'wechat',
    title: 'WeChat',
    value: 'XZQqqqqqian',
    description:
      'This is my social media app in China. If you want to become friends with me, just click on it.',
    type: 'modal',
  },
]

function ContactPage() {
  const heroRef = useRef(null)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [isWechatModalOpen, setIsWechatModalOpen] = useState(false)

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

  const renderContactCard = (item) => {
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
          type="button"
          className="contact-card contact-card-button"
          onClick={() => setIsWechatModalOpen(true)}
        >
          {cardContent}
        </button>
      )
    }

    return (
      <a
        className="contact-card"
        href={item.href}
        target={item.type === 'external' ? '_blank' : undefined}
        rel={item.type === 'external' ? 'noreferrer' : undefined}
      >
        {cardContent}
      </a>
    )
  }

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
            scale={0.55}
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
              {contactCards.map((item) => (
                <BorderGlow
                  key={item.title}
                  className="contact-card-glow"
                  edgeSensitivity={10}
                  glowColor="0 0 100"
                  backgroundColor="rgba(8, 8, 10, 0.38)"
                  borderRadius={26}
                  glowRadius={30}
                  glowIntensity={0.9}
                  coneSpread={24}
                  animated={false}
                  colors={['#f5f5f5', '#d7d7d7', '#ffffff']}
                  fillOpacity={0.18}
                >
                  {renderContactCard(item)}
                </BorderGlow>
              ))}
            </div>
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
              aria-label="Close WeChat QR code"
              onClick={closeWechatModal}
            >
              x
            </button>
            <h3 id="wechat-modal-title">WeChat</h3>
            <p>Scan the QR code to add me on WeChat.</p>
            <img src={wechatQrImage} alt="WeChat QR code for XZQqqqqqian" />
            <span>XZQqqqqqian</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ContactPage
