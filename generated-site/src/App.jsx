import ProfileLanyard from './components/ProfileLanyard'
import './App.css'

const heroVideo =
  'https://cdn.coverr.co/videos/coverr-ink-in-water-1562845709483?download=1080p'

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'Profile', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Dance Reels', href: '#dance' },
]

const contactLinks = [
  {
    label: 'Email',
    value: 'your.email@example.com',
    href: 'mailto:your.email@example.com',
  },
  {
    label: 'GitHub',
    value: 'github.com/your-handle',
    href: 'https://github.com/',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/your-profile',
    href: 'https://www.linkedin.com/',
  },
  {
    label: 'Location',
    value: 'Ningbo / China',
    href: '#contact',
  },
]

const projectExperience = [
  {
    title: 'Project Placeholder 01',
    period: '2025',
    description:
      'Replace this with a real project summary, such as a full-stack product, a data visualization system, or a course project with measurable results.',
  },
  {
    title: 'Project Placeholder 02',
    period: '2024',
    description:
      'Use this slot for your role, stack, and outcome. Good examples include web apps, engineering tools, prototypes, or technical coursework.',
  },
]

const researchExperience = [
  {
    title: 'Research Placeholder 01',
    period: 'Research',
    description:
      'Replace this with your real research topic, advisor context, experiment direction, or implementation work such as model evaluation or data analysis.',
  },
  {
    title: 'Research Placeholder 02',
    period: 'Prototype',
    description:
      'This can hold a paper poster, competition work, or a research prototype with a concise explanation of the problem and method.',
  },
]

const featuredProjects = [
  {
    id: 'dance',
    eyebrow: 'Curated Motion',
    title: 'Street Dance Video Collection',
    description:
      'A featured slot reserved for the dance reel entry in the navigation. In the next iteration this can point to your Bilibili, YouTube, or local performance cuts.',
    meta: 'Video archive / performance edits / choreography reels',
    className: 'signal',
    cta: 'Replace with your real dance video link',
  },
  {
    id: 'product',
    eyebrow: 'Product Case Study',
    title: 'Selected CS Projects',
    description:
      'Use this area for two or three projects that best represent your technical range, product sense, and engineering execution.',
    meta: 'React / full-stack / system thinking',
    className: 'aurora',
    cta: 'Replace with screenshots and live links',
  },
  {
    id: 'research-visual',
    eyebrow: 'Research Snapshot',
    title: 'Research and Experiment Archive',
    description:
      'This card is designed for research visuals, experiment outputs, posters, or publication-related material once you provide the real assets.',
    meta: 'Experiments / papers / data stories',
    className: 'matrix',
    cta: 'Replace with real research visuals',
  },
]

const heroHighlights = [
  { label: 'Identity', value: 'Ziqian Xiong / UNNC CS' },
  { label: 'Direction', value: 'Research + Portfolio Presence' },
  { label: 'Visual', value: 'Lanyard Signature Widget' },
  { label: 'Status', value: 'Ready To Personalize Further' },
]

const strengths = [
  {
    title: 'Technical Communication',
    description:
      'Able to turn complex technical ideas into clear structures across code, interface, and presentation.',
  },
  {
    title: 'Execution',
    description:
      'Comfortable carrying work from concept to implementation, especially for student products, prototypes, and portfolio pieces.',
  },
  {
    title: 'Research Mindset',
    description:
      'Interested in evidence, comparison, and methodology rather than stopping at a feature-complete result.',
  },
  {
    title: 'Design Judgment',
    description:
      'Prefers restrained, high-fidelity visual systems with focused information density and a strong sense of finish.',
  },
]

