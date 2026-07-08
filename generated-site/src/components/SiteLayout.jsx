import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { navigationLinks } from '../content/siteContent'

const navSparkles = Array.from({ length: 6 }, (_, index) => index + 1)

function NavSparkles() {
  return navSparkles.map((sparkle) => (
    <span
      key={sparkle}
      className={`nav-sparkle nav-sparkle-${sparkle}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 784.11 815.53" focusable="false">
        <path d="M392.05 0C371.15 210.08 207.99 378.41 0 407.78c207.96 29.37 371.12 197.68 392.05 407.74 20.93-210.06 184.09-378.37 392.05-407.74C576.12 378.4 412.94 210.09 392.05 0Z" />
      </svg>
    </span>
  ))
}

function SiteLayout({ language, onLanguageChange }) {
  const location = useLocation()
  const showTopbar = location.pathname !== '/' && location.pathname !== '/ready'
  const isContactRoute = location.pathname === '/contact'

  return (
    <div className="site-shell">
      {showTopbar ? (
        <header className="site-topbar topbar">
          <span className="site-topbar-metal" aria-hidden="true" />
          <span className="site-topbar-sheen" aria-hidden="true" />
          <span className="site-topbar-edge site-topbar-edge--left" aria-hidden="true" />
          <span className="site-topbar-edge site-topbar-edge--right" aria-hidden="true" />

          <div className="language-switcher" aria-label="Language switcher">
            <button
              type="button"
              className={`language-button${language === 'en' ? ' is-active' : ''}`}
              aria-pressed={language === 'en'}
              disabled={!isContactRoute}
              onClick={() => {
                if (isContactRoute) {
                  onLanguageChange('en')
                }
              }}
            >
              EN
            </button>
            <button
              type="button"
              className={`language-button${language === 'zh' ? ' is-active' : ''}`}
              aria-pressed={language === 'zh'}
              disabled={!isContactRoute}
              onClick={() => {
                if (isContactRoute) {
                  onLanguageChange('zh')
                }
              }}
            >
              ZH
            </button>
          </div>

          <nav className="nav-links" aria-label="Primary">
            {navigationLinks.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                <span className="nav-link-label">{item.label}</span>
                <NavSparkles />
              </NavLink>
            ))}
          </nav>

          <Link className="contact-button" to="/contact">
            Contact
          </Link>
        </header>
      ) : null}

      <main className="page-main">
        <Outlet />
      </main>
    </div>
  )
}

export default SiteLayout
