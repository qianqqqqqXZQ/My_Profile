function PageBanner({ eyebrow, title, summary, action, metaLabel, metaTitle, metaText, items = [] }) {
  return (
    <section className="page-hero">
      <div className="section-shell page-hero-grid">
        <div className="page-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-lead">{summary}</p>
          {action ? <div className="page-hero-actions">{action}</div> : null}
        </div>

        <aside className="page-hero-card card-surface">
          <p className="micro-label">{metaLabel}</p>
          <h3>{metaTitle}</h3>
          <p className="page-hero-text">{metaText}</p>
          <div className="page-hero-list">
            {items.map((item) => (
              <article key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}

export default PageBanner
