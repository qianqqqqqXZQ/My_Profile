import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle } from 'ogl'
import './Ferrofluid.css'

const MAX_COLORS = 8

const hexToRGB = (hex) => {
  const value = hex.replace('#', '').padEnd(6, '0')
  return [
    parseInt(value.slice(0, 2), 16) / 255,
    parseInt(value.slice(2, 4), 16) / 255,
    parseInt(value.slice(4, 6), 16) / 255,
  ]
}

const prepColors = (input) => {
  const base = (input?.length ? input : ['#ffffff', '#ffffff', '#ffffff']).slice(
    0,
    MAX_COLORS,
  )
  const count = base.length
  const arr = []

  for (let index = 0; index < MAX_COLORS; index += 1) {
    arr.push(hexToRGB(base[Math.min(index, base.length - 1)]))
  }

  return { arr, count }
}

const flowVec = (direction) => {
  switch (direction) {
    case 'up':
      return [0, 1]
    case 'down':
      return [0, -1]
    case 'left':
      return [-1, 0]
    case 'right':
      return [1, 0]
    default:
      return [0, -1]
  }
}

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

uniform vec3  iResolution;
uniform vec2  iMouse;
uniform float iTime;

uniform vec3  uColor0;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;
uniform vec3  uColor4;
uniform vec3  uColor5;
uniform vec3  uColor6;
uniform vec3  uColor7;
uniform int   uColorCount;

uniform vec3  uBackground;
uniform vec2  uFlow;
uniform float uSpeed;
uniform float uScale;
uniform float uTurbulence;
uniform float uFluidity;
uniform float uRimWidth;
uniform float uSharpness;
uniform float uShimmer;
uniform float uGlow;
uniform float uOpacity;
uniform float uMouseEnabled;
uniform float uMouseStrength;
uniform float uMouseRadius;

varying vec2 vUv;

#define PI 3.14159265

vec3 palette(float h) {
  int count = uColorCount;
  if (count < 1) count = 1;
  int idx = int(floor(clamp(h, 0.0, 0.999999) * float(count)));
  if (idx <= 0) return uColor0;
  if (idx == 1) return uColor1;
  if (idx == 2) return uColor2;
  if (idx == 3) return uColor3;
  if (idx == 4) return uColor4;
  if (idx == 5) return uColor5;
  if (idx == 6) return uColor6;
  return uColor7;
}

