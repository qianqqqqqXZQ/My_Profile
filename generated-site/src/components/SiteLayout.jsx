import { Link, NavLink, Outlet } from 'react-router-dom'
import { navigationLinks } from '../content/siteContent'

function SiteLayout() {
  return (
    <div className="site-shell">
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

      <main className="page-main">
        <Outlet />
      </main>
    </div>
  )
}

export default SiteLayout
