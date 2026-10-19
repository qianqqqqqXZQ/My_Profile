import { Mesh, Program, Renderer, Texture, Triangle } from 'ogl'

const TRAIL_LENGTH = 24
const STAMP_INTERVAL = 1 / 20
const HOLD_SECONDS = 0.18
const DISSOLVE_SECONDS = 0.95
const FOLLOW_SECONDS = 0.045

const vertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragment = `
precision highp float;
uniform sampler2D uArmor;
uniform vec2 uSize;
uniform vec2 uImageSize;
uniform float uTime;
uniform float uRadius;
uniform float uReducedMotion;
uniform vec4 uTrail[${TRAIL_LENGTH}];
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 cell = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(cell), hash(cell + vec2(1.0, 0.0)), f.x),
    mix(hash(cell + vec2(0.0, 1.0)), hash(cell + 1.0), f.x), f.y);
}

float flow(vec2 p) {
  return noise(p) * 0.57 + noise(p * 2.03 + 7.1) * 0.29
    + noise(p * 4.01 + 13.7) * 0.14;
}

void main() {
  float unit = min(uSize.x, uSize.y);
  vec2 p = vUv * uSize / unit;
  float t = uTime * (1.0 - uReducedMotion);
  vec2 drift = vec2(t * 0.12, -t * 0.16);
  vec2 warp = vec2(flow(p * 5.0 + drift), flow(p * 5.0 - drift + 19.1));
  vec2 fluidPosition = p + (warp - 0.5) * 0.19;
  float billow = flow(p * 11.0 + warp * 4.0 + drift * 1.3);
  float field = 0.0;

  // Joined segments keep fast strokes continuous; each part dissolves in place.
  for (int i = 0; i < ${TRAIL_LENGTH - 1}; i++) {
    vec4 a = uTrail[i];
    vec4 b = uTrail[i + 1];
    vec2 segment = b.xy - a.xy;
    float h = clamp(dot(fluidPosition - a.xy, segment)
      / max(dot(segment, segment), 0.000001), 0.0, 1.0);
    float strength = mix(a.z, b.z, h);
    float age = mix(a.w, b.w, h);
    vec2 offset = fluidPosition - mix(a.xy, b.xy, h);
    offset.y -= age * 0.018 * (1.0 - uReducedMotion);
    float radius = uRadius * (1.0 + age * 0.2);
    offset *= vec2(1.08, 0.9);
    float density = exp(-dot(offset, offset) / (radius * radius) * 1.65);
    density *= mix(0.55, 1.5, billow);
    field = max(field, density * strength);
  }

  float detail = flow(p * 19.0 + warp * 2.8 + drift * 0.8);
  float feather = mix(0.0, (detail - 0.5) * 0.42, smoothstep(0.02, 0.3, field));
  float reveal = smoothstep(0.07, 0.78, field + feather);

  // Match the portrait's object-fit: cover, anchored at the top.
  float scale = max(uSize.x / uImageSize.x, uSize.y / uImageSize.y);
  vec2 visible = uSize / (uImageSize * scale);
  vec2 imageUv = vec2((vUv.x - 0.5) * visible.x + 0.5,
    1.0 - (1.0 - vUv.y) * visible.y);
  gl_FragColor = vec4(texture2D(uArmor, imageUv).rgb, reveal);
}
`