float hash(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float smin(float a, float b, float k) {
  float r = exp2(-a / k) + exp2(-b / k);
  return -k * log2(r);
}

float sinlerp(float a, float b, float w) {
  return mix(a, b, (sin(w * PI - PI / 2.0) + 1.0) / 2.0);
}

float vn(vec2 p, float s, float seed) {
  vec2 cellp = floor(p / s);
  vec2 relp = mod(p, s);
  float g1 = hash(vec3(cellp, seed));
  float g2 = hash(vec3(cellp.x + 1.0, cellp.y, seed));
  float g3 = hash(vec3(cellp.x + 1.0, cellp.y + 1.0, seed));
  float g4 = hash(vec3(cellp.x, cellp.y + 1.0, seed));
  float bx = sinlerp(g1, g2, relp.x / s);
  float tx = sinlerp(g4, g3, relp.x / s);
  return sinlerp(bx, tx, relp.y / s);
}

float dbn(vec2 p, float s, float seed) {
  float o = s / 2.0;
  float n0 = vn(p, s, seed);
  float n1 = vn(p + vec2(o, o), s, seed + 0.1);
  float n2 = vn(p + vec2(-o, o), s, seed + 0.2);
  float n3 = vn(p + vec2(o, -o), s, seed + 0.3);
  float n4 = vn(p + vec2(-o, -o), s, seed + 0.4);
  return (2.0 * n0 + 1.5 * n1 + 1.25 * n2 + 1.125 * n3 + n4) / 7.0;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  float ref = 700.0 / max(uScale, 0.05);
  vec2 p = fragCoord / iResolution.y * ref;

  float spd = 200.0 * uSpeed;
  float t = iTime;

  vec2 dir = uFlow;
  vec2 perp = vec2(-dir.y, dir.x);

  float distort1 = vn(p + perp * (t * spd), 60.0, 10.0) * 50.0 * uTurbulence;
  float distort2 = vn(p - perp * (t * spd), 120.0, 15.0) * 100.0 * uTurbulence;

  float peaks = dbn(p + distort1 + dir * (t * spd * 0.5), 40.0, 1.0);
  float peaks2 = dbn(p + distort2 - dir * (t * spd * 0.5), 40.0, 0.0);

  float mapeaks = smin(peaks, peaks2, max(uFluidity, 0.001));

  float mGlow = 0.0;
  if (uMouseEnabled > 0.5) {
    vec2 mp = iMouse / iResolution.y * ref;
    float md = length(p - mp) / ref;
    float rr = max(uMouseRadius, 0.02);
    mGlow = exp(-md * md / (rr * rr)) * uMouseStrength;
  }

  float band = (uRimWidth - abs((mapeaks - 0.4) * 2.0)) * 5.0;
  float ltn = clamp(band - vn(p + dir * (t * spd * 0.5), 60.0, 12.0) * uShimmer, 0.0, 1.0);
  ltn = pow(ltn, uSharpness) * uGlow;
  ltn *= clamp(1.0 - mGlow, 0.0, 1.0);

  float h = clamp(0.5 + (peaks - peaks2) * 0.8, 0.0, 1.0);
  vec3 outc = max(uBackground, palette(h) * ltn);
  fragColor = vec4(outc, uOpacity);
}

void main() {
  vec4 color;
  mainImage(color, vUv * iResolution.xy);
  gl_FragColor = color;
}
`

function Ferrofluid({
  className,
  dpr,
  paused = false,
  colors = ['#ffffff', '#ffffff', '#ffffff'],
  backgroundColor = '#120f17',
  speed = 0.5,
  scale = 1.9,
  turbulence = 1,
  fluidity = 0.1,
  rimWidth = 0.27,
  sharpness = 2.5,
  shimmer = 1.5,
  glow = 3.6,
  flowDirection = 'down',
  opacity = 1,
  mouseInteraction = true,
  mouseStrength = 1,
  mouseRadius = 0.35,
  mouseDampening = 0.15,
}) {
  const containerRef = useRef(null)
  const rafRef = useRef(null)
  const lastTimeRef = useRef(0)
  const mouseTargetRef = useRef([0, 0])

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return undefined
    }

    const renderer = new Renderer({
      dpr:
        dpr ?? (typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1),
      alpha: false,
      antialias: true,
    })

    const { gl } = renderer
    const canvas = gl.canvas
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    container.appendChild(canvas)

    const { arr, count } = prepColors(colors)
    const uniforms = {
      iResolution: { value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1] },
      iMouse: { value: [0, 0] },
      iTime: { value: 0 },
      uColor0: { value: arr[0] },
      uColor1: { value: arr[1] },
      uColor2: { value: arr[2] },
      uColor3: { value: arr[3] },
      uColor4: { value: arr[4] },
      uColor5: { value: arr[5] },
      uColor6: { value: arr[6] },
      uColor7: { value: arr[7] },
      uColorCount: { value: count },
      uBackground: { value: hexToRGB(backgroundColor) },
      uFlow: { value: flowVec(flowDirection) },
      uSpeed: { value: speed },
      uScale: { value: scale },
      uTurbulence: { value: turbulence },
      uFluidity: { value: fluidity },
      uRimWidth: { value: rimWidth },
      uSharpness: { value: sharpness },
      uShimmer: { value: shimmer },
      uGlow: { value: glow },
      uOpacity: { value: opacity },
      uMouseEnabled: { value: mouseInteraction ? 1 : 0 },
      uMouseStrength: { value: mouseStrength },
      uMouseRadius: { value: mouseRadius },
    }

    const program = new Program(gl, { vertex, fragment, uniforms })
    const geometry = new Triangle(gl)
    const mesh = new Mesh(gl, { geometry, program })

    const resize = () => {
      const rect = container.getBoundingClientRect()
      renderer.setSize(rect.width, rect.height)
      uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1]
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(container)

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      const scaleFactor = renderer.dpr || 1
      const x = (event.clientX - rect.left) * scaleFactor
      const y = (rect.height - (event.clientY - rect.top)) * scaleFactor
      mouseTargetRef.current = [x, y]

      if (mouseDampening <= 0) {
        uniforms.iMouse.value = [x, y]
      }
    }

    if (mouseInteraction) {
      window.addEventListener('pointermove', onPointerMove)
    }

    const loop = (time) => {
      rafRef.current = window.requestAnimationFrame(loop)
      uniforms.iTime.value = time * 0.001

      if (mouseDampening > 0) {
        if (!lastTimeRef.current) {
          lastTimeRef.current = time
        }

        const delta = (time - lastTimeRef.current) / 1000
        lastTimeRef.current = time
        const tau = Math.max(1e-4, mouseDampening)
        const factor = Math.min(1, 1 - Math.exp(-delta / tau))
        const target = mouseTargetRef.current
        const current = uniforms.iMouse.value
        current[0] += (target[0] - current[0]) * factor
        current[1] += (target[1] - current[1]) * factor
      } else {
        lastTimeRef.current = time
      }

      if (!paused) {
        renderer.render({ scene: mesh })
      }
    }

    if (!paused) {
      rafRef.current = window.requestAnimationFrame(loop)
    }

    const handleVisibility = () => {
      if (paused) {
        if (rafRef.current) {
          window.cancelAnimationFrame(rafRef.current)
          rafRef.current = null
        }
        return
      }

      if (!rafRef.current) {
        rafRef.current = window.requestAnimationFrame(loop)
      }
    }

    handleVisibility()

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current)
      }

      if (mouseInteraction) {
        window.removeEventListener('pointermove', onPointerMove)
      }

      observer.disconnect()

      if (canvas.parentElement === container) {
        container.removeChild(canvas)
      }

      renderer.gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [
    backgroundColor,
    colors,
    dpr,
    flowDirection,
    fluidity,
    glow,
    mouseDampening,
    mouseInteraction,
    mouseRadius,
    mouseStrength,
    opacity,
    paused,
    rimWidth,
    scale,
    sharpness,
    shimmer,
    speed,
    turbulence,
  ])

  return <div ref={containerRef} className={`ferrofluid-container ${className ?? ''}`.trim()} />
}

export default Ferrofluid
