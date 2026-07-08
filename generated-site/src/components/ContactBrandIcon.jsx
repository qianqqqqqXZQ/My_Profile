const brandPalette = {
  gmail: {
    primary: '#ea4335',
    secondary: '#c5221f',
    tertiary: '#fbbc04',
  },
  outlook: {
    primary: '#0a66d9',
    secondary: '#1f8bff',
    tertiary: '#08489a',
  },
  github: {
    primary: '#d4af37',
    secondary: '#f2cf63',
    tertiary: '#9a7420',
  },
  wechat: {
    primary: '#2ccf62',
    secondary: '#7aea87',
    tertiary: '#15803d',
  },
}

function GmailIcon() {
  return (
    <>
      <g className="contact-brand-icon__mono-layer">
        <path
          className="contact-brand-icon__mono-stroke"
          d="M6.8 9.6 16 16.6l9.2-7"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.9"
        />
        <path
          className="contact-brand-icon__mono-stroke"
          d="M6.8 10v12.4c0 1.2.9 2.1 2.1 2.1h14.2c1.2 0 2.1-.9 2.1-2.1V10"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.9"
        />
      </g>
      <g className="contact-brand-icon__color-layer">
        <path d="M7.2 23.3V10.2l3.8 2.9v10.2H8.8c-.9 0-1.6-.7-1.6-1.6Z" fill="var(--brand-primary)" />
        <path d="M20.9 23.3V13.1l3.9-2.9v13.1c0 .9-.7 1.6-1.6 1.6h-2.3Z" fill="var(--brand-primary)" />
        <path d="M11 23.3v-10l5 3.8 5-3.8v10H11Z" fill="var(--brand-secondary)" />
        <path d="M7.2 10.2c0-.9.7-1.6 1.6-1.6h.7l6.5 5.1 6.5-5.1h.7c.9 0 1.6.7 1.6 1.6l-8.8 6.7-8.8-6.7Z" fill="var(--brand-tertiary)" />
      </g>
    </>
  )
}

function OutlookIcon() {
  return (
    <>
      <g className="contact-brand-icon__mono-layer">
        <path
          className="contact-brand-icon__mono-fill"
          d="M14.2 9h8.2c1.3 0 2.4 1.1 2.4 2.4v9.2c0 1.3-1.1 2.4-2.4 2.4h-8.2z"
        />
        <path
          className="contact-brand-icon__mono-stroke"
          d="M14.2 9h8.2c1.3 0 2.4 1.1 2.4 2.4v9.2c0 1.3-1.1 2.4-2.4 2.4h-8.2z"
          fill="none"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
        <path
          className="contact-brand-icon__mono-fill contact-brand-icon__mono-fill--deep"
          d="M7.2 11.1 14.2 9.8v12.4l-7 1.3z"
        />
        <path
          className="contact-brand-icon__mono-stroke"
          d="M7.2 11.1 14.2 9.8v12.4l-7 1.3z"
          fill="none"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          className="contact-brand-icon__mono-stroke"
          d="M10.2 14.5c.7-.7 1.4-1 2.4-1s1.8.3 2.4 1c.6.7.9 1.6.9 2.7s-.3 2-.9 2.7c-.6.7-1.4 1-2.4 1s-1.8-.3-2.4-1c-.6-.7-.9-1.6-.9-2.7s.3-2 .9-2.7Z"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.3"
        />
      </g>
      <g className="contact-brand-icon__color-layer">
        <path d="M14.2 9h7.8c1.5 0 2.8 1.2 2.8 2.8v.8l-5.4 3.9-5.2-3.5V9Z" fill="var(--brand-secondary)" />
        <path d="M14.2 13l5.2 3.5 5.4-3.9v7.6c0 1.5-1.2 2.8-2.8 2.8h-7.8V13Z" fill="var(--brand-tertiary)" />
        <path d="M7.2 11.1 14.2 9.8v12.4l-7 1.3z" fill="var(--brand-primary)" />
        <path
          d="M10.4 14.7c.6-.6 1.3-.9 2.2-.9s1.6.3 2.2.9c.6.6.8 1.4.8 2.5s-.3 1.8-.8 2.5c-.6.6-1.3.9-2.2.9s-1.6-.3-2.2-.9c-.6-.6-.8-1.4-.8-2.5s.3-1.8.8-2.5Zm2.2.6c-.5 0-.9.2-1.2.5-.3.4-.4.8-.4 1.5 0 .6.1 1.1.4 1.5.3.4.7.5 1.2.5s.9-.2 1.2-.5c.3-.4.4-.8.4-1.5 0-.6-.1-1.1-.4-1.5-.3-.4-.7-.5-1.2-.5Z"
          fill="#ffffff"
        />
      </g>
    </>
  )
}

