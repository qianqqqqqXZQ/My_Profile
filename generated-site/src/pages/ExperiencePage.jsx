import PageBanner from '../components/PageBanner'
import { featuredProjects, projectExperience, researchExperience } from '../content/siteContent'

function ExperiencePage() {
  return (
    <div className="page-route">
      <PageBanner
        eyebrow="Experience"
        title="Projects and research"
        summary="Development work, technical practice, and research in one place."
        metaLabel="Development Track"
        metaTitle="Selected work"
        metaText="Project cards, research cards, and a focused layout."
        items={[
          { label: 'Project cards', value: 'Separate from the home page' },
          { label: 'Research cards', value: 'Shared visual system' },
          { label: 'Layout', value: 'Card-heavy and readable' },
          { label: 'Status', value: 'Ready for content' },
        ]}
      />

      <section className="content-section">
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
  )
}

export default ExperiencePage
