import { useEffect, useRef, useState } from 'react'
import LetterGlitch from '../components/LetterGlitch'
import TextType from '../components/TextType'
import researchArchitecture from '../assets/experience/research-architecture.png'
import { projectExperience, researchExperience, workingExperience } from '../content/siteContent'

const monthOrder = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
}

const getPeriodStartValue = (period) => {
  const periodStart = period.split('-')[0]?.trim().replace('.', '') ?? ''
  const year = Number(periodStart.match(/\d{4}/)?.[0] ?? 0)
  const monthName = periodStart.match(/[A-Za-z]+/)?.[0]?.toLowerCase() ?? ''

  return year * 100 + (monthOrder[monthName] ?? 0)
}

const pageCopy = {
  en: {
    heroEyebrow: 'Academic',
    heroGreeting: 'Hello World!',
    heroText: 'Here is my\nResearch, Project and Working\nExperience...',
    heroAriaLabel: 'Hello World! Here is my Research, Project and Working experience...',
    focusEyebrow: 'Research Focus',
    focusTitle: 'Current Research Interests',
    focusLines: [
      'My current research interests lie in deep learning, dynamic neural network scheduling,',
      'and computer vision. My present work focuses primarily on dual-branch and',
      'multi-branch neural networks, including keyword and speaker recognition models as well as polyp segmentation models.',
    ],
    timelineEyebrow: 'Timeline',
    timelineTitle: 'Experience timeline',
    timelineIntro: 'A quick chronological view of my project, research, and working experience.',
    timelineMicroLabel: 'Project / Research / Working',
    timelinePill: 'Timeline',
    typeLabels: {
      project: 'Project',
      research: 'Research',
      working: 'Working',
    },
    researchEyebrow: 'Research',
    researchTitle: 'Research Experience',
    researchIntro:
      'The following are the research experiences I have participated in. You can click View details to see the specific content.',
    researchMicroLabel: 'Research Experience',
    researchPill: 'Research',
    viewDetails: 'View details',
    supervisorLabel: 'Supervisor',
    workingEyebrow: 'Working',
    workingTitle: 'Working Experience',
    workingIntro: 'These are my computer science-related internship and work experiences in companies.',
    workingType: 'Internship',
    projectEyebrow: 'Project',
    projectTitle: 'Project Experience',
    projectIntro: 'The following are personal and team projects I have participated in.',
    projectMicroLabel: 'Project',
    projectPill: 'Projects',
    modalCloseLabel: 'Close research details',
    modalEyebrow: 'Research Details',
    timeLabel: 'Time',
    publicationStatusTitle: 'Publication Status',
    repositoryLabel: 'Open the research repository on GitHub',
  },
  zh: {
    heroEyebrow: '经历',
    heroGreeting: 'Hello World!',
    heroText: '这里是我的\n科研、项目和工作\n经历...',
    heroAriaLabel: 'Hello World! 这里是我的科研、项目和工作经历...',
    focusEyebrow: '研究方向',
    focusTitle: '当前研究兴趣',
    focusLines: [
      '我目前的研究兴趣集中在深度学习、动态神经网络调度',
      '以及计算机视觉方向。现阶段主要关注双分支和',
      '多分支神经网络，包括关键词/说话人识别模型以及息肉分割模型。',
    ],
    timelineEyebrow: '时间线',
    timelineTitle: '经历时间线',
    timelineIntro: '按时间顺序快速浏览我的项目、科研和工作经历。',
    timelineMicroLabel: '项目 / 科研 / 工作',
    timelinePill: '时间线',
    typeLabels: {
      project: '项目',
      research: '科研',
      working: '工作',
    },
    researchEyebrow: '科研',
    researchTitle: '科研经历',
    researchIntro: '以下是我参与过的科研经历。你可以点击查看详情了解具体内容。',
    researchMicroLabel: '科研经历',
    researchPill: '科研',
    viewDetails: '查看详情',
    supervisorLabel: '导师',
    workingEyebrow: '工作',
    workingTitle: '工作经历',
    workingIntro: '这里展示我与计算机科学相关的公司实习和工作经历。',
    workingType: '实习',
    projectEyebrow: '项目',
    projectTitle: '项目经历',
    projectIntro: '以下是我参与的个人项目与团队项目',
    projectMicroLabel: '项目',
    projectPill: '项目',
    modalCloseLabel: '关闭科研详情',
    modalEyebrow: '科研详情',
    publicationStatusTitle: '发表状态',
  },
}