function GitHubIcon() {
  return (
    <>
      <g className="contact-brand-icon__mono-layer">
        <path
          className="contact-brand-icon__mono-fill"
          d="M16 7.2c-4.9 0-8.8 3.8-8.8 8.6 0 3.8 2.4 7.1 5.8 8.3.5.1.7-.2.7-.5v-2.1c-2.4.5-2.9-.6-3.1-1.1-.1-.3-.5-1-.9-1.3-.3-.2-.7-.6 0-.6.6 0 1.1.6 1.3.8.7 1.2 1.9.9 2.4.7.1-.5.3-.9.5-1.1-2.1-.2-4.2-1.1-4.2-4.5 0-1 .3-1.8.9-2.4-.1-.2-.4-1.1.1-2.3 0 0 .8-.3 2.5 1a8.8 8.8 0 0 1 4.6 0c1.8-1.2 2.5-1 2.5-1 .5 1.2.2 2.1.1 2.3.6.6.9 1.5.9 2.4 0 3.4-2.1 4.2-4.2 4.5.3.3.6.8.6 1.5v2.6c0 .3.2.6.7.5 3.4-1.2 5.8-4.4 5.8-8.3 0-4.8-4-8.6-8.8-8.6Z"
        />
        <path
          className="contact-brand-icon__mono-stroke"
          d="M16 7.2c-4.9 0-8.8 3.8-8.8 8.6 0 3.8 2.4 7.1 5.8 8.3.5.1.7-.2.7-.5v-2.1c-2.4.5-2.9-.6-3.1-1.1-.1-.3-.5-1-.9-1.3-.3-.2-.7-.6 0-.6.6 0 1.1.6 1.3.8.7 1.2 1.9.9 2.4.7.1-.5.3-.9.5-1.1-2.1-.2-4.2-1.1-4.2-4.5 0-1 .3-1.8.9-2.4-.1-.2-.4-1.1.1-2.3 0 0 .8-.3 2.5 1a8.8 8.8 0 0 1 4.6 0c1.8-1.2 2.5-1 2.5-1 .5 1.2.2 2.1.1 2.3.6.6.9 1.5.9 2.4 0 3.4-2.1 4.2-4.2 4.5.3.3.6.8.6 1.5v2.6c0 .3.2.6.7.5 3.4-1.2 5.8-4.4 5.8-8.3 0-4.8-4-8.6-8.8-8.6Z"
          fill="none"
          strokeLinejoin="round"
          strokeWidth="1.1"
        />
      </g>
      <g className="contact-brand-icon__color-layer">
        <circle cx="16" cy="16" r="9.1" fill="var(--brand-primary)" />
        <path
          d="M16 7.2c-4.9 0-8.8 3.8-8.8 8.6 0 3.8 2.4 7.1 5.8 8.3.5.1.7-.2.7-.5v-2.1c-2.4.5-2.9-.6-3.1-1.1-.1-.3-.5-1-.9-1.3-.3-.2-.7-.6 0-.6.6 0 1.1.6 1.3.8.7 1.2 1.9.9 2.4.7.1-.5.3-.9.5-1.1-2.1-.2-4.2-1.1-4.2-4.5 0-1 .3-1.8.9-2.4-.1-.2-.4-1.1.1-2.3 0 0 .8-.3 2.5 1a8.8 8.8 0 0 1 4.6 0c1.8-1.2 2.5-1 2.5-1 .5 1.2.2 2.1.1 2.3.6.6.9 1.5.9 2.4 0 3.4-2.1 4.2-4.2 4.5.3.3.6.8.6 1.5v2.6c0 .3.2.6.7.5 3.4-1.2 5.8-4.4 5.8-8.3 0-4.8-4-8.6-8.8-8.6Z"
          fill="#111111"
        />
        <path
          d="M12 12.4c1-.8 2.4-1.3 4-1.3s3 .4 4 1.3"
          fill="none"
          stroke="var(--brand-secondary)"
          strokeLinecap="round"
          strokeWidth="1"
        />
      </g>
    </>
  )
}

