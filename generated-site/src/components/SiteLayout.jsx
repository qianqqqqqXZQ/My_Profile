import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { navigationLinks } from '../content/siteContent'

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
                {item.label}
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
