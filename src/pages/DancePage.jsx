import { useEffect, useRef, useState } from 'react'
import { danceClips, dancePageContent } from '../content/siteContent'
import Masonry from '../components/Masonry'
import { assetPath } from '../utils/assetPath'

function DancePage({ language }) {
  const copy = dancePageContent[language] ?? dancePageContent.en
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef(null)
  const closeButtonRef = useRef(null)
  const openerRef = useRef(null)
  const isChinese = language === 'zh'
  const videoCopy = isChinese
    ? { close: '关闭视频播放器', error: '视频暂时无法播放，请稍后重试。' }
    : { close: 'Close video player', error: 'This video could not be played. Please try again later.' }
  const localizedClips = danceClips.map((clip) =>
    language === 'zh'
      ? {
        ...clip,
        alt: clip.altZh,
        title: clip.titleZh,
        actionLabel: clip.videoUrl ? `${clip.titleZh}，播放视频` : undefined,
      }
      : {
        ...clip,
        actionLabel: clip.videoUrl ? `Play ${clip.title} video` : undefined,
      }
  )

  useEffect(() => {
    if (!selectedVideo) {
      if (openerRef.current) {
        openerRef.current.focus()
        openerRef.current = null
      }
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedVideo(null)
        return
      }

      if (event.key === 'Tab') {
        const focusableElements = Array.from(
          document.querySelectorAll('.dance-video-modal button, .dance-video-modal video[controls]')
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault()
          lastElement?.focus()
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement?.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    videoRef.current?.play().catch(() => {})

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedVideo])

  const openVideo = (clip, event) => {
    openerRef.current = event.currentTarget
    setVideoError(false)
    setSelectedVideo(clip)
  }

  return (
    <div className="page-route page-dance" lang={language === 'zh' ? 'zh-CN' : 'en'}>
      <section className="dance-hero" aria-label={copy.heroLabel}>
        <video className="dance-hero-video" autoPlay muted loop playsInline aria-hidden="true">
          <source src={assetPath('/media/video/dance-hero.mp4')} type="video/mp4" />
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
          <Masonry
            items={localizedClips}
            animateFrom="center"
            balanceColumns
            onItemClick={openVideo}
          />
        </div>
      </section>

      {selectedVideo ? (
        <div
          className="dance-video-modal-backdrop"
          role="presentation"
          onClick={() => setSelectedVideo(null)}
        >
          <section
            className="dance-video-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dance-video-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="dance-video-modal-header">
              <div>
                <p className="eyebrow">{isChinese ? '舞蹈视频' : 'DANCE VIDEO'}</p>
                <h2 id="dance-video-modal-title">{selectedVideo.title}</h2>
              </div>
              <button
                ref={closeButtonRef}
                className="dance-video-modal-close"
                type="button"
                aria-label={videoCopy.close}
                onClick={() => setSelectedVideo(null)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </header>
            <div className="dance-video-modal-stage">
              <video
                ref={videoRef}
                key={selectedVideo.videoUrl}
                src={selectedVideo.videoUrl}
                controls
                autoPlay
                playsInline
                preload="metadata"
                onError={() => setVideoError(true)}
              />
              {videoError ? <p className="dance-video-modal-error" role="status">{videoCopy.error}</p> : null}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  )
}

export default DancePage