function App() {
  return (
    <div className="site-shell">
      <header className="hero-section" id="home">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="hero-scrim" />
        <div className="hero-noise" />

        <nav className="topbar section-shell">
          <a className="brand" href="#home">
            <span className="brand-mark">N</span>
            <span className="brand-copy">
              <strong>UNNC / CS</strong>
              <span>Personal Resume Site</span>
            </span>
          </a>

          <div className="nav-links">
            {navigation.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <a className="contact-button" href="#contact">
            Contact
          </a>
        </nav>

        <div className="hero-content section-shell">
          <div className="hero-copy">
            <p className="eyebrow">University of Nottingham Ningbo China</p>
            <h1>
              Computer Science Student
              <br />
              Building a Focused Digital Presence
            </h1>
            <p className="hero-summary">
              This base version sets up the visual system, layout, and content
              structure for a personal resume website. The next iteration can
              replace every placeholder with your real resume, screenshots, and
              dance video material.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#projects">
                View Featured Work
              </a>
              <a className="secondary-button" href="#about">
                Explore Profile
              </a>
            </div>
          </div>

          <aside className="hero-visual-column">
            <ProfileLanyard />
          </aside>
        </div>
      </header>

      <main>
        <section className="content-section hero-signature-section">
          <div className="section-shell hero-signature-shell">
            <div className="hero-panel hero-widget-panel">
              <p className="panel-label">Profile Signature / Hero Widget</p>
              <div className="panel-grid">
                {heroHighlights.map((item) => (
                  <article key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </article>
                ))}
              </div>
              <p className="panel-note">
                The hanging card now uses the provided portrait and turns the
                right side of the hero into a stronger personal identifier.
              </p>
            </div>
          </div>
        </section>

        <section className="content-section about-section" id="about">
          <div className="section-shell">
            <div className="section-header">
              <p className="eyebrow">About / Experience</p>
              <h2>Profile and Experience</h2>
              <p className="section-intro">
                The structure is ready for your introduction, contact channels,
                project history, and research background without inventing any
                unverified resume details.
              </p>
            </div>

            <div className="about-grid">
              <div className="portrait-card">
                <div className="portrait-orbit portrait-orbit-one" />
                <div className="portrait-orbit portrait-orbit-two" />
                <div className="portrait-core">
                  <span className="portrait-initial">N</span>
                  <p>UNNC</p>
                </div>
              </div>

              <div className="about-copy card-surface">
                <p className="micro-label">Introduction</p>
                <p className="lead-paragraph">
                  The site already leans into a dark, restrained, high-end
                  technology aesthetic rather than a generic portfolio template.
                  Once you provide the real resume, the copy can be rewritten
                  into a formal personal statement with accurate details.
                </p>
                <div className="contact-grid">
                  {contactLinks.map((item) => (
                    <a key={item.label} className="contact-card" href={item.href}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </a>
                  ))}
                </div>
              </div>

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

        <section className="content-section projects-section" id="projects">
          <div className="section-shell">
            <div className="section-header">
              <p className="eyebrow">Featured Work</p>
              <h2>Selected Projects</h2>
              <p className="section-intro">
                Large cards establish the pacing and visual tone. The generated
                visuals are placeholders that can be replaced directly with your
                real project covers, screenshots, or research imagery.
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

        <section className="content-section strengths-section" id="strengths">
          <div className="section-shell">
            <div className="section-header">
              <p className="eyebrow">Strengths</p>
              <h2>Core Advantages</h2>
              <p className="section-intro">
                These cards define the narrative direction for the profile. They
                can be tightened into sharper, evidence-backed claims once your
                actual resume details are available.
              </p>
            </div>

            <div className="strength-grid">
              {strengths.map((item, index) => (
                <article key={item.title} className="strength-card card-surface">
                  <span className="strength-index">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <section className="contact-section" id="contact">
        <div className="section-shell contact-shell">
          <p className="eyebrow">Final Contact</p>
          <h2>Close on a full-screen contact page with one clear action.</h2>
          <p className="contact-summary">
            This version is already runnable and previewable. In the next round
            you can send the real resume, screenshots, dance links, and any
            reference sites, and the page can be refined into a final polished
            personal website.
          </p>
          <div className="contact-actions">
            <a className="primary-button" href="mailto:your.email@example.com">
              your.email@example.com
            </a>
            <a className="secondary-button" href="#home">
              Back To Top
            </a>
          </div>
          <p className="footer-note">
            Base site by React and Vite. Content placeholders are ready for
            replacement.
          </p>
        </div>
      </section>
    </div>
  )
}

export default App
