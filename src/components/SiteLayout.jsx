import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { FlagIcon } from './HomeLanguageSelector'
import { navigationLinks } from '../content/siteContent'
import { preloadContactGlobeAssets } from './contactGlobeAssets'

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
  const canSwitchLanguage = ['/profile', '/contact', '/experience'].includes(location.pathname)
  const isChinese = language === 'zh'

  return (
    <div className="site-shell">
      {showTopbar ? (
        <header className="site-topbar topbar">
          <span className="site-topbar-metal" aria-hidden="true" />
          <span className="site-topbar-sheen" aria-hidden="true" />
          <span className="site-topbar-edge site-topbar-edge--left" aria-hidden="true" />
          <span className="site-topbar-edge site-topbar-edge--right" aria-hidden="true" />

          <div className="topbar-leading-group">
            <NavLink
              to="/"
              className="back-to-start-button"
              aria-label={isChinese ? '返回首页' : 'Back to start'}
            >
              <span className="back-to-start-button__text">
                {isChinese ? '返回首页' : 'Back to start'}
              </span>
            </NavLink>

            <div className="language-switcher" aria-label="Language switcher">
              <button
                type="button"
                className={`language-button${language === 'en' ? ' is-active' : ''}`}
                aria-pressed={language === 'en'}
                aria-label="Switch to English"
                title="English"
                disabled={!canSwitchLanguage}
                onClick={() => {
                  if (canSwitchLanguage) {
                    onLanguageChange('en')
                  }
                }}
              >
                <span className="language-button-flag">
                  <FlagIcon code="en" />
                </span>
              </button>
              <button
                type="button"
                className={`language-button${language === 'zh' ? ' is-active' : ''}`}
                aria-pressed={language === 'zh'}
                aria-label="Switch to Chinese"
                title="Chinese"
                disabled={!canSwitchLanguage}
                onClick={() => {
                  if (canSwitchLanguage) {
                    onLanguageChange('zh')
                  }
                }}
              >
                <span className="language-button-flag">
                  <FlagIcon code="zh" />
                </span>
              </button>
            </div>
          </div>

          <nav className="nav-links" aria-label="Primary">
            {navigationLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                onPointerEnter={item.to === '/contact' ? preloadContactGlobeAssets : undefined}
                onFocus={item.to === '/contact' ? preloadContactGlobeAssets : undefined}
              >
                <span className="nav-link-label">{isChinese ? item.labelZh : item.label}</span>
                <NavSparkles />
              </NavLink>
            ))}
          </nav>

          <a
            className="github-code-button github-code-button--compact"
            href="https://github.com/qianqqqqqXZQ/My_Profile"
            target="_blank"
            rel="noreferrer"
            aria-label="View the code on GitHub"
          >
            <svg
              className="github-code-button__icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z" />
            </svg>
          </a>
        </header>
      ) : null}

      <main className="page-main">
        <Outlet />
      </main>
    </div>
  )
}

export default SiteLayout
