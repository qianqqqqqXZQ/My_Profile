import { useEffect, useRef, useState } from 'react'
import LetterGlitch from '../components/LetterGlitch'
import TextType from '../components/TextType'
import researchArchitecture from '../assets/experience/research-architecture.png'
import { projectExperience, researchExperience, workingExperience } from '../content/siteContent'

function ExperiencePage() {
  const heroRef = useRef(null)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [selectedResearchExperience, setSelectedResearchExperience] = useState(null)
  const experienceHeroText = 'Here is my\nResearch, Project and Working\nExperience...'

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry?.isIntersecting ?? true)
      },
      {
        threshold: 0.05,
        rootMargin: '220px 0px',
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
    if (!selectedResearchExperience || typeof window === 'undefined') {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedResearchExperience(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedResearchExperience])

  return (
    <div className="page-route page-experience">
      <div className="page-experience-background" aria-hidden="true">
        <LetterGlitch
          className="page-experience-glitch"
          glitchColors={['#dfe8df', '#738172', '#0b0f0d']}
          glitchSpeed={78}
          centerVignette
          outerVignette
          smooth
          paused={!isHeroVisible}
          maxDpr={1.1}
        />
        <div className="page-experience-scrim" />
        <div className="page-experience-noise" />
      </div>

      <div className="page-experience-content">
        <section ref={heroRef} className="experience-hero">
          <div className="section-shell experience-hero-shell">
            <div className="experience-hero-copy">
              <p className="eyebrow">Experience</p>
              <h1
                className="experience-hero-title"
                aria-label="Hello World! Here is my Research, Project and Working experience..."
              >
                <span className="experience-title-placeholder" aria-hidden="true">
                  {experienceHeroText}
                </span>
                <TextType
                  as="span"
                  className="experience-title-type"
                  text={[
                    'Hello World!',
                    experienceHeroText,
                  ]}
                  typingSpeed={56}
                  deletingSpeed={26}
                  pauseDuration={1600}
                  showCursor
                  hideCursorWhileTyping
                  cursorCharacter="|"
                />
              </h1>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="section-shell">
            <article className="research-focus-card card-surface">
              <div className="research-focus-copy">
                <p className="eyebrow">Research Focus</p>
                <h2 className="research-focus-title">Current Research Interests</h2>
                <p className="research-focus-text">
                  My current research interests lie in deep learning, dynamic neural network
                  scheduling, and computer vision. My present work focuses primarily on
                  dual-branch and multi-branch neural networks, including keyword and speaker
                  recognition models as well as polyp segmentation models.
                </p>
              </div>
              <div className="research-focus-accent">
                <div className="research-focus-image-frame">
                  <img
                    className="research-focus-image"
                    src={researchArchitecture}
                    alt="Edge-enhanced dual-stream transformer architecture diagram"
                  />
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="content-section experience-timeline-section">
          <div className="section-shell">
            <div className="section-header">
              <p className="eyebrow">Timeline</p>
              <h2>Project and research timeline</h2>
              <p className="section-intro">
                A quick chronological view of academic exploration, engineering practice, and project delivery.
              </p>
            </div>

            <div className="experience-stack">
              <div className="experience-card card-surface">
                <div className="card-header">
                  <p className="micro-label">Project Experience</p>
                  <span className="pill">Projects</span>
                </div>
                <div className="timeline">
                  {projectExperience.map((item) => (
                    <article key={item.title} className="timeline-item">
                      <span className="timeline-period">{item.period}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="experience-card card-surface">
                <div className="card-header">
                  <p className="micro-label">Research Experience</p>
                  <span className="pill">Research</span>
                </div>
              <div className="timeline">
                {researchExperience.map((item) => (
                  <article key={item.title} className="timeline-item">
                    <span className="timeline-period">{item.period}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    {item.supervisor ? (
                      <p className="timeline-supervisor">Supervisor: {item.supervisor}</p>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="section-shell">
            <div className="section-header">
              <p className="eyebrow">Research Experience</p>
              <h2>Academic direction and experiment themes</h2>
              <p className="section-intro">
                A research-focused module with a structured timeline presentation and compact thematic tags.
              </p>
            </div>

            <article className="experience-module experience-module--research card-surface">
              <div className="card-header">
                <p className="micro-label">Research Experience</p>
                <span className="pill">Research</span>
              </div>
              <div className="timeline">
                {researchExperience.map((item) => (
                  <article
                    key={item.title}
                    className="research-experience-card timeline-item"
                  >
                    <button
                      type="button"
                      className="research-card-trigger"
                      onClick={() => setSelectedResearchExperience(item)}
                    >
                      <span className="timeline-period">{item.period}</span>
                      <h3>{item.title}</h3>
                    </button>
                    {item.supervisor ? (
                      item.supervisorUrl ? (
                        <a
                          className="research-supervisor-link"
                          href={item.supervisorUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Supervisor: {item.supervisor}
                        </a>
                      ) : (
                        <p className="research-supervisor-text">Supervisor: {item.supervisor}</p>
                      )
                    ) : null}
                    <span className="experience-inline-tag">{item.focus}</span>
                    <button
                      type="button"
                      className="research-card-action"
                      onClick={() => setSelectedResearchExperience(item)}
                    >
                      View details
                    </button>
                  </article>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="content-section">
          <div className="section-shell">
            <div className="section-header">
              <p className="eyebrow">Working Experience</p>
              <h2>Execution, delivery, and collaboration rhythm</h2>
              <p className="section-intro">
                A horizontal card composition that emphasizes role identity, working style, and delivery quality without using a vertical lane.
              </p>
            </div>

            <article className="experience-module experience-module--working card-surface">
              <div className="working-ledger">
                {workingExperience.map((item) => (
                  <article key={`${item.company}-${item.role}`} className="working-ledger-entry">
                    <div className="working-ledger-rail" aria-hidden="true">
                      <span className="working-ledger-dot" />
                    </div>

                    <div className="working-ledger-body">
                      <div className="working-ledger-meta">
                        <span className="working-period">{item.period}</span>
                        <span className="working-ledger-type">Internship</span>
                      </div>

                      <div className="working-ledger-card">
                        <div className="working-company-lockup">
                          {item.logoSrc ? (
                            <span className="working-company-logo-shell" aria-hidden="true">
                              <img
                                className="working-company-logo"
                                src={item.logoSrc}
                                alt={item.logoAlt ?? `${item.company} logo`}
                                loading="lazy"
                              />
                            </span>
                          ) : null}

                          <div className="working-company-copy">
                            <strong className="working-company-name">{item.company}</strong>
                            <h3>{item.role}</h3>
                          </div>
                        </div>

                        <ul className="working-bullets">
                          {item.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="content-section">
          <div className="section-shell">
            <div className="section-header">
              <p className="eyebrow">Project Experience</p>
              <h2>Selected builds and technical outcomes</h2>
              <p className="section-intro">
                A modular project grid that reads more like a curated capability board than a repeated timeline.
              </p>
            </div>

            <article className="experience-module experience-module--project card-surface">
              <div className="card-header">
                <p className="micro-label">Project Experience</p>
                <span className="pill">Projects</span>
              </div>
              <div className="project-experience-grid">
                {projectExperience.map((item) => (
                  <article key={item.title} className="project-experience-tile">
                    <span className="timeline-period">{item.period}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <span className="experience-inline-tag">{item.stack}</span>
                  </article>
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>

      {selectedResearchExperience ? (
        <div
          className="research-modal-backdrop"
          role="presentation"
          onClick={() => setSelectedResearchExperience(null)}
        >
          <article
            className="research-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="research-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="research-modal-close"
              aria-label="Close research details"
              onClick={() => setSelectedResearchExperience(null)}
            >
              x
            </button>
            <div className="research-modal-header">
              <p className="eyebrow">Research Details</p>
              <h2 id="research-modal-title">{selectedResearchExperience.title}</h2>
              <div className="research-modal-meta">
                <span>{selectedResearchExperience.period}</span>
                {selectedResearchExperience.supervisorUrl ? (
                  <a
                    href={selectedResearchExperience.supervisorUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Supervisor: {selectedResearchExperience.supervisor}
                  </a>
                ) : (
                  <span>Supervisor: {selectedResearchExperience.supervisor}</span>
                )}
              </div>
            </div>

            <div className="research-modal-body">
              {selectedResearchExperience.details.map((detail) => (
                <section key={detail.label} className="research-modal-detail">
                  <h3>{detail.label}</h3>
                  <p>{detail.text}</p>
                </section>
              ))}
              <section className="research-modal-detail research-modal-publication">
                <h3>Publication Status</h3>
                <p>{selectedResearchExperience.publicationStatus}</p>
              </section>
            </div>
          </article>
        </div>
      ) : null}
    </div>
  )
}

export default ExperiencePage
