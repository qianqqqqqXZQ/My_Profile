import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import gsap from 'gsap'

const clamp = (value) => Math.max(0, Math.min(1, value))
const smooth = (start, end, value) => {
  const t = clamp((value - start) / (end - start))
  return t * t * (3 - 2 * t)
}

function randomSequence(seed) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }
}

let smokeTextures

// Bake turbulent density and directional lighting once, rather than filtering
// full-screen DOM layers or recalculating pixel noise on every animation frame.
function createTexture(seed) {
  const random = randomSequence(seed)
  const size = 192
  const texture = document.createElement('canvas')
  texture.width = texture.height = size
  const context = texture.getContext('2d')
  const pixels = context.createImageData(size, size)
  const octaves = [5, 9, 17, 33].map((length) => ({
    length,
    values: Float32Array.from({ length: length * length }, random),
  }))

  const noise = (x, y) => octaves.reduce((sum, grid, index) => {
    const gx = x * (grid.length - 1)
    const gy = y * (grid.length - 1)
    const ix = Math.floor(gx)
    const iy = Math.floor(gy)
    const fx = smooth(0, 1, gx - ix)
    const fy = smooth(0, 1, gy - iy)
    const a = grid.values[iy * grid.length + ix]
    const b = grid.values[iy * grid.length + ix + 1]
    const c = grid.values[(iy + 1) * grid.length + ix]
    const d = grid.values[(iy + 1) * grid.length + ix + 1]
    return sum + ((a + (b - a) * fx) * (1 - fy) + (c + (d - c) * fx) * fy) * (0.54 / 2 ** index)
  }, 0)

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const nx = (x + 0.5) / size
      const ny = (y + 0.5) / size
      const n = noise(nx, ny)
      const distance = Math.hypot((nx - 0.5) * 2, (ny - 0.5) * 2)
      const density = clamp((1 - distance + (n - 0.45) * 0.85) * 2.5)
      const alpha = density * smooth(1, 0.64, distance) * (0.65 + n * 0.35)
      const light = 119 + n * 133 + (1 - ny) * 19
      const offset = (y * size + x) * 4
      pixels.data[offset] = light - 3
      pixels.data[offset + 1] = light
      pixels.data[offset + 2] = light + 2
      pixels.data[offset + 3] = alpha * 255
    }
  }
  context.putImageData(pixels, 0, 0)
  return texture
}

