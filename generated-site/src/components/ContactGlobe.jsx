import { useEffect, useRef } from 'react'

import { createContactGlobeScene } from './contactGlobeScene'

function ContactGlobe({ paused = false }) {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const initialPausedRef = useRef(paused)

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return undefined
    }

    const scene = createContactGlobeScene({ container, paused: initialPausedRef.current })
    sceneRef.current = scene

    return () => {
      scene.destroy()
      sceneRef.current = null
    }
  }, [])

  useEffect(() => {
    sceneRef.current?.setPaused(paused)
  }, [paused])

  return <div ref={containerRef} className="contact-globe-canvas" aria-hidden="true" />
}

export default ContactGlobe