const getLocalizedValue = (item, field, language) => {
  if (language === 'zh') {
    return item[`${field}ZhOverride`] ?? item[`${field}Zh`] ?? item[field]
  }

  return item[field]
}

const getLocalizedDetails = (details, language) =>
  details.map((detail) => ({
    label: getLocalizedValue(detail, 'label', language),
    text: getLocalizedValue(detail, 'text', language),
  }))

const academicBackgroundItems = [
  {
    label: {
      en: 'GPA',
      zh: 'GPA',
    },
    value: {
      en: '3.7 (UK First-Class Honours equivalent)',
      zh: '3.7 (\u82f1\u5236\u4e00\u7b49\u5b66\u4f4d)',
    },
  },
  {
    label: {
      en: 'Language Ability',
      zh: '\u8bed\u8a00\u80fd\u529b',
    },
    value: {
      en: 'English (currently preparing for TOEFL), Chinese (native)',
      zh: '\u82f1\u8bed(\u6258\u798f\u6b63\u5728\u5907\u8003), \u4e2d\u6587(\u6bcd\u8bed)',
    },
  },
]

const academicBackgroundCopy = {
  en: {
    eyebrow: 'Academic Background',
    title: 'My Basic Academic Background',
    description: 'The following is some of my basic personal academic information.',
    coursesTitle: 'Undergraduate Courses Taken',
  },
  zh: {
    eyebrow: '\u5b66\u672f\u80cc\u666f',
    title: '\u6211\u7684\u57fa\u7840\u5b66\u672f\u80cc\u666f',
    description: '\u4ee5\u4e0b\u662f\u6211\u7684\u4e00\u4e9b\u57fa\u672c\u7684\u4e2a\u4eba\u5b66\u672f\u4fe1\u606f\u3002',
    coursesTitle: '\u672c\u79d1\u9636\u6bb5\u6240\u4fee\u8bfe\u7a0b',
  },
}

const undergraduateCourses = [
  'Computer Fundamentals',
  'Databases and Interfaces',
  'Foundation Algebra for Physical Science & Engineering',
  'Foundation Calculus and Mathematical Techniques',
  'Foundation Physics',
  'Fundamental of Artificial Intelligence',
  'Introduction to Algorithms',
  'Introduction to Mathematical Software and Programming',
  'Mathematics for Computer Scientists',
  'Programming and Algorithms',
  'Programming Paradigms',
  'Software Engineering',
  'Systems and Architecture',
]