function startSmoke(canvas, origin) {
  const context = canvas.getContext('2d')
  const motion = { time: 0, y: 0, reveal: 0 }
  if (!context) return { motion, stop() {} }
  smokeTextures ??= [137, 719, 2027].map(createTexture)

  const random = randomSequence(4321)
  const mobile = window.innerWidth <= 720
  const view = { width: window.innerWidth, height: window.innerHeight, dpr: 1 }
  const originX = origin.x / view.width
  const originY = origin.y / view.height
  const particles = []
  const columns = mobile ? 4 : 6
  const rows = mobile ? 5 : 4
  const clouds = Array.from({ length: columns * rows }, (_, index) => ({
    column: index % columns,
    row: Math.floor(index / columns),
    offset: random(),
    rotation: (random() - 0.5) * 1.4,
    texture: smokeTextures[index % smokeTextures.length],
  }))
  let emitted = 0
  let drift = 0

  const resize = () => {
    view.width = window.innerWidth
    view.height = window.innerHeight
    view.dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.25)
    canvas.width = Math.round(view.width * view.dpr)
    canvas.height = Math.round(view.height * view.dpr)
    context.setTransform(view.dpr, 0, 0, view.dpr, 0, 0)
  }
  resize()
  window.addEventListener('resize', resize)

  const paint = (texture, x, y, radius, rotation, alpha, stretch = 1) => {
    if (alpha < 0.005 || radius <= 0) return
    context.save()
    context.globalAlpha = clamp(alpha)
    context.translate(x, y)
    context.rotate(rotation)
    context.drawImage(texture, -radius, -radius * stretch, radius * 2, radius * 2 * stretch)
    context.restore()
  }

  const render = (_time, deltaMs) => {
    const dt = Math.min(deltaMs / 1000, 0.05)
    const t = motion.time
    drift += dt
    context.clearRect(0, 0, view.width, view.height)

    // The rising emitter follows the very same GSAP translation as the rocket.
    // Ground exhaust stays at the launch point and rolls out to either side.
    const targetCount = Math.floor(Math.max(0, Math.min(t, 2.45) - 0.12) * (mobile ? 24 : 42))
    while (emitted < targetCount) {
      const ground = emitted % 3 !== 0
      const direction = emitted % 2 ? 1 : -1
      particles.push({
        x: view.width * originX + (random() - 0.5) * 18,
        y: ground ? view.height * originY + 55 : view.height * originY + motion.y + 42,
        vx: ground ? direction * (45 + random() * 155) : (random() - 0.5) * 42,
        vy: ground ? 18 - random() * 45 : 75 + random() * 70,
        radius: ground ? 26 + random() * 30 : 13 + random() * 16,
        growth: ground ? 75 + random() * 50 : 38 + random() * 30,
        rotation: random() * Math.PI * 2,
        spin: (random() - 0.5) * 0.3,
        age: 0,
        opacity: 0.5 + random() * 0.25,
        texture: smokeTextures[emitted % smokeTextures.length],
      })
      emitted += 1
    }

    for (const particle of particles) {
      particle.age += dt
      particle.x += particle.vx * dt
      particle.y += particle.vy * dt
      particle.radius += particle.growth * dt
      particle.rotation += particle.spin * dt
      const fade = smooth(0, 0.16, particle.age) * (1 - smooth(2, 4.8, particle.age))
      paint(particle.texture, particle.x, particle.y, particle.radius, particle.rotation,
        particle.opacity * fade * (1 - motion.reveal), 0.85)
    }

    // Successive rows roll upward from the launch cloud; their overlap fills
    // wide and portrait viewports before the opaque matching cover is applied.
    for (const cloud of clouds) {
      const progress = smooth(0.65 + cloud.row * 0.18 + cloud.offset * 0.12, 2.6 + cloud.offset * 0.12, t)
      if (!progress) continue
      const radius = Math.max(view.width / columns, view.height / rows) * 1.45
      const finalX = (cloud.column + 0.4 + cloud.offset * 0.2) * view.width / columns
      const finalY = (rows - cloud.row - 0.55) * view.height / rows
      const spread = smooth(0, 1, motion.reveal)
      const x = view.width * originX + (finalX - view.width * originX) * progress
        + (finalX - view.width / 2) * spread * 0.5 + Math.sin(drift * 0.4 + cloud.offset * 6) * 12
      const y = view.height + radius * 0.2 + (finalY - view.height - radius * 0.2) * progress
        - spread * (90 + cloud.offset * 150)
      const dissolve = 1 - smooth(cloud.offset * 0.22, 0.78 + cloud.offset * 0.22, motion.reveal)
      paint(cloud.texture, x, y, radius * (0.25 + progress * 0.75 + spread * 0.25),
        cloud.rotation + drift * 0.025, progress * dissolve * 0.92)
    }
  }

  // GSAP owns both movement and drawing, so hidden-tab timing cannot make the
  // smoke finish before the rocket or expose a half-mounted destination.
  gsap.ticker.add(render)
  return {
    motion,
    stop() {
      gsap.ticker.remove(render)
      window.removeEventListener('resize', resize)
      context.clearRect(0, 0, view.width, view.height)
      // Release the backing store while idle; textures are small and reusable.
      canvas.width = canvas.height = 1
    },
  }
}

const RocketSmoke = forwardRef(function RocketSmoke(_props, ref) {
  const canvasRef = useRef(null)
  const engineRef = useRef(null)

  useImperativeHandle(ref, () => ({
    start(origin) {
      engineRef.current?.stop()
      engineRef.current = startSmoke(canvasRef.current, origin)
      return engineRef.current
    },
  }), [])

  useEffect(() => () => engineRef.current?.stop(), [])

  return <canvas ref={canvasRef} className="rocket-transition-smoke" width="1" height="1" aria-hidden="true" />
})

export default RocketSmoke