function WechatIcon() {
  return (
    <>
      <g className="contact-brand-icon__mono-layer">
        <path
          className="contact-brand-icon__mono-fill"
          d="M13.7 10c-3.8 0-6.9 2.5-6.9 5.7 0 1.7.9 3.2 2.3 4.2L8.3 23l3.2-1.6c.7.2 1.4.3 2.2.3 3.8 0 6.9-2.5 6.9-5.7S17.5 10 13.7 10Z"
        />
        <path
          className="contact-brand-icon__mono-fill contact-brand-icon__mono-fill--deep"
          d="M18.6 7.1c3.6 0 6.5 2.2 6.5 5.2 0 1.4-.7 2.8-2 3.7l.8 2.5-2.7-1.4c-.6.1-1.3.2-1.9.2h-.4c.2-.5.3-1 .3-1.5 0-2.5-1.8-4.7-4.3-5.5.8-1.9 3-3.2 5.7-3.2Z"
        />
        <circle className="contact-brand-icon__mono-dot" cx="11.9" cy="15.8" r=".95" />
        <circle className="contact-brand-icon__mono-dot" cx="15.7" cy="15.8" r=".95" />
        <circle className="contact-brand-icon__mono-dot" cx="17.7" cy="11.8" r=".92" />
        <circle className="contact-brand-icon__mono-dot" cx="21.3" cy="11.8" r=".92" />
      </g>
      <g className="contact-brand-icon__color-layer">
        <path d="M13.7 10c-3.8 0-6.9 2.5-6.9 5.7 0 1.7.9 3.2 2.3 4.2L8.3 23l3.2-1.6c.7.2 1.4.3 2.2.3 3.8 0 6.9-2.5 6.9-5.7S17.5 10 13.7 10Z" fill="var(--brand-primary)" />
        <path d="M18.6 7.1c3.6 0 6.5 2.2 6.5 5.2 0 1.4-.7 2.8-2 3.7l.8 2.5-2.7-1.4c-.6.1-1.3.2-1.9.2h-.4c.2-.5.3-1 .3-1.5 0-2.5-1.8-4.7-4.3-5.5.8-1.9 3-3.2 5.7-3.2Z" fill="var(--brand-secondary)" />
        <circle cx="11.9" cy="15.8" r=".95" fill="#ffffff" />
        <circle cx="15.7" cy="15.8" r=".95" fill="#ffffff" />
        <circle cx="17.7" cy="11.8" r=".92" fill="#ffffff" />
        <circle cx="21.3" cy="11.8" r=".92" fill="#ffffff" />
      </g>
    </>
  )
}

const iconMap = {
  gmail: GmailIcon,
  outlook: OutlookIcon,
  github: GitHubIcon,
  wechat: WechatIcon,
}

function ContactBrandIcon({ name }) {
  const Icon = iconMap[name]
  const palette = brandPalette[name] ?? brandPalette.gmail

  return (
    <svg
      className="contact-brand-icon"
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      style={{
        '--brand-primary': palette.primary,
        '--brand-secondary': palette.secondary,
        '--brand-tertiary': palette.tertiary,
      }}
    >
      <defs>
        <linearGradient id={`contact-brand-mono-${name}`} x1="6" y1="5" x2="24" y2="27">
          <stop offset="0%" stopColor="rgba(208,213,220,0.96)" />
          <stop offset="44%" stopColor="rgba(142,148,156,0.92)" />
          <stop offset="100%" stopColor="rgba(72,78,87,0.94)" />
        </linearGradient>
        <linearGradient id={`contact-brand-mono-deep-${name}`} x1="8" y1="8" x2="24" y2="24">
          <stop offset="0%" stopColor="rgba(132,138,147,0.94)" />
          <stop offset="100%" stopColor="rgba(52,58,67,0.96)" />
        </linearGradient>
      </defs>
      <g
        style={{
          '--contact-brand-mono': `url(#contact-brand-mono-${name})`,
          '--contact-brand-mono-deep': `url(#contact-brand-mono-deep-${name})`,
        }}
      >
        <Icon />
      </g>
    </svg>
  )
}

export default ContactBrandIcon
