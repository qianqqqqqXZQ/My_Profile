import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl'
import { useEffect, useRef } from 'react'
import './CircularGallery.css'

const vertexShader = `
  attribute vec3 position;
  attribute vec2 uv;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  uniform sampler2D tMap;
  uniform vec2 uImageSize;
  uniform vec2 uPlaneSize;
  uniform float uRadius;
  varying vec2 vUv;

  float roundedBox(vec2 point, vec2 bounds, float radius) {
    vec2 distance = abs(point) - bounds + radius;
    return length(max(distance, 0.0)) + min(max(distance.x, distance.y), 0.0) - radius;
  }

  void main() {
    vec2 ratio = vec2(
      min((uPlaneSize.x / uPlaneSize.y) / (uImageSize.x / uImageSize.y), 1.0),
      min((uPlaneSize.y / uPlaneSize.x) / (uImageSize.y / uImageSize.x), 1.0)
    );
    vec2 crop = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
    float distance = roundedBox(vUv - 0.5, vec2(0.5 - uRadius), uRadius);
    float alpha = 1.0 - smoothstep(-0.003, 0.003, distance);
    vec4 image = texture2D(tMap, crop);
    gl_FragColor = vec4(image.rgb, image.a * alpha);
  }
`

function getViewport(camera, width, height) {
  const fov = (camera.fov * Math.PI) / 180
  const viewportHeight = 2 * Math.tan(fov / 2) * camera.position.z
  return { width: viewportHeight * (width / height), height: viewportHeight }
}

function CircularGallery({ images, bend = 1.8, scrollEase = 0.075, scrollSpeed = 1.8 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !images.length) return undefined

    const renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) })
    const gl = renderer.gl
    const camera = new Camera(gl)
    const scene = new Transform()
    const geometry = new Plane(gl, { widthSegments: 48, heightSegments: 24 })
    const scroll = { current: 0, target: 0 }
    const repeatedImages = [...images, ...images]
    const media = []
    let viewport = { width: 1, height: 1 }
    let itemWidth = 1
    let animationFrame
    let dragging = false
    let startX = 0
    let scrollStart = 0

    gl.clearColor(0, 0, 0, 0)
    camera.position.z = 20
    container.appendChild(gl.canvas)

    repeatedImages.forEach((imageUrl, index) => {
      const texture = new Texture(gl, { generateMipmaps: true })
      const program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        uniforms: {
          tMap: { value: texture },
          uImageSize: { value: [1, 1] },
          uPlaneSize: { value: [1, 1] },
          uRadius: { value: 0.055 },
        },
      })
      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.src = imageUrl
      image.onload = () => {
        texture.image = image
        program.uniforms.uImageSize.value = [image.naturalWidth, image.naturalHeight]
      }

      const plane = new Mesh(gl, { geometry, program })
      plane.setParent(scene)
      media.push({ plane, index, offset: 0 })
    })

    const resize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      if (!width || !height) return

      renderer.setSize(width, height)
      camera.perspective({ aspect: width / height })
      viewport = getViewport(camera, width, height)
      const planeHeight = viewport.height * 0.72
      const planeWidth = planeHeight * 0.9
      itemWidth = planeWidth + viewport.width * 0.045

      media.forEach(({ plane, index }) => {
        plane.scale.set(planeWidth, planeHeight, 1)
        plane.program.uniforms.uPlaneSize.value = [planeWidth, planeHeight]
        plane.position.x = index * itemWidth
      })
    }

    const update = () => {
      scroll.current += (scroll.target - scroll.current) * scrollEase
      const totalWidth = itemWidth * repeatedImages.length
      const halfWidth = viewport.width / 2

      media.forEach((entry) => {
        const { plane, index } = entry
        let x = index * itemWidth - scroll.current + entry.offset
        if (x < -halfWidth - itemWidth) entry.offset += totalWidth
        if (x > halfWidth + itemWidth) entry.offset -= totalWidth
        x = index * itemWidth - scroll.current + entry.offset
        const normalizedX = Math.min(Math.abs(x) / Math.max(halfWidth, 1), 1)
        plane.position.x = x
        plane.position.y = -normalizedX * normalizedX * bend
        plane.rotation.z = -Math.sign(x) * normalizedX * bend * 0.12
      })

      renderer.render({ scene, camera })
      animationFrame = window.requestAnimationFrame(update)
    }

    const onWheel = (event) => {
      event.preventDefault()
      scroll.target += event.deltaY * scrollSpeed * 0.008
    }
    const onPointerDown = (event) => {
      dragging = true
      startX = event.clientX
      scrollStart = scroll.target
      container.setPointerCapture?.(event.pointerId)
    }
    const onPointerMove = (event) => {
      if (dragging) scroll.target = scrollStart + (startX - event.clientX) * scrollSpeed * 0.018
    }
    const onPointerUp = () => { dragging = false }
    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') scroll.target += itemWidth
      if (event.key === 'ArrowLeft') scroll.target -= itemWidth
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    container.addEventListener('wheel', onWheel, { passive: false })
    container.addEventListener('pointerdown', onPointerDown)
    container.addEventListener('pointermove', onPointerMove)
    container.addEventListener('pointerup', onPointerUp)
    container.addEventListener('pointercancel', onPointerUp)
    container.addEventListener('keydown', onKeyDown)
    resize()
    update()

    return () => {
      window.cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      container.removeEventListener('wheel', onWheel)
      container.removeEventListener('pointerdown', onPointerDown)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerup', onPointerUp)
      container.removeEventListener('pointercancel', onPointerUp)
      container.removeEventListener('keydown', onKeyDown)
      gl.canvas.remove()
    }
  }, [bend, images, scrollEase, scrollSpeed])

  return (
    <div
      ref={containerRef}
      className="circular-gallery"
      tabIndex="0"
      role="region"
      aria-label="Daily photo collection. Drag, scroll, or use arrow keys to browse photos."
    />
  )
}

export default CircularGallery
