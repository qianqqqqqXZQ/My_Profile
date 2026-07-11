import { useEffect, useId, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'zh', label: 'Chinese', shortLabel: 'CN' },
]

function Star({ cx, cy, r, fill }) {
  const outerRadius = r
  const innerRadius = r * 0.38
  const points = []

  for (let index = 0; index < 10; index += 1) {
    const angle = -Math.PI / 2 + (index * Math.PI) / 5
    const radius = index % 2 === 0 ? outerRadius : innerRadius
    points.push(`${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`)
  }

  return <polygon points={points.join(' ')} fill={fill} />
}

function UsFlagIcon() {
  const clipPathId = useId()

  return (
    <svg viewBox="0 0 64 44" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clipPathId}>
          <rect x="0" y="0" width="64" height="44" rx="6" ry="6" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipPathId})`}>
        <rect width="64" height="44" fill="#b22234" />
        {[1, 3, 5, 7, 9, 11].map((row) => (
          <rect key={row} y={row * (44 / 13)} width="64" height={44 / 13} fill="#ffffff" />
        ))}
        <rect width="28" height="23.7" fill="#3c3b6e" />
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 6 }).map((__, column) => (
            <circle
              key={`a-${row}-${column}`}
              cx={2.6 + column * 4.15}
              cy={2.5 + row * 4.55}
              r="0.72"
              fill="#ffffff"
            />
          )),
        )}
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 5 }).map((__, column) => (
            <circle
              key={`b-${row}-${column}`}
              cx={4.7 + column * 4.15}
              cy={4.75 + row * 4.55}
              r="0.72"
              fill="#ffffff"
            />
          )),
        )}
      </g>
      <rect x="0.5" y="0.5" width="63" height="43" rx="6" ry="6" fill="none" stroke="rgba(255,255,255,0.28)" />
    </svg>
  )
}

function ChinaFlagIcon() {
  return (
    <svg viewBox="0 0 64 44" aria-hidden="true" focusable="false">
      <rect width="64" height="44" rx="6" ry="6" fill="#de2910" />
      <Star cx={12} cy={10} r={5.2} fill="#ffde00" />
      <g transform="rotate(20 22 6)">
        <Star cx={22} cy={6} r={2.1} fill="#ffde00" />
      </g>
      <g transform="rotate(42 26 12)">
        <Star cx={26} cy={12} r={2.1} fill="#ffde00" />
      </g>
      <g transform="rotate(8 26 20)">
        <Star cx={26} cy={20} r={2.1} fill="#ffde00" />
      </g>
      <g transform="rotate(-18 21 26)">
        <Star cx={21} cy={26} r={2.1} fill="#ffde00" />
      </g>
      <rect x="0.5" y="0.5" width="63" height="43" rx="6" ry="6" fill="none" stroke="rgba(255,255,255,0.24)" />
    </svg>
  )
}

export function FlagIcon({ code }) {
  return code === 'zh' ? <ChinaFlagIcon /> : <UsFlagIcon />
}

function HomeLanguageSelector({ language, onLanguageChange }) {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsOpen(false)
    }
  }, [location.pathname])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    function handlePointerDown(event) {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  if (location.pathname !== '/') {
    return null
  }

  const currentLanguage = LANGUAGE_OPTIONS.find((option) => option.code === language) ?? LANGUAGE_OPTIONS[0]

  return (
    <div ref={containerRef} className={`home-language-selector${isOpen ? ' is-open' : ''}`}>
      <button
        type="button"
        className="home-language-toggle"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`Homepage language selector, current ${currentLanguage.label}`}
        title={`Language: ${currentLanguage.label}`}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="home-language-flag">
          <FlagIcon code={currentLanguage.code} />
        </span>
        <span className="home-language-label">{currentLanguage.shortLabel}</span>
        <span className="home-language-caret" aria-hidden="true">
          <svg viewBox="0 0 16 16" focusable="false">
            <path
              d="M4 6.25L8 10.25L12 6.25"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </span>
      </button>

      <div className="home-language-menu" role="menu" aria-label="Homepage language options">
        {LANGUAGE_OPTIONS.map((option) => {
          const isSelected = option.code === language

          return (
            <button
              key={option.code}
              type="button"
              role="menuitemradio"
              aria-checked={isSelected}
              className={`home-language-option${isSelected ? ' is-selected' : ''}`}
              onClick={() => {
                onLanguageChange(option.code)
                setIsOpen(false)
              }}
            >
              <span className="home-language-option-flag">
                <FlagIcon code={option.code} />
              </span>
              <span className="home-language-option-copy">
                {option.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default HomeLanguageSelector
