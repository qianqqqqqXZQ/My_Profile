import { useEffect, useRef } from 'react'

function hexToRgb(hex) {
  const normalizedHex = hex.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (_, red, green, blue) => `${red}${red}${green}${green}${blue}${blue}`,
  )

  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalizedHex)

  if (!match) {
    return null
  }

  return {
    r: Number.parseInt(match[1], 16),
    g: Number.parseInt(match[2], 16),
    b: Number.parseInt(match[3], 16),
  }
}

function interpolateColor(start, end, factor) {
  const red = Math.round(start.r + (end.r - start.r) * factor)
  const green = Math.round(start.g + (end.g - start.g) * factor)
  const blue = Math.round(start.b + (end.b - start.b) * factor)

  return `rgb(${red}, ${green}, ${blue})`
}

function LetterGlitch({
  glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],
  className = '',
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789',
}) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const lettersRef = useRef([])
  const gridRef = useRef({ columns: 0, rows: 0 })
  const contextRef = useRef(null)
  const lastGlitchTimeRef = useRef(Date.now())

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return undefined
    }

    const context = canvas.getContext('2d')

    if (!context) {
      return undefined
    }

    contextRef.current = context

    const fontSize = 16
    const charWidth = 10
    const charHeight = 20
    const letterPool = Array.from(characters)

    const getRandomChar = () => letterPool[Math.floor(Math.random() * letterPool.length)]
    const getRandomColor = () => glitchColors[Math.floor(Math.random() * glitchColors.length)]

    const calculateGrid = (width, height) => ({
      columns: Math.ceil(width / charWidth),
      rows: Math.ceil(height / charHeight),
    })

    const initializeLetters = (columns, rows) => {
      const totalLetters = columns * rows
      gridRef.current = { columns, rows }
      lettersRef.current = Array.from({ length: totalLetters }, () => ({
        char: getRandomChar(),
        baseColor: getRandomColor(),
        color: getRandomColor(),
        targetColor: getRandomColor(),
        colorProgress: 1,
      }))
    }

    const drawLetters = () => {
      const activeContext = contextRef.current
      const rect = canvas.getBoundingClientRect()

      if (!activeContext || rect.width === 0 || rect.height === 0) {
        return
      }

      activeContext.clearRect(0, 0, rect.width, rect.height)
      activeContext.font = `${fontSize}px monospace`
      activeContext.textBaseline = 'top'

      lettersRef.current.forEach((letter, index) => {
        const x = (index % gridRef.current.columns) * charWidth
        const y = Math.floor(index / gridRef.current.columns) * charHeight
        activeContext.fillStyle = letter.color
        activeContext.fillText(letter.char, x, y)
      })
    }

    const resizeCanvas = () => {
      const parent = canvas.parentElement

      if (!parent) {
        return
      }

      const dpr = window.devicePixelRatio || 1
      const rect = parent.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const { columns, rows } = calculateGrid(rect.width, rect.height)
      initializeLetters(columns, rows)
      drawLetters()
    }

    const updateLetters = () => {
      const updateCount = Math.max(1, Math.floor(lettersRef.current.length * 0.05))

      for (let index = 0; index < updateCount; index += 1) {
        const letterIndex = Math.floor(Math.random() * lettersRef.current.length)
        const letter = lettersRef.current[letterIndex]

        if (!letter) {
          continue
        }

        letter.char = getRandomChar()
        letter.baseColor = letter.color
        letter.targetColor = getRandomColor()

        if (smooth) {
          letter.colorProgress = 0
        } else {
          letter.color = letter.targetColor
          letter.colorProgress = 1
        }
      }
    }

    const handleSmoothTransitions = () => {
      let needsRedraw = false

      lettersRef.current.forEach((letter) => {
        if (letter.colorProgress >= 1) {
          return
        }

        const startColor = hexToRgb(letter.baseColor)
        const endColor = hexToRgb(letter.targetColor)

        if (!startColor || !endColor) {
          letter.color = letter.targetColor
          letter.baseColor = letter.targetColor
          letter.colorProgress = 1
          needsRedraw = true
          return
        }

        letter.colorProgress = Math.min(letter.colorProgress + 0.05, 1)
        letter.color = interpolateColor(startColor, endColor, letter.colorProgress)

        if (letter.colorProgress === 1) {
          letter.baseColor = letter.targetColor
        }

        needsRedraw = true
      })

      if (needsRedraw) {
        drawLetters()
      }
    }

    const animate = () => {
      const now = Date.now()

      if (now - lastGlitchTimeRef.current >= glitchSpeed) {
        updateLetters()
        drawLetters()
        lastGlitchTimeRef.current = now
      }

      if (smooth) {
        handleSmoothTransitions()
      }

      animationRef.current = window.requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    const resizeObserver = new ResizeObserver(() => {
      window.cancelAnimationFrame(animationRef.current)
      resizeCanvas()
      animate()
    })

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement)
    }

    return () => {
      window.cancelAnimationFrame(animationRef.current)
      resizeObserver.disconnect()
    }
  }, [characters, glitchColors, glitchSpeed, smooth])

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />

      {outerVignette ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(circle, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 100%)',
          }}
        />
      ) : null}

      {centerVignette ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(circle, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 60%)',
          }}
        />
      ) : null}
    </div>
  )
}

export default LetterGlitch
