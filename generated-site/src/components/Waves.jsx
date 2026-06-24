import { useEffect, useRef } from 'react'
import './Waves.css'

class Grad {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }

  dot2(x, y) {
    return this.x * x + this.y * y
  }
}

class Noise {
  constructor(seed = 0) {
    this.grad3 = [
      new Grad(1, 1, 0),
      new Grad(-1, 1, 0),
      new Grad(1, -1, 0),
      new Grad(-1, -1, 0),
      new Grad(1, 0, 1),
      new Grad(-1, 0, 1),
      new Grad(1, 0, -1),
      new Grad(-1, 0, -1),
      new Grad(0, 1, 1),
      new Grad(0, -1, 1),
      new Grad(0, 1, -1),
      new Grad(0, -1, -1),
    ]
    this.p = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240,
      21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88,
      237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83,
      111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216,
      80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186,
      3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58,
      17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
      129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193,
      238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
      184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128,
      195, 78, 66, 215, 61, 156, 180,
    ]
    this.perm = new Array(512)
    this.gradP = new Array(512)
    this.seed(seed)
  }

  seed(seed) {
    let nextSeed = seed
    if (nextSeed > 0 && nextSeed < 1) {
      nextSeed *= 65536
    }

    nextSeed = Math.floor(nextSeed)
    if (nextSeed < 256) {
      nextSeed |= nextSeed << 8
    }

    for (let index = 0; index < 256; index += 1) {
      const value =
        index & 1
          ? this.p[index] ^ (nextSeed & 255)
          : this.p[index] ^ ((nextSeed >> 8) & 255)
      this.perm[index] = this.perm[index + 256] = value
      this.gradP[index] = this.gradP[index + 256] = this.grad3[value % 12]
    }
  }

  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10)
  }

  lerp(a, b, t) {
    return (1 - t) * a + t * b
  }

  perlin2(x, y) {
    let gridX = Math.floor(x)
    let gridY = Math.floor(y)
    const localX = x - gridX
    const localY = y - gridY
    gridX &= 255
    gridY &= 255
    const n00 = this.gradP[gridX + this.perm[gridY]].dot2(localX, localY)
    const n01 = this.gradP[gridX + this.perm[gridY + 1]].dot2(localX, localY - 1)
    const n10 = this.gradP[gridX + 1 + this.perm[gridY]].dot2(localX - 1, localY)
    const n11 = this.gradP[gridX + 1 + this.perm[gridY + 1]].dot2(localX - 1, localY - 1)
    const blendX = this.fade(localX)
    return this.lerp(this.lerp(n00, n10, blendX), this.lerp(n01, n11, blendX), this.fade(localY))
  }
}