export function createLiquidArmor(card, canvas, imageUrl) {
  // Retain the real portrait if graphics acceleration is unavailable.
  let renderer
  try {
    renderer = new Renderer({
      canvas,
      alpha: true,
      depth: false,
      dpr: Math.min(window.devicePixelRatio || 1, 1.5),
    })
  } catch {
    return undefined
  }

  const { gl } = renderer
  const texture = new Texture(gl, { generateMipmaps: false })
  // OGL resolves GLSL uniform arrays through ordinary JavaScript arrays.
  const trailData = Array(TRAIL_LENGTH * 4).fill(0)
  const uniforms = {
    uArmor: { value: texture },
    uSize: { value: [1, 1] },
    uImageSize: { value: [1, 1] },
    uTime: { value: 0 },
    uRadius: { value: 0.16 },
    uReducedMotion: { value: 0 },
    uTrail: { value: trailData },
  }
  const program = new Program(gl, { vertex, fragment, uniforms, depthTest: false, depthWrite: false })
  const geometry = new Triangle(gl)
  const mesh = new Mesh(gl, { geometry, program })
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const image = new Image()
  const pointer = { x: 0, y: 0 }
  const smooth = { x: 0, y: 0 }
  let trail = []
  let frameId = 0
  let lastTime = 0
  let lastStamp = -Infinity
  let inside = false
  let ready = false
  let disposed = false

  const resize = () => {
    const { width, height } = card.getBoundingClientRect()
    renderer.setSize(Math.max(1, width), Math.max(1, height))
    uniforms.uSize.value = [Math.max(1, width), Math.max(1, height)]
    uniforms.uRadius.value = Math.min(88, width * 0.16) / Math.max(1, Math.min(width, height))
    reset()
  }

  const tick = (milliseconds) => {
    frameId = 0
    if (disposed || document.hidden || !ready) return

    const time = milliseconds / 1000
    const delta = lastTime ? Math.min(time - lastTime, 0.05) : 1 / 60
    lastTime = time
    const factor = reducedMotion.matches ? 1 : 1 - Math.exp(-delta / FOLLOW_SECONDS)
    smooth.x += (pointer.x - smooth.x) * factor
    smooth.y += (pointer.y - smooth.y) * factor

    if (inside && time - lastStamp >= STAMP_INTERVAL) {
      trail.push({ x: smooth.x, y: smooth.y, time })
      trail = trail.slice(-(TRAIL_LENGTH - 1))
      lastStamp = time
    }

    const lifetime = reducedMotion.matches ? 0.24 : HOLD_SECONDS + DISSOLVE_SECONDS
    trail = trail.filter((point) => time - point.time < lifetime)
    const points = inside ? [...trail, { x: smooth.x, y: smooth.y, time }] : trail
    trailData.fill(0)
    points.forEach((point, index) => {
      const age = time - point.time
      const fade = Math.min(1, Math.max(0, (age - HOLD_SECONDS) / (lifetime - HOLD_SECONDS)))
      const strength = 1 - fade * fade * (3 - 2 * fade)
      const offset = index * 4
      trailData[offset] = point.x
      trailData[offset + 1] = point.y
      trailData[offset + 2] = strength
      trailData[offset + 3] = age
    })
    // Duplicate the last point so a single hover stamp is also a valid segment.
    if (points.length && points.length < TRAIL_LENGTH) {
      const end = (points.length - 1) * 4
      for (let index = points.length; index < TRAIL_LENGTH; index += 1) {
        for (let channel = 0; channel < 4; channel += 1) {
          trailData[index * 4 + channel] = trailData[end + channel]
        }
      }
    }

    uniforms.uTime.value = time
    uniforms.uReducedMotion.value = reducedMotion.matches ? 1 : 0
    renderer.render({ scene: mesh })
    canvas.style.opacity = trail.length ? '1' : '0'

    // Sleep completely after the last trace fades; pointer events wake the scene.
    if (inside || trail.length) frameId = window.requestAnimationFrame(tick)
    else lastTime = 0
  }

  const wake = () => {
    if (!frameId && ready && !document.hidden) frameId = window.requestAnimationFrame(tick)
  }

  function reset() {
    inside = false
    trail = []
    trailData.fill(0)
    lastTime = 0
    lastStamp = -Infinity
    canvas.style.opacity = '0'
    window.cancelAnimationFrame(frameId)
    frameId = 0
  }

  const updatePointer = (event) => {
    if (event.pointerType === 'touch' && event.type !== 'pointerdown' && !inside) return
    const rect = card.getBoundingClientRect()
    const unit = Math.min(rect.width, rect.height)
    if (!unit) return
    pointer.x = (event.clientX - rect.left) / unit
    pointer.y = (rect.bottom - event.clientY) / unit
    if (!inside) {
      smooth.x = pointer.x
      smooth.y = pointer.y
      // Capture the initial contact before pointerup, including a quick touch tap.
      lastStamp = performance.now() / 1000
      trail.push({ x: pointer.x, y: pointer.y, time: lastStamp })
      trail = trail.slice(-(TRAIL_LENGTH - 1))
    }
    inside = true
    wake()
  }

  const leave = () => { inside = false }
  const onPointerUp = (event) => { if (event.pointerType === 'touch') leave() }
  const onVisibility = () => { if (document.hidden) reset() }
  const onContextLost = (event) => {
    event.preventDefault()
    ready = false
    reset()
  }

  image.onload = () => {
    if (disposed) return
    texture.image = image
    uniforms.uImageSize.value = [image.naturalWidth, image.naturalHeight]
    ready = true
    if (inside) wake()
  }
  image.src = imageUrl

  resize()
  const observer = new ResizeObserver(resize)
  observer.observe(card)
  card.addEventListener('pointerenter', updatePointer)
  card.addEventListener('pointermove', updatePointer, { passive: true })
  card.addEventListener('pointerdown', updatePointer, { passive: true })
  card.addEventListener('pointerleave', leave)
  card.addEventListener('pointercancel', leave)
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('blur', reset)
  document.addEventListener('visibilitychange', onVisibility)
  canvas.addEventListener('webglcontextlost', onContextLost)

  return () => {
    disposed = true
    reset()
    observer.disconnect()
    image.onload = null
    card.removeEventListener('pointerenter', updatePointer)
    card.removeEventListener('pointermove', updatePointer)
    card.removeEventListener('pointerdown', updatePointer)
    card.removeEventListener('pointerleave', leave)
    card.removeEventListener('pointercancel', leave)
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('blur', reset)
    document.removeEventListener('visibilitychange', onVisibility)
    canvas.removeEventListener('webglcontextlost', onContextLost)
    geometry.remove()
    program.remove()
    gl.deleteTexture(texture.texture)
  }
}
