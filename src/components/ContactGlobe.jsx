import { useEffect, useRef, useState } from 'react'

import { createContactGlobeScene } from './contactGlobeScene'

function ContactGlobe({ assets, paused = false }) {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const initialPausedRef = useRef(paused)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return undefined
    }

    // Build the Three.js scene once; later pause changes are pushed through the scene handle.
    const scene = createContactGlobeScene({
      assets,
      container,
      paused: initialPausedRef.current,
      onReady: () => setIsReady(true),
    })
    sceneRef.current = scene

    return () => {
      scene.destroy()
      sceneRef.current = null
    }
  }, [assets])

  useEffect(() => {
    sceneRef.current?.setPaused(paused)
  }, [paused])

  return (
    <div
      ref={containerRef}
      className={`contact-globe-canvas${isReady ? ' is-ready' : ''}`}
      aria-hidden="true"
    />
  )
}

export default ContactGlobe