function ExperiencePage({ language = 'en' }) {
  const copy = pageCopy[language] ?? pageCopy.en
  const academicCopy = academicBackgroundCopy[language] ?? academicBackgroundCopy.en
  const heroRef = useRef(null)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [selectedResearchExperience, setSelectedResearchExperience] = useState(null)
  const timelineExperience = [
    ...projectExperience.map((item) => ({
      type: copy.typeLabels.project,
      period: getLocalizedValue(item, 'period', language),
      title: getLocalizedValue(item, 'title', language),
      description: getLocalizedValue(item, 'description', language),
      sortValue: item.sortValue ?? getPeriodStartValue(item.period),
    })),
    ...researchExperience.map((item) => ({
      type: copy.typeLabels.research,
      period: getLocalizedValue(item, 'period', language),
      title: getLocalizedValue(item, 'title', language),
      description: getLocalizedValue(item, 'description', language),
      sortValue: item.sortValue ?? getPeriodStartValue(item.period),
    })),
    ...workingExperience.map((item) => ({
      type: copy.typeLabels.working,
      period: getLocalizedValue(item, 'period', language),
      title: `${getLocalizedValue(item, 'company', language)} - ${getLocalizedValue(item, 'role', language)}`,
      description: getLocalizedValue(item, 'bullets', language)?.[0],
      sortValue: item.sortValue ?? getPeriodStartValue(item.period),
    })),
  ].sort((firstItem, secondItem) => secondItem.sortValue - firstItem.sortValue)

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
              <p className="eyebrow">{copy.heroEyebrow}</p>
              <h1
                className="experience-hero-title"
                aria-label={copy.heroAriaLabel}
              >
                <span className="experience-title-placeholder" aria-hidden="true">
                  {copy.heroText}
                </span>
                <TextType
                  as="span"
                  className="experience-title-type"
                  text={[
                    copy.heroGreeting,
                    copy.heroText,
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
            <article className="academic-background-card card-surface">
              <div className="academic-background-heading">
                <p className="eyebrow">{academicCopy.eyebrow}</p>
                <h2>{academicCopy.title}</h2>
                <p>
                  {academicCopy.description}
                </p>
              </div>

              <div className="academic-background-details">
                {academicBackgroundItems.map((item) => (
                  <div key={item.label.en} className="academic-background-detail">
                    <span>{item.label[language] ?? item.label.en}</span>
                    <strong>{item.value[language] ?? item.value.en}</strong>
                  </div>
                ))}
              </div>

              <div className="academic-course-list">
                <h3>{academicCopy.coursesTitle}</h3>
                <ul>
                  {undergraduateCourses.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section className="content-section">
          <div className="section-shell">
            <article className="research-focus-card card-surface">
              <div className="research-focus-copy">
                <p className="eyebrow">{copy.focusEyebrow}</p>
                <h2 className="research-focus-title">{copy.focusTitle}</h2>
                <p className="research-focus-text">
                  {copy.focusLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
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
              <p className="eyebrow">{copy.timelineEyebrow}</p>
              <h2>{copy.timelineTitle}</h2>
              <p className="section-intro">
                {copy.timelineIntro}
              </p>
            </div>

            <div className="experience-stack">
              <div className="experience-card card-surface">
                <div className="card-header">
                  <p className="micro-label">{copy.timelineMicroLabel}</p>
                  <span className="pill">{copy.timelinePill}</span>
                </div>
                <div className="timeline">
                  {timelineExperience.map((item) => (
                    <article key={`${item.type}-${item.title}`} className="timeline-item timeline-item--typed">
                      <span className="timeline-type-badge">{item.type}</span>
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

        <section className="content-section">
          <div className="section-shell">
            <div className="section-header section-header--research">
              <p className="eyebrow">{copy.researchEyebrow}</p>
              <h2>{copy.researchTitle}</h2>
              <p className="section-intro">
                {copy.researchIntro}
              </p>
            </div>

            <article className="experience-module experience-module--research card-surface">
              <div className="card-header">
                <p className="micro-label">{copy.researchMicroLabel}</p>
                <span className="pill">{copy.researchPill}</span>
              </div>
              <div className="timeline">
                {researchExperience.map((item) => (
                  <article
                    key={item.title}
                    className="research-experience-card timeline-item"
                  >
                    <div className="research-card-layout">
                      <div className="research-card-content">
                        <button
                          type="button"
                          className="research-card-trigger"
                          onClick={() => setSelectedResearchExperience(item)}
                        >
                          <span className="timeline-period">{getLocalizedValue(item, 'period', language)}</span>
                          <h3>{getLocalizedValue(item, 'title', language)}</h3>
                        </button>
                        <div className="research-card-actions">
                          <button
                            type="button"
                            className="research-card-action"
                            onClick={() => setSelectedResearchExperience(item)}
                          >
                            {copy.viewDetails}
                          </button>
                          {item.supervisor ? (
                            item.supervisorUrl ? (
                              <a
                                className="research-supervisor-link"
                                href={item.supervisorUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {copy.supervisorLabel}: {item.supervisor}
                              </a>
                            ) : (
                              <p className="research-supervisor-text">{copy.supervisorLabel}: {item.supervisor}</p>
                            )
                          ) : null}
                          {item.authorshipLabel ? (
                            <span className="research-authorship-tag">{item.authorshipLabel}</span>
                          ) : null}
                        </div>
                      </div>
                      {item.logoSrc ? (
                        <div className="research-card-logo-shell" aria-hidden="true">
                          <img
                            className="research-card-logo"
                            src={item.logoSrc}
                            alt={item.logoAlt ?? ''}
                            loading="lazy"
                          />
                        </div>
                      ) : null}
                    </div>
                    {item.focus ? (
                      <span className="experience-inline-tag">{item.focus}</span>
                    ) : null}
                  </article>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="content-section">
          <div className="section-shell">
            <div className="section-header section-header--research">
              <p className="eyebrow">{copy.workingEyebrow}</p>
              <h2>{copy.workingTitle}</h2>
              <p className="section-intro">
                {copy.workingIntro}
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
                        <span className="working-period">{getLocalizedValue(item, 'period', language)}</span>
                        <span className="working-ledger-type">{copy.workingType}</span>
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
                            <strong className="working-company-name">{getLocalizedValue(item, 'company', language)}</strong>
                            <h3>{getLocalizedValue(item, 'role', language)}</h3>
                          </div>
                        </div>

                        <ul className="working-bullets">
                          {getLocalizedValue(item, 'bullets', language).map((bullet) => (
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
            <div className="section-header section-header--research">
              <p className="eyebrow">{copy.projectEyebrow}</p>
              <h2>{copy.projectTitle}</h2>
              <p className="section-intro">
                {copy.projectIntro}
              </p>
            </div>

            <article className="experience-module experience-module--project card-surface">
              <div className="card-header">
                <p className="micro-label">{copy.projectMicroLabel}</p>
                <span className="pill">{copy.projectPill}</span>
              </div>
              <div className="project-experience-grid">
                {projectExperience.map((item) => (
                  <article key={item.title} className="project-experience-tile">
                    <span className="timeline-period">{getLocalizedValue(item, 'period', language)}</span>
                    <h3>{getLocalizedValue(item, 'title', language)}</h3>
                    <p>{getLocalizedValue(item, 'description', language)}</p>
                    <span className="experience-inline-tag">{getLocalizedValue(item, 'stack', language)}</span>
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
              aria-label={copy.modalCloseLabel}
              onClick={() => setSelectedResearchExperience(null)}
            >
              x
            </button>
            <div className="research-modal-header">
              <p className="eyebrow">{copy.modalEyebrow}</p>
              <h2 id="research-modal-title">
                {getLocalizedValue(selectedResearchExperience, 'title', language)}
              </h2>
              <div className="research-modal-meta">
                  <span>{copy.timeLabel ?? 'Time'}: {getLocalizedValue(selectedResearchExperience, 'period', language)}</span>
                {selectedResearchExperience.supervisorUrl ? (
                  <a
                    href={selectedResearchExperience.supervisorUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {copy.supervisorLabel}: {selectedResearchExperience.supervisor}
                  </a>
                ) : (
                  <span>{copy.supervisorLabel}: {selectedResearchExperience.supervisor}</span>
                )}
              </div>
            </div>

            <div className="research-modal-body">
              {getLocalizedDetails(selectedResearchExperience.details, language).map((detail) => (
                <section key={detail.label} className="research-modal-detail">
                  <h3>{detail.label}</h3>
                  <p>{detail.text}</p>
                </section>
              ))}
              <section className="research-modal-detail research-modal-publication">
                <h3>{copy.publicationStatusTitle}</h3>
                <p>{getLocalizedValue(selectedResearchExperience, 'publicationStatus', language)}</p>
              </section>
              {selectedResearchExperience.repositoryUrl ? (
                <a
                  className="research-repository-button"
                  href={selectedResearchExperience.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={copy.repositoryLabel ?? 'Open the research repository on GitHub'}
                >
                  <svg viewBox="0 0 98 98" aria-hidden="true">
                    <path fill="currentColor" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
                  </svg>
                </a>
              ) : null}
            </div>
          </article>
        </div>
      ) : null}
    </div>
  )
}

export default ExperiencePage
