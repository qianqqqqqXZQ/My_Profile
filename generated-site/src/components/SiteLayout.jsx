import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { navigationLinks } from '../content/siteContent'

function SiteLayout() {
  const location = useLocation()
  const showTopbar = location.pathname !== '/'

  return (
    <div className="site-shell">
      {showTopbar ? (
        <header className="site-topbar topbar">
          <Link className="brand" to="/">
            <span className="brand-mark">N</span>
            <span className="brand-copy">
              <strong>UNNC / CS</strong>
              <span>Personal Portfolio Site</span>
            </span>
          </Link>

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
