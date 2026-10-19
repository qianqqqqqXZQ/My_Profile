import { useEffect, useRef } from 'react'
import personImage from '../assets/home-hero/person-source.jpg'
import armorImage from '../assets/home-hero/armor-source.jpg'
import { createLiquidArmor } from './liquidArmorScene'
import './PhotoLens.css'

export default function PhotoLens({ paused = false }) {
  const cardRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (paused || !cardRef.current || !canvasRef.current) return undefined
    return createLiquidArmor(cardRef.current, canvasRef.current, armorImage)
  }, [paused])

  return (
    <div className="photo-lens-frame">
      <div className="photo-lens-card" ref={cardRef}>
        <img className="photo-lens-image" src={personImage} alt="Portrait" draggable={false} />
        <canvas className="photo-lens-fluid" ref={canvasRef} aria-hidden="true" />
      </div>
    </div>
  )
}
