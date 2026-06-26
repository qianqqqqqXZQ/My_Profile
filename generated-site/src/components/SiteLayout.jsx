import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { navigationLinks } from '../content/siteContent'

function SiteLayout() {
  const location = useLocation()
  const showTopbar = location.pathname !== '/'

  return (
    <div className="site-shell">
      {showTopbar ? (
        <header className="site-topbar topbar">
          <div className="language-switcher" aria-label="Language switcher">
            <button type="button" className="language-button is-active" aria-pressed="true">
              EN
            </button>
            <button type="button" className="language-button" aria-pressed="false">
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