function Waves({
  lineColor = 'black',
  backgroundColor = 'transparent',
  waveSpeedX = 0.0125,
  waveSpeedY = 0.005,
  waveAmpX = 32,
  waveAmpY = 16,
  xGap = 10,
  yGap = 32,
  friction = 0.925,
  tension = 0.005,
  maxCursorMove = 100,
  style = {},
  className = '',
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const frameIdRef = useRef(null)
  const linesRef = useRef([])
  const noiseRef = useRef(new Noise(Math.random()))
  const boundingRef = useRef({ width: 0, height: 0, left: 0, top: 0 })
  const mouseRef = useRef({
    x: -10,
    y: 0,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false,
  })
  const configRef = useRef({
    lineColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    friction,
    tension,
    maxCursorMove,
    xGap,
    yGap,
  })

  useEffect(() => {
    configRef.current = {
      lineColor,
      waveSpeedX,
      waveSpeedY,
      waveAmpX,
      waveAmpY,
      friction,
      tension,
      maxCursorMove,
      xGap,
      yGap,
    }
  }, [
    friction,
    lineColor,
    maxCursorMove,
    tension,
    waveAmpX,
    waveAmpY,
    waveSpeedX,
    waveSpeedY,
    xGap,
    yGap,
  ])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) {
      return undefined
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return undefined
    }

    ctxRef.current = context

    const setSize = () => {
      boundingRef.current = container.getBoundingClientRect()
      canvas.width = boundingRef.current.width
      canvas.height = boundingRef.current.height
    }

    const setLines = () => {
      const { width, height } = boundingRef.current
      const nextLines = []
      const offsetWidth = width + 200
      const offsetHeight = height + 30
      const { xGap: gapX, yGap: gapY } = configRef.current
      const totalLines = Math.ceil(offsetWidth / gapX)
      const totalPoints = Math.ceil(offsetHeight / gapY)
      const xStart = (width - gapX * totalLines) / 2
      const yStart = (height - gapY * totalPoints) / 2

      for (let lineIndex = 0; lineIndex <= totalLines; lineIndex += 1) {
        const points = []
        for (let pointIndex = 0; pointIndex <= totalPoints; pointIndex += 1) {
          points.push({
            x: xStart + gapX * lineIndex,
            y: yStart + gapY * pointIndex,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 },
          })
        }
        nextLines.push(points)
      }

      linesRef.current = nextLines
    }

    const updateMouse = (x, y) => {
      const mouse = mouseRef.current
      const bounds = boundingRef.current
      mouse.x = x - bounds.left
      mouse.y = y - bounds.top

      if (!mouse.set) {
        mouse.sx = mouse.x
        mouse.sy = mouse.y
        mouse.lx = mouse.x
        mouse.ly = mouse.y
        mouse.set = true
      }
    }

    const movePoints = (time) => {
      const lines = linesRef.current
      const mouse = mouseRef.current
      const noise = noiseRef.current
      const {
        waveSpeedX: speedX,
        waveSpeedY: speedY,
        waveAmpX: ampX,
        waveAmpY: ampY,
        friction: dragFriction,
        tension: springTension,
        maxCursorMove: cursorMoveMax,
      } = configRef.current

      lines.forEach((points) => {
        points.forEach((point) => {
          const motion =
            noise.perlin2(
              (point.x + time * speedX) * 0.002,
              (point.y + time * speedY) * 0.0015,
            ) * 12

          point.wave.x = Math.cos(motion) * ampX
          point.wave.y = Math.sin(motion) * ampY

          const dx = point.x - mouse.sx
          const dy = point.y - mouse.sy
          const distance = Math.hypot(dx, dy)
          const influence = Math.max(175, mouse.vs)

          if (distance < influence && cursorMoveMax > 0) {
            const strength = 1 - distance / influence
            const force = Math.cos(distance * 0.001) * strength
            point.cursor.vx += Math.cos(mouse.a) * force * influence * mouse.vs * 0.00065
            point.cursor.vy += Math.sin(mouse.a) * force * influence * mouse.vs * 0.00065
          }

          point.cursor.vx += (0 - point.cursor.x) * springTension
          point.cursor.vy += (0 - point.cursor.y) * springTension
          point.cursor.vx *= dragFriction
          point.cursor.vy *= dragFriction
          point.cursor.x += point.cursor.vx * 2
          point.cursor.y += point.cursor.vy * 2
          point.cursor.x = Math.min(cursorMoveMax, Math.max(-cursorMoveMax, point.cursor.x))
          point.cursor.y = Math.min(cursorMoveMax, Math.max(-cursorMoveMax, point.cursor.y))
        })
      })
    }

    const moved = (point, withCursor = true) => ({
      x: Math.round((point.x + point.wave.x + (withCursor ? point.cursor.x : 0)) * 10) / 10,
      y: Math.round((point.y + point.wave.y + (withCursor ? point.cursor.y : 0)) * 10) / 10,
    })

    const drawLines = () => {
      const { width, height } = boundingRef.current
      const drawingContext = ctxRef.current
      drawingContext.clearRect(0, 0, width, height)
      drawingContext.beginPath()
      drawingContext.strokeStyle = configRef.current.lineColor

      linesRef.current.forEach((points) => {
        let startPoint = moved(points[0], false)
        drawingContext.moveTo(startPoint.x, startPoint.y)

        points.forEach((point, index) => {
          const isLast = index === points.length - 1
          startPoint = moved(point, !isLast)
          const endPoint = moved(points[index + 1] || points[points.length - 1], !isLast)
          drawingContext.lineTo(startPoint.x, startPoint.y)
          if (isLast) {
            drawingContext.moveTo(endPoint.x, endPoint.y)
          }
        })
      })

      drawingContext.stroke()
    }

    const tick = (time) => {
      const mouse = mouseRef.current
      mouse.sx += (mouse.x - mouse.sx) * 0.1
      mouse.sy += (mouse.y - mouse.sy) * 0.1
      const dx = mouse.x - mouse.lx
      const dy = mouse.y - mouse.ly
      const velocity = Math.hypot(dx, dy)
      mouse.v = velocity
      mouse.vs += (velocity - mouse.vs) * 0.1
      mouse.vs = Math.min(100, mouse.vs)
      mouse.lx = mouse.x
      mouse.ly = mouse.y
      mouse.a = Math.atan2(dy, dx)

      movePoints(time)
      drawLines()
      frameIdRef.current = window.requestAnimationFrame(tick)
    }

    const onResize = () => {
      setSize()
      setLines()
    }

    const onMouseMove = (event) => {
      updateMouse(event.clientX, event.clientY)
    }

    const onTouchMove = (event) => {
      const touch = event.touches[0]
      if (touch) {
        updateMouse(touch.clientX, touch.clientY)
      }
    }

    setSize()
    setLines()
    frameIdRef.current = window.requestAnimationFrame(tick)

    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(container)
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)

      if (frameIdRef.current) {
        window.cancelAnimationFrame(frameIdRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`waves ${className}`.trim()}
      style={{
        backgroundColor,
        ...style,
      }}
    >
      <canvas ref={canvasRef} className="waves-canvas" />
    </div>
  )
}

export default Waves
