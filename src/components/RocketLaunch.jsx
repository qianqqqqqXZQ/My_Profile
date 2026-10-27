import { useId } from 'react'

// The long, machined silhouette deliberately keeps the language of the site's metal surfaces.
export default function RocketLaunch() {
  const id = useId().replace(/:/g, '')

  return (
    <div className="rocket-launch" aria-hidden="true">
      <div className="rocket-launch-halo" />
      <div className="rocket-launch-exhaust">
        <svg viewBox="0 0 100 420" fill="none" focusable="false">
          <defs>
            <linearGradient id={`${id}-plume`} x1="50" y1="0" x2="50" y2="420" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e4e6ed" stopOpacity=".5" />
              <stop offset=".25" stopColor="#c7cbd5" stopOpacity=".22" />
              <stop offset="1" stopColor="#c7cbd5" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${id}-core`} x1="50" y1="0" x2="50" y2="290" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff" />
              <stop offset=".16" stopColor="#f1f2f5" stopOpacity=".95" />
              <stop offset=".62" stopColor="#d6dae4" stopOpacity=".3" />
              <stop offset="1" stopColor="#d6dae4" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M39 0H61C63 55 91 99 88 169C84 251 62 342 50 420C39 342 16 251 12 169C9 99 37 55 39 0Z" fill={`url(#${id}-plume)`} />
          <path d="M43 0H57L63 47L54 76L60 112L52 151L56 187L50 290L44 187L48 151L40 112L46 76L37 47Z" fill={`url(#${id}-core)`} />
          <path d="M48 0H52L54 66L50 153L46 66Z" fill="#fff" fillOpacity=".8" />
        </svg>
      </div>
      <svg className="rocket-launch-body" viewBox="0 0 100 600" fill="none" focusable="false">
        <defs>
          <linearGradient id={`${id}-metal`} x1="17" y1="0" x2="84" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#393c42" />
            <stop offset=".18" stopColor="#888c93" />
            <stop offset=".38" stopColor="#e5e5e3" />
            <stop offset=".47" stopColor="#f6f6f3" />
            <stop offset=".56" stopColor="#a6a9ad" />
            <stop offset=".82" stopColor="#575b64" />
            <stop offset="1" stopColor="#22252c" />
          </linearGradient>
          <linearGradient id={`${id}-nose`} x1="28" y1="17" x2="76" y2="148" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f2f2ee" />
            <stop offset=".5" stopColor="#a6a9b0" />
            <stop offset="1" stopColor="#353942" />
          </linearGradient>
          <linearGradient id={`${id}-fin`} x1="0" y1="480" x2="100" y2="560" gradientUnits="userSpaceOnUse">
            <stop stopColor="#bfc1c5" />
            <stop offset=".35" stopColor="#686d77" />
            <stop offset=".7" stopColor="#292d35" />
            <stop offset="1" stopColor="#91959e" />
          </linearGradient>
          <linearGradient id={`${id}-nozzle`} x1="32" y1="580" x2="70" y2="580" gradientUnits="userSpaceOnUse">
            <stop stopColor="#282b31" />
            <stop offset=".4" stopColor="#90949d" />
            <stop offset=".65" stopColor="#4a4e57" />
            <stop offset="1" stopColor="#181b21" />
          </linearGradient>
        </defs>
        <path d="M23 443L1 540V562L28 546L34 472ZM77 443L99 540V562L72 546L66 472Z" fill={`url(#${id}-fin)`} stroke="#d8dbe1" strokeOpacity=".25" />
        <path d="M50 2C40 20 19 67 19 116V514L29 561H71L81 514V116C81 67 60 20 50 2Z" fill={`url(#${id}-metal)`} stroke="#e4e5e6" strokeOpacity=".34" strokeWidth="1.4" />
        <path d="M50 2C40 20 19 67 19 116V137H81V116C81 67 60 20 50 2Z" fill={`url(#${id}-nose)`} />
        <path d="M49 13C39 45 31 85 31 122V507" stroke="#fff" strokeOpacity=".38" strokeWidth="1.5" />
        <path d="M20 138H80M20 151H80M20 298H80M20 310H80M20 449H80M24 533H76" stroke="#11151d" strokeOpacity=".64" strokeWidth="2" />
        <path d="M20 141H80M20 313H80M24 536H76" stroke="#fff" strokeOpacity=".28" />
        <path d="M59 170H66V239H59Z" fill="#171b23" fillOpacity=".8" />
        <path d="M61 175H63V230H61Z" fill="#d6d9e0" fillOpacity=".35" />
        <path d="M47 463H53L56 553H44Z" fill="#696e78" stroke="#d4d7dc" strokeOpacity=".3" />
        <path d="M34 562H66L70 596H30Z" fill={`url(#${id}-nozzle)`} />
        <path d="M31 596H69" stroke="#f4f5f9" strokeOpacity=".9" strokeWidth="3" />
        <path d="M37 567L34 590M43 567L42 590M57 567L58 590M63 567L66 590" stroke="#161921" strokeOpacity=".65" strokeWidth="2" />
      </svg>
    </div>
  )
}
