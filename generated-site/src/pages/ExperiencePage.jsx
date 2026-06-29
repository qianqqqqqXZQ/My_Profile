import { useEffect, useRef, useState } from 'react'
import LetterGlitch from '../components/LetterGlitch'
import TextType from '../components/TextType'
import researchArchitecture from '../assets/experience/research-architecture.png'
import { featuredProjects, projectExperience, researchExperience } from '../content/siteContent'

function ExperiencePage() {
  const heroRef = useRef(null)
  const [isHeroVisible, setIsHeroVisible] = useState(true)

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
                <TextType
                  as="span"
                  className="experience-title-type"
                  text={[
                    'Hello World!',
                    'Here is my\nResearch, Project and Working\nExperience...',
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
                A timeline layout for course projects, engineering work, research, or competition results.
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
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section projects-section">
          <div className="section-shell">
            <div className="section-header">
              <p className="eyebrow">Featured Work</p>
              <h2>Selected project cards</h2>
              <p className="section-intro">
                Large cards for projects, research, and supporting visuals.
              </p>
            </div>

            <div className="project-stack">
              {featuredProjects.map((project) => (
                <article
                  key={project.id}
                  id={project.id}
                  className={`featured-card ${project.className}`}
                >
                  <div className="featured-visual">
                    <div className="visual-glow" />
                    <div className="visual-grid" />
                    <div className="visual-content">
                      <span>{project.eyebrow}</span>
                      <strong>{project.meta}</strong>
                    </div>
                  </div>
                  <div className="featured-copy">
                    <p className="micro-label">{project.eyebrow}</p>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <span className="inline-link">{project.cta}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ExperiencePage
