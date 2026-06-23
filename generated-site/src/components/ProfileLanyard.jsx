import { useMemo, useState } from 'react'
import profileImage from '../../../img/Ziqian.jpg'
import './ProfileLanyard.css'

const metrics = [
  { label: 'Focus', value: 'AI / Vision / Systems' },
  { label: 'Base', value: 'UNNC Computer Science' },
]

function ProfileLanyard() {
  const [pointer, setPointer] = useState({ x: 0, y: 0, active: false })

  const sceneStyle = useMemo(
    () =>
      ({
        '--pointer-x': `${pointer.x}px`,
        '--pointer-y': `${pointer.y}px`,
        '--tilt-x': `${pointer.active ? pointer.y * -0.045 : 0}deg`,
        '--tilt-y': `${pointer.active ? pointer.x * 0.05 : 0}deg`,
        '--swing-rotate': `${pointer.active ? pointer.x * 0.028 : 0}deg`,
        '--swing-shift': `${pointer.active ? Math.abs(pointer.y) * 0.22 : 0}px`,
      }),
    [pointer]
  )

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2

    setPointer({ x, y, active: true })
  }

  const handlePointerLeave = () => {
    setPointer({ x: 0, y: 0, active: false })
  }

  return (
    <div
      className={`lanyard-scene${pointer.active ? ' is-active' : ''}`}
      aria-label="Profile lanyard widget"
      style={sceneStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="lanyard-anchor" aria-hidden="true">
        <span className="lanyard-hook" />
      </div>

      <div className="lanyard-strap lanyard-strap-left" aria-hidden="true" />
      <div className="lanyard-strap lanyard-strap-right" aria-hidden="true" />

      <article className="lanyard-card">
        <div className="lanyard-card-rim" aria-hidden="true" />
        <div className="lanyard-photo-frame">
          <img
            src={profileImage}
            alt="Portrait of Ziqian Xiong"
            className="lanyard-photo"
          />
        </div>

        <div className="lanyard-copy">
          <p className="lanyard-role">Ziqian Xiong</p>
          <h3>Computer Science Student</h3>
          <p className="lanyard-summary">
            Research-driven builder focused on intelligent systems, visual
            computing, and polished digital presentation.
          </p>

          <div className="lanyard-metrics">
            {metrics.map((item) => (
              <div key={item.label} className="lanyard-metric">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}

export default ProfileLanyard
