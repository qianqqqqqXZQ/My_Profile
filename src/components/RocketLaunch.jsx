import { useId } from 'react'

export default function RocketLaunch() {
  const id = useId().replace(/:/g, '')

  return (
    <div className="rocket-launch" aria-hidden="true">
      <div className="rocket-launch-halo" />
      <div className="rocket-launch-exhaust">
        <svg viewBox="0 0 120 420" fill="none" focusable="false">
          <defs>
            <linearGradient id={`${id}-plume`} x1="60" y1="0" x2="60" y2="420" gradientUnits="userSpaceOnUse">
              <stop stopColor="#b8dcff" stopOpacity=".8" />
              <stop offset=".16" stopColor="#fff5dc" />
              <stop offset=".42" stopColor="#ffc17a" stopOpacity=".85" />
              <stop offset=".72" stopColor="#e68b4b" stopOpacity=".4" />
              <stop offset="1" stopColor="#cf8253" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${id}-core`} x1="60" y1="0" x2="60" y2="330" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e7f6ff" />
              <stop offset=".25" stopColor="#fffef4" />
              <stop offset=".65" stopColor="#ffedc5" stopOpacity=".85" />
              <stop offset="1" stopColor="#ffe7b4" stopOpacity="0" />
            </linearGradient>
            <filter id={`${id}-flame-soft`} x="-50%" y="-10%" width="200%" height="130%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>
          <g className="rocket-launch-flame">
            <path d="M44 0H76C76 59 82 112 90 175C98 244 105 330 116 420H3C14 326 25 246 32 175C39 112 44 59 44 0Z" fill={`url(#${id}-plume)`} filter={`url(#${id}-flame-soft)`} />
            <path d="M48 0H72C73 43 69 76 70 117C71 195 64 269 60 331C54 266 48 200 50 120C51 76 47 42 48 0Z" fill={`url(#${id}-core)`} filter={`url(#${id}-flame-soft)`} />
          </g>
        </svg>
      </div>
      <svg className="rocket-launch-body" viewBox="0 0 100 600" fill="none" focusable="false">
        <defs>
          <linearGradient id={`${id}-paint`} x1="23" y1="0" x2="78" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#727b83" />
            <stop offset=".12" stopColor="#c1c8cb" />
            <stop offset=".32" stopColor="#fbfcf8" />
            <stop offset=".52" stopColor="#eceee9" />
            <stop offset=".76" stopColor="#b6bdc0" />
            <stop offset="1" stopColor="#606b75" />
          </linearGradient>
          <linearGradient id={`${id}-fairing`} x1="19" y1="65" x2="81" y2="81" gradientUnits="userSpaceOnUse">
            <stop stopColor="#879199" />
            <stop offset=".3" stopColor="#f8faf6" />
            <stop offset=".5" stopColor="#f0f2ed" />
            <stop offset="1" stopColor="#697782" />
          </linearGradient>
          <linearGradient id={`${id}-carbon`} x1="27" y1="0" x2="74" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#131a22" />
            <stop offset=".32" stopColor="#424c56" />
            <stop offset=".6" stopColor="#242d37" />
            <stop offset="1" stopColor="#0c1119" />
          </linearGradient>
          <linearGradient id={`${id}-nozzle`} x1="32" y1="0" x2="69" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#333d46" />
            <stop offset=".35" stopColor="#a2a9ac" />
            <stop offset=".62" stopColor="#535d66" />
            <stop offset="1" stopColor="#1c2530" />
          </linearGradient>
          <linearGradient id={`${id}-heat`} x1="50" y1="565" x2="50" y2="598" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e1a675" stopOpacity="0" />
            <stop offset="1" stopColor="#ffd4a5" stopOpacity=".8" />
          </linearGradient>
        </defs>
        <path d="M42 15Q50 1 58 15C68 30 76 57 76 86V128L72 151H28L24 128V86C24 57 32 30 42 15Z" fill={`url(#${id}-fairing)`} />
        <path d="M28 151H72V550L68 568H32L28 550Z" fill={`url(#${id}-paint)`} />
        <path d="M28 222H72V232H28Z" fill={`url(#${id}-carbon)`} />
        <path d="M28 531H72V552L68 568H32L28 552Z" fill={`url(#${id}-carbon)`} />
        <path d="M50 8V147" stroke="#53616a" strokeOpacity=".38" strokeWidth=".8" />
        <path d="M34 151V218M34 280V526" stroke="#fff" strokeOpacity=".55" />
        <path d="M20 119H80M28 159H72M28 215H72M28 281H72M28 377H72M28 472H72M28 525H72" stroke="#46535b" strokeOpacity=".38" />
        <path d="M28 162H72M28 284H72M28 380H72M28 475H72" stroke="#fff" strokeOpacity=".55" />
        <path d="M66 289V516" stroke="#606d73" strokeWidth="2" />
        <path d="M65 300H69M65 361H69M65 423H69M65 500H69" stroke="#dae0df" strokeWidth="2" />
        <path d="M39 171V207M61 171V207M42 194H58" stroke="#55636c" strokeOpacity=".45" strokeWidth="1.2" />
        <path d="M39 568H61C60 577 66 587 68 597H32C34 587 40 577 39 568Z" fill={`url(#${id}-nozzle)`} />
        <path d="M39 568H61C60 577 66 587 68 597H32C34 587 40 577 39 568Z" fill={`url(#${id}-heat)`} />
        <path d="M41 572L36 593M46 572L44 593M54 572L56 593M59 572L64 593" stroke="#17212b" strokeOpacity=".7" />
        <ellipse cx="50" cy="597" rx="18" ry="2.5" fill="#d3eaff" />
        <ellipse cx="50" cy="597" rx="12" ry="1.5" fill="#fffef6" />
      </svg>
    </div>
  )
}
