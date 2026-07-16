import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './LiquidEther.css'

export default function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  colors = ['#5227FF', '#FF9FFC', '#B497CF'],
  style = {},
  className = '',
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 1000,
  autoRampDuration = 0.6,
}) {
  const mountRef = useRef(null)
  const webglRef = useRef(null)
  const resizeObserverRef = useRef(null)
  const rafRef = useRef(null)
  const intersectionObserverRef = useRef(null)
  const isVisibleRef = useRef(true)
  const resizeRafRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) {
      return undefined
    }

    const makePaletteTexture = (stops) => {
      let paletteStops

      if (Array.isArray(stops) && stops.length > 0) {
        paletteStops = stops.length === 1 ? [stops[0], stops[0]] : stops
      } else {
        paletteStops = ['#ffffff', '#ffffff']
      }

      const width = paletteStops.length
      const data = new Uint8Array(width * 4)

      for (let index = 0; index < width; index += 1) {
        const color = new THREE.Color(paletteStops[index])
        data[index * 4] = Math.round(color.r * 255)
        data[index * 4 + 1] = Math.round(color.g * 255)
        data[index * 4 + 2] = Math.round(color.b * 255)
        data[index * 4 + 3] = 255
      }

      const texture = new THREE.DataTexture(data, width, 1, THREE.RGBAFormat)
      texture.magFilter = THREE.LinearFilter
      texture.minFilter = THREE.LinearFilter
      texture.wrapS = THREE.ClampToEdgeWrapping
      texture.wrapT = THREE.ClampToEdgeWrapping
      texture.generateMipmaps = false
      texture.needsUpdate = true
      return texture
    }

    const paletteTexture = makePaletteTexture(colors)
    const backgroundColor = new THREE.Vector4(0, 0, 0, 0)

    class CommonClass {
      constructor() {
        this.width = 0
        this.height = 0
        this.aspect = 1
        this.pixelRatio = 1
        this.time = 0
        this.delta = 0
        this.container = null
        this.renderer = null
        this.clock = null
      }

      init(container) {
        this.container = container
        this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
        this.resize()
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.autoClear = false
        this.renderer.setClearColor(new THREE.Color(0x000000), 0)
        this.renderer.setPixelRatio(this.pixelRatio)
        this.renderer.setSize(this.width, this.height)
        this.renderer.domElement.style.width = '100%'
        this.renderer.domElement.style.height = '100%'
        this.renderer.domElement.style.display = 'block'
        this.clock = new THREE.Clock()
        this.clock.start()
      }

      resize() {
        if (!this.container) {
          return
        }

        const rect = this.container.getBoundingClientRect()
        this.width = Math.max(1, Math.floor(rect.width))
        this.height = Math.max(1, Math.floor(rect.height))
        this.aspect = this.width / this.height

        if (this.renderer) {
          this.renderer.setSize(this.width, this.height, false)
        }
      }

      update() {
        this.delta = this.clock.getDelta()
        this.time += this.delta
      }
    }

    const Common = new CommonClass()

    class MouseClass {
      constructor() {
        this.mouseMoved = false
        this.coords = new THREE.Vector2()
        this.coordsOld = new THREE.Vector2()
        this.diff = new THREE.Vector2()
        this.timer = null
        this.container = null
        this.docTarget = null
        this.listenerTarget = null
        this.isHoverInside = false
        this.hasUserControl = false
        this.isAutoActive = false
        this.autoIntensity = 2
        this.takeoverActive = false
        this.takeoverStartTime = 0
        this.takeoverDuration = 0.25
        this.takeoverFrom = new THREE.Vector2()
        this.takeoverTo = new THREE.Vector2()
        this.onInteract = null
        this.handleMouseMove = this.onDocumentMouseMove.bind(this)
        this.handleTouchStart = this.onDocumentTouchStart.bind(this)
        this.handleTouchMove = this.onDocumentTouchMove.bind(this)
        this.handleTouchEnd = this.onTouchEnd.bind(this)
        this.handleDocumentLeave = this.onDocumentLeave.bind(this)
      }

      init(container) {
        this.container = container
        this.docTarget = container.ownerDocument || null
        const defaultView =
          (this.docTarget && this.docTarget.defaultView) || (typeof window !== 'undefined' ? window : null)

        if (!defaultView) {
          return
        }

        this.listenerTarget = defaultView
        this.listenerTarget.addEventListener('mousemove', this.handleMouseMove)
        this.listenerTarget.addEventListener('touchstart', this.handleTouchStart, { passive: true })
        this.listenerTarget.addEventListener('touchmove', this.handleTouchMove, { passive: true })
        this.listenerTarget.addEventListener('touchend', this.handleTouchEnd)

        if (this.docTarget) {
          this.docTarget.addEventListener('mouseleave', this.handleDocumentLeave)
        }
      }

      dispose() {
        if (this.listenerTarget) {
          this.listenerTarget.removeEventListener('mousemove', this.handleMouseMove)
          this.listenerTarget.removeEventListener('touchstart', this.handleTouchStart)
          this.listenerTarget.removeEventListener('touchmove', this.handleTouchMove)
          this.listenerTarget.removeEventListener('touchend', this.handleTouchEnd)
        }

        if (this.docTarget) {
          this.docTarget.removeEventListener('mouseleave', this.handleDocumentLeave)
        }

        this.listenerTarget = null
        this.docTarget = null
        this.container = null

        if (this.timer) {
          window.clearTimeout(this.timer)
          this.timer = null
        }
      }

      isPointInside(clientX, clientY) {
        if (!this.container) {
          return false
        }

        const rect = this.container.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) {
          return false
        }

        return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
      }

      updateHoverState(clientX, clientY) {
        this.isHoverInside = this.isPointInside(clientX, clientY)
        return this.isHoverInside
      }

      setCoords(x, y) {
        if (!this.container) {
          return
        }

        if (this.timer) {
          window.clearTimeout(this.timer)
        }

        const rect = this.container.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) {
          return
        }

        const normalizedX = (x - rect.left) / rect.width
        const normalizedY = (y - rect.top) / rect.height
        this.coords.set(normalizedX * 2 - 1, -(normalizedY * 2 - 1))
        this.mouseMoved = true
        this.timer = window.setTimeout(() => {
          this.mouseMoved = false
        }, 100)
      }

      setNormalized(x, y) {
        this.coords.set(x, y)
        this.mouseMoved = true
      }

      onDocumentMouseMove(event) {
        if (!this.updateHoverState(event.clientX, event.clientY)) {
          return
        }

        if (this.onInteract) {
          this.onInteract()
        }

        if (this.isAutoActive && !this.hasUserControl && !this.takeoverActive) {
          if (!this.container) {
            return
          }

          const rect = this.container.getBoundingClientRect()
          if (rect.width === 0 || rect.height === 0) {
            return
          }

          const normalizedX = (event.clientX - rect.left) / rect.width
          const normalizedY = (event.clientY - rect.top) / rect.height
          this.takeoverFrom.copy(this.coords)
          this.takeoverTo.set(normalizedX * 2 - 1, -(normalizedY * 2 - 1))
          this.takeoverStartTime = performance.now()
          this.takeoverActive = true
          this.hasUserControl = true
          this.isAutoActive = false
          return
        }

        this.setCoords(event.clientX, event.clientY)
        this.hasUserControl = true
      }

      onDocumentTouchStart(event) {
        if (event.touches.length !== 1) {
          return
        }

        const touch = event.touches[0]
        if (!this.updateHoverState(touch.clientX, touch.clientY)) {
          return
        }

        if (this.onInteract) {
          this.onInteract()
        }

        this.setCoords(touch.clientX, touch.clientY)
        this.hasUserControl = true
      }

      onDocumentTouchMove(event) {
        if (event.touches.length !== 1) {
          return
        }

        const touch = event.touches[0]
        if (!this.updateHoverState(touch.clientX, touch.clientY)) {
          return
        }

        if (this.onInteract) {
          this.onInteract()
        }

        this.setCoords(touch.clientX, touch.clientY)
      }

      onTouchEnd() {
        this.isHoverInside = false
      }

      onDocumentLeave() {
        this.isHoverInside = false
      }

      update() {
        if (this.takeoverActive) {
          const progress = (performance.now() - this.takeoverStartTime) / (this.takeoverDuration * 1000)

          if (progress >= 1) {
            this.takeoverActive = false
            this.coords.copy(this.takeoverTo)
            this.coordsOld.copy(this.coords)
            this.diff.set(0, 0)
          } else {
            const eased = progress * progress * (3 - 2 * progress)
            this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo, eased)
          }
        }

        this.diff.subVectors(this.coords, this.coordsOld)
        this.coordsOld.copy(this.coords)

        if (this.coordsOld.x === 0 && this.coordsOld.y === 0) {
          this.diff.set(0, 0)
        }

        if (this.isAutoActive && !this.takeoverActive) {
          this.diff.multiplyScalar(this.autoIntensity)
        }
      }
    }

    const Mouse = new MouseClass()

    class AutoDriver {
      constructor(mouse, manager, options) {
        this.mouse = mouse
        this.manager = manager
        this.enabled = options.enabled
        this.speed = options.speed
        this.resumeDelay = options.resumeDelay || 3000
        this.rampDurationMs = (options.rampDuration || 0) * 1000
        this.active = false
        this.current = new THREE.Vector2(0, 0)
        this.target = new THREE.Vector2()
        this.lastTime = performance.now()
        this.activationTime = 0
        this.margin = 0.2
        this.tempDir = new THREE.Vector2()
        this.pickNewTarget()
      }

      pickNewTarget() {
        const randomValue = Math.random
        this.target.set(
          (randomValue() * 2 - 1) * (1 - this.margin),
          (randomValue() * 2 - 1) * (1 - this.margin),
        )
      }

      forceStop() {
        this.active = false
        this.mouse.isAutoActive = false
      }

      update() {
        if (!this.enabled) {
          return
        }

        const now = performance.now()
        const idleTime = now - this.manager.lastUserInteraction

        if (idleTime < this.resumeDelay) {
          if (this.active) {
            this.forceStop()
          }
          return
        }

        if (this.mouse.isHoverInside) {
          if (this.active) {
            this.forceStop()
          }
          return
        }

        if (!this.active) {
          this.active = true
          this.current.copy(this.mouse.coords)
          this.lastTime = now
          this.activationTime = now
        }

        if (!this.active) {
          return
        }

        this.mouse.isAutoActive = true

        let deltaSeconds = (now - this.lastTime) / 1000
        this.lastTime = now

        if (deltaSeconds > 0.2) {
          deltaSeconds = 0.016
        }

        const direction = this.tempDir.subVectors(this.target, this.current)
        const distance = direction.length()

        if (distance < 0.01) {
          this.pickNewTarget()
          return
        }

        direction.normalize()

        let ramp = 1
        if (this.rampDurationMs > 0) {
          const progress = Math.min(1, (now - this.activationTime) / this.rampDurationMs)
          ramp = progress * progress * (3 - 2 * progress)
        }

        const step = this.speed * deltaSeconds * ramp
        const movement = Math.min(step, distance)
        this.current.addScaledVector(direction, movement)
        this.mouse.setNormalized(this.current.x, this.current.y)
      }
    }

    const faceVert = `
      attribute vec3 position;
      uniform vec2 px;
      uniform vec2 boundarySpace;
      varying vec2 uv;
      precision highp float;
      void main() {
        vec3 pos = position;
        vec2 scale = 1.0 - boundarySpace * 2.0;
        pos.xy = pos.xy * scale;
        uv = vec2(0.5) + pos.xy * 0.5;
        gl_Position = vec4(pos, 1.0);
      }
    `

    const lineVert = `
      attribute vec3 position;
      uniform vec2 px;
      precision highp float;
      varying vec2 uv;
      void main() {
        vec3 pos = position;
        uv = 0.5 + pos.xy * 0.5;
        vec2 n = sign(pos.xy);
        pos.xy = abs(pos.xy) - px;
        pos.xy *= n;
        gl_Position = vec4(pos, 1.0);
      }
    `

    const mouseVert = `
      precision highp float;
      attribute vec3 position;
      attribute vec2 uv;
      uniform vec2 center;
      uniform vec2 scale;
      uniform vec2 px;
      varying vec2 vUv;
      void main() {
        vec2 pos = position.xy * scale * 2.0 * px + center;
        vUv = uv;
        gl_Position = vec4(pos, 0.0, 1.0);
      }
    `

    const advectionFrag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform float dt;
      uniform bool isBFECC;
      uniform vec2 fboSize;
      uniform vec2 px;
      varying vec2 uv;
      void main() {
        vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
        if (!isBFECC) {
          vec2 vel = texture2D(velocity, uv).xy;
          vec2 uv2 = uv - vel * dt * ratio;
          vec2 newVel = texture2D(velocity, uv2).xy;
          gl_FragColor = vec4(newVel, 0.0, 0.0);
        } else {
          vec2 spotNew = uv;
          vec2 velOld = texture2D(velocity, uv).xy;
          vec2 spotOld = spotNew - velOld * dt * ratio;
          vec2 velNew1 = texture2D(velocity, spotOld).xy;
          vec2 spotNew2 = spotOld + velNew1 * dt * ratio;
          vec2 error = spotNew2 - spotNew;
          vec2 spotNew3 = spotNew - error / 2.0;
          vec2 vel2 = texture2D(velocity, spotNew3).xy;
          vec2 spotOld2 = spotNew3 - vel2 * dt * ratio;
          vec2 newVel2 = texture2D(velocity, spotOld2).xy;
          gl_FragColor = vec4(newVel2, 0.0, 0.0);
        }
      }
    `

    const colorFrag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform sampler2D palette;
      uniform vec4 bgColor;
      varying vec2 uv;
      void main() {
        vec2 vel = texture2D(velocity, uv).xy;
        float velocityLength = clamp(length(vel), 0.0, 1.0);
        vec3 color = texture2D(palette, vec2(velocityLength, 0.5)).rgb;
        vec3 outRgb = mix(bgColor.rgb, color, velocityLength);
        float outAlpha = mix(bgColor.a, 1.0, velocityLength);
        gl_FragColor = vec4(outRgb, outAlpha);
      }
    `

    const divergenceFrag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform float dt;
      uniform vec2 px;
      varying vec2 uv;
      void main() {
        float x0 = texture2D(velocity, uv - vec2(px.x, 0.0)).x;
        float x1 = texture2D(velocity, uv + vec2(px.x, 0.0)).x;
        float y0 = texture2D(velocity, uv - vec2(0.0, px.y)).y;
        float y1 = texture2D(velocity, uv + vec2(0.0, px.y)).y;
        float divergence = (x1 - x0 + y1 - y0) / 2.0;
        gl_FragColor = vec4(divergence / dt);
      }
    `

    const externalForceFrag = `
      precision highp float;
      uniform vec2 force;
      uniform vec2 center;
      uniform vec2 scale;
      uniform vec2 px;
      varying vec2 vUv;
      void main() {
        vec2 circle = (vUv - 0.5) * 2.0;
        float distance = 1.0 - min(length(circle), 1.0);
        distance *= distance;
        gl_FragColor = vec4(force * distance, 0.0, 1.0);
      }
    `

    const poissonFrag = `
      precision highp float;
      uniform sampler2D pressure;
      uniform sampler2D divergence;
      uniform vec2 px;
      varying vec2 uv;
      void main() {
        float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;
        float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;
        float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;
        float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;
        float div = texture2D(divergence, uv).r;
        float newPressure = (p0 + p1 + p2 + p3) / 4.0 - div;
        gl_FragColor = vec4(newPressure);
      }
    `

    const pressureFrag = `
      precision highp float;
      uniform sampler2D pressure;
      uniform sampler2D velocity;
      uniform vec2 px;
      uniform float dt;
      varying vec2 uv;
      void main() {
        float step = 1.0;
        float p0 = texture2D(pressure, uv + vec2(px.x * step, 0.0)).r;
        float p1 = texture2D(pressure, uv - vec2(px.x * step, 0.0)).r;
        float p2 = texture2D(pressure, uv + vec2(0.0, px.y * step)).r;
        float p3 = texture2D(pressure, uv - vec2(0.0, px.y * step)).r;
        vec2 velocityValue = texture2D(velocity, uv).xy;
        vec2 pressureGradient = vec2(p0 - p1, p2 - p3) * 0.5;
        velocityValue = velocityValue - pressureGradient * dt;
        gl_FragColor = vec4(velocityValue, 0.0, 1.0);
      }
    `

    const viscousFrag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform sampler2D velocity_new;
      uniform float v;
      uniform vec2 px;
      uniform float dt;
      varying vec2 uv;
      void main() {
        vec2 oldVelocity = texture2D(velocity, uv).xy;
        vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;
        vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;
        vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;
        vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;
        vec2 newVelocity = 4.0 * oldVelocity + v * dt * (new0 + new1 + new2 + new3);
        newVelocity /= 4.0 * (1.0 + v * dt);
        gl_FragColor = vec4(newVelocity, 0.0, 0.0);
      }
    `

    class ShaderPass {
      constructor(props) {
        this.props = props || {}
        this.uniforms = this.props.material?.uniforms || null
        this.scene = null
        this.camera = null
      }

      init() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.Camera()

        if (this.uniforms) {
          const material = new THREE.RawShaderMaterial(this.props.material)
          const geometry = new THREE.PlaneGeometry(2, 2)
          const plane = new THREE.Mesh(geometry, material)
          this.scene.add(plane)
        }
      }

      update() {
        Common.renderer.setRenderTarget(this.props.output || null)
        Common.renderer.render(this.scene, this.camera)
        Common.renderer.setRenderTarget(null)
      }
    }

    class Advection extends ShaderPass {
      constructor(simulationProps) {
        super({
          material: {
            vertexShader: faceVert,
            fragmentShader: advectionFrag,
            uniforms: {
              boundarySpace: { value: simulationProps.cellScale },
              px: { value: simulationProps.cellScale },
              fboSize: { value: simulationProps.fboSize },
              velocity: { value: simulationProps.src.texture },
              dt: { value: simulationProps.dt },
              isBFECC: { value: true },
            },
          },
          output: simulationProps.dst,
        })

        this.uniforms = this.props.material.uniforms
        this.init()
      }

      init() {
        super.init()
        this.createBoundary()
      }

      createBoundary() {
        const boundaryGeometry = new THREE.BufferGeometry()
        const vertices = new Float32Array([
          -1, -1, 0,
          -1, 1, 0,
          -1, 1, 0,
          1, 1, 0,
          1, 1, 0,
          1, -1, 0,
          1, -1, 0,
          -1, -1, 0,
        ])

        boundaryGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

        const boundaryMaterial = new THREE.RawShaderMaterial({
          vertexShader: lineVert,
          fragmentShader: advectionFrag,
          uniforms: this.uniforms,
        })

        this.line = new THREE.LineSegments(boundaryGeometry, boundaryMaterial)
        this.scene.add(this.line)
      }

      update({ dt: deltaTime, isBounce: bounce, BFECC: useBfecc }) {
        this.uniforms.dt.value = deltaTime
        this.line.visible = bounce
        this.uniforms.isBFECC.value = useBfecc
        super.update()
      }
    }

    class ExternalForce extends ShaderPass {
      constructor(simulationProps) {
        super({ output: simulationProps.dst })
        this.init(simulationProps)
      }

      init(simulationProps) {
        super.init()

        const mouseGeometry = new THREE.PlaneGeometry(1, 1)
        const mouseMaterial = new THREE.RawShaderMaterial({
          vertexShader: mouseVert,
          fragmentShader: externalForceFrag,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          uniforms: {
            px: { value: simulationProps.cellScale },
            force: { value: new THREE.Vector2(0, 0) },
            center: { value: new THREE.Vector2(0, 0) },
            scale: { value: new THREE.Vector2(simulationProps.cursorSize, simulationProps.cursorSize) },
          },
        })

        this.mouse = new THREE.Mesh(mouseGeometry, mouseMaterial)
        this.scene.add(this.mouse)
      }

      update(props) {
        const forceX = (Mouse.diff.x / 2) * props.mouseForce
        const forceY = (Mouse.diff.y / 2) * props.mouseForce
        const cursorSizeX = props.cursorSize * props.cellScale.x
        const cursorSizeY = props.cursorSize * props.cellScale.y
        const centerX = Math.min(
          Math.max(Mouse.coords.x, -1 + cursorSizeX + props.cellScale.x * 2),
          1 - cursorSizeX - props.cellScale.x * 2,
        )
        const centerY = Math.min(
          Math.max(Mouse.coords.y, -1 + cursorSizeY + props.cellScale.y * 2),
          1 - cursorSizeY - props.cellScale.y * 2,
        )

        const { uniforms } = this.mouse.material
        uniforms.force.value.set(forceX, forceY)
        uniforms.center.value.set(centerX, centerY)
        uniforms.scale.value.set(props.cursorSize, props.cursorSize)
        super.update()
      }
    }

    class Viscous extends ShaderPass {
      constructor(simulationProps) {
        super({
          material: {
            vertexShader: faceVert,
            fragmentShader: viscousFrag,
            uniforms: {
              boundarySpace: { value: simulationProps.boundarySpace },
              velocity: { value: simulationProps.src.texture },
              velocity_new: { value: simulationProps.dstAlt.texture },
              v: { value: simulationProps.viscous },
              px: { value: simulationProps.cellScale },
              dt: { value: simulationProps.dt },
            },
          },
          output: simulationProps.dst,
          output0: simulationProps.dstAlt,
          output1: simulationProps.dst,
        })

        this.init()
      }

      update({ viscous: viscosity, iterations, dt: deltaTime }) {
        let inputFbo
        let outputFbo

        this.uniforms.v.value = viscosity

        for (let index = 0; index < iterations; index += 1) {
          if (index % 2 === 0) {
            inputFbo = this.props.output0
            outputFbo = this.props.output1
          } else {
            inputFbo = this.props.output1
            outputFbo = this.props.output0
          }

          this.uniforms.velocity_new.value = inputFbo.texture
          this.props.output = outputFbo
          this.uniforms.dt.value = deltaTime
          super.update()
        }

        return outputFbo
      }
    }

    class Divergence extends ShaderPass {
      constructor(simulationProps) {
        super({
          material: {
            vertexShader: faceVert,
            fragmentShader: divergenceFrag,
            uniforms: {
              boundarySpace: { value: simulationProps.boundarySpace },
              velocity: { value: simulationProps.src.texture },
              px: { value: simulationProps.cellScale },
              dt: { value: simulationProps.dt },
            },
          },
          output: simulationProps.dst,
        })

        this.init()
      }

      update({ velocity }) {
        this.uniforms.velocity.value = velocity.texture
        super.update()
      }
    }

    class Poisson extends ShaderPass {
      constructor(simulationProps) {
        super({
          material: {
            vertexShader: faceVert,
            fragmentShader: poissonFrag,
            uniforms: {
              boundarySpace: { value: simulationProps.boundarySpace },
              pressure: { value: simulationProps.dstAlt.texture },
              divergence: { value: simulationProps.src.texture },
              px: { value: simulationProps.cellScale },
            },
          },
          output: simulationProps.dst,
          output0: simulationProps.dstAlt,
          output1: simulationProps.dst,
        })

        this.init()
      }

      update({ iterations }) {
        let inputFbo
        let outputFbo

        for (let index = 0; index < iterations; index += 1) {
          if (index % 2 === 0) {
            inputFbo = this.props.output0
            outputFbo = this.props.output1
          } else {
            inputFbo = this.props.output1
            outputFbo = this.props.output0
          }

          this.uniforms.pressure.value = inputFbo.texture
          this.props.output = outputFbo
          super.update()
        }

        return outputFbo
      }
    }

    class Pressure extends ShaderPass {
      constructor(simulationProps) {
        super({
          material: {
            vertexShader: faceVert,
            fragmentShader: pressureFrag,
            uniforms: {
              boundarySpace: { value: simulationProps.boundarySpace },
              pressure: { value: simulationProps.srcPressure.texture },
              velocity: { value: simulationProps.srcVelocity.texture },
              px: { value: simulationProps.cellScale },
              dt: { value: simulationProps.dt },
            },
          },
          output: simulationProps.dst,
        })

        this.init()
      }

      update({ velocity, pressure }) {
        this.uniforms.velocity.value = velocity.texture
        this.uniforms.pressure.value = pressure.texture
        super.update()
      }
    }

    class Simulation {
      constructor(options) {
        this.options = {
          iterationsPoisson: 32,
          iterationsViscous: 32,
          mouseForce: 20,
          resolution: 0.5,
          cursorSize: 100,
          viscous: 30,
          isBounce: false,
          dt: 0.014,
          isViscous: false,
          BFECC: true,
          ...options,
        }

        this.fbos = {
          velocity0: null,
          velocity1: null,
          velocityViscous0: null,
          velocityViscous1: null,
          divergence: null,
          pressure0: null,
          pressure1: null,
        }

        this.fboSize = new THREE.Vector2()
        this.cellScale = new THREE.Vector2()
        this.boundarySpace = new THREE.Vector2()
        this.init()
      }

      init() {
        this.calcSize()
        this.createAllFbo()
        this.createShaderPasses()
      }

      getFloatType() {
        const isIos = /(iPad|iPhone|iPod)/i.test(navigator.userAgent)
        return isIos ? THREE.HalfFloatType : THREE.FloatType
      }

      createAllFbo() {
        const type = this.getFloatType()
        const options = {
          type,
          depthBuffer: false,
          stencilBuffer: false,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          wrapS: THREE.ClampToEdgeWrapping,
          wrapT: THREE.ClampToEdgeWrapping,
        }

        Object.keys(this.fbos).forEach((key) => {
          this.fbos[key] = new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, options)
        })
      }

      createShaderPasses() {
        this.advection = new Advection({
          cellScale: this.cellScale,
          fboSize: this.fboSize,
          dt: this.options.dt,
          src: this.fbos.velocity0,
          dst: this.fbos.velocity1,
        })

        this.externalForce = new ExternalForce({
          cellScale: this.cellScale,
          cursorSize: this.options.cursorSize,
          dst: this.fbos.velocity1,
        })

        this.viscousPass = new Viscous({
          cellScale: this.cellScale,
          boundarySpace: this.boundarySpace,
          viscous: this.options.viscous,
          src: this.fbos.velocity1,
          dst: this.fbos.velocityViscous1,
          dstAlt: this.fbos.velocityViscous0,
          dt: this.options.dt,
        })

        this.divergencePass = new Divergence({
          cellScale: this.cellScale,
          boundarySpace: this.boundarySpace,
          src: this.fbos.velocityViscous0,
          dst: this.fbos.divergence,
          dt: this.options.dt,
        })

        this.poissonPass = new Poisson({
          cellScale: this.cellScale,
          boundarySpace: this.boundarySpace,
          src: this.fbos.divergence,
          dst: this.fbos.pressure1,
          dstAlt: this.fbos.pressure0,
        })

        this.pressurePass = new Pressure({
          cellScale: this.cellScale,
          boundarySpace: this.boundarySpace,
          srcPressure: this.fbos.pressure0,
          srcVelocity: this.fbos.velocityViscous0,
          dst: this.fbos.velocity0,
          dt: this.options.dt,
        })
      }

      calcSize() {
        const width = Math.max(1, Math.round(this.options.resolution * Common.width))
        const height = Math.max(1, Math.round(this.options.resolution * Common.height))
        this.cellScale.set(1 / width, 1 / height)
        this.fboSize.set(width, height)
      }

      resize() {
        this.calcSize()

        Object.values(this.fbos).forEach((fbo) => {
          fbo.setSize(this.fboSize.x, this.fboSize.y)
        })
      }

      update() {
        if (this.options.isBounce) {
          this.boundarySpace.set(0, 0)
        } else {
          this.boundarySpace.copy(this.cellScale)
        }

        this.advection.update({
          dt: this.options.dt,
          isBounce: this.options.isBounce,
          BFECC: this.options.BFECC,
        })

        this.externalForce.update({
          cursorSize: this.options.cursorSize,
          mouseForce: this.options.mouseForce,
          cellScale: this.cellScale,
        })

        let velocity = this.fbos.velocity1

        if (this.options.isViscous) {
          velocity = this.viscousPass.update({
            viscous: this.options.viscous,
            iterations: this.options.iterationsViscous,
            dt: this.options.dt,
          })
        }

        this.divergencePass.update({ velocity })
        const pressure = this.poissonPass.update({ iterations: this.options.iterationsPoisson })
        this.pressurePass.update({ velocity, pressure })
      }
    }

    class Output {
      constructor() {
        this.init()
      }

      init() {
        this.simulation = new Simulation()
        this.scene = new THREE.Scene()
        this.camera = new THREE.Camera()
        this.output = new THREE.Mesh(
          new THREE.PlaneGeometry(2, 2),
          new THREE.RawShaderMaterial({
            vertexShader: faceVert,
            fragmentShader: colorFrag,
            transparent: true,
            depthWrite: false,
            uniforms: {
              velocity: { value: this.simulation.fbos.velocity0.texture },
              boundarySpace: { value: new THREE.Vector2() },
              palette: { value: paletteTexture },
              bgColor: { value: backgroundColor },
            },
          }),
        )
        this.scene.add(this.output)
      }

      resize() {
        this.simulation.resize()
      }

      render() {
        Common.renderer.setRenderTarget(null)
        Common.renderer.render(this.scene, this.camera)
      }

      update() {
        this.simulation.update()
        this.render()
      }
    }

    class WebGLManager {
      constructor(props) {
        this.props = props
        Common.init(props.wrapper)
        Mouse.init(props.wrapper)
        Mouse.autoIntensity = props.autoIntensity
        Mouse.takeoverDuration = props.takeoverDuration
        this.lastUserInteraction = performance.now()
        Mouse.onInteract = () => {
          this.lastUserInteraction = performance.now()
          if (this.autoDriver) {
            this.autoDriver.forceStop()
          }
        }

        this.autoDriver = new AutoDriver(Mouse, this, {
          enabled: props.autoDemo,
          speed: props.autoSpeed,
          resumeDelay: props.autoResumeDelay,
          rampDuration: props.autoRampDuration,
        })

        this.init()
        this.loopHandler = this.loop.bind(this)
        this.resizeHandler = this.resize.bind(this)
        this.visibilityHandler = () => {
          if (document.hidden) {
            this.pause()
          } else if (isVisibleRef.current) {
            this.start()
          }
        }

        window.addEventListener('resize', this.resizeHandler)
        document.addEventListener('visibilitychange', this.visibilityHandler)
        this.running = false
      }

      init() {
        this.props.wrapper.prepend(Common.renderer.domElement)
        this.output = new Output()
      }

      resize() {
        Common.resize()
        this.output.resize()
      }

      render() {
        if (this.autoDriver) {
          this.autoDriver.update()
        }

        Mouse.update()
        Common.update()
        this.output.update()
      }

      loop() {
        if (!this.running) {
          return
        }

        this.render()
        rafRef.current = requestAnimationFrame(this.loopHandler)
      }

      start() {
        if (this.running) {
          return
        }

        this.running = true
        this.loop()
      }

      pause() {
        this.running = false
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
          rafRef.current = null
        }
      }

      dispose() {
        window.removeEventListener('resize', this.resizeHandler)
        document.removeEventListener('visibilitychange', this.visibilityHandler)
        Mouse.dispose()

        if (Common.renderer) {
          const canvas = Common.renderer.domElement
          if (canvas?.parentNode) {
            canvas.parentNode.removeChild(canvas)
          }
          Common.renderer.dispose()
          Common.renderer.forceContextLoss()
        }
      }
    }

    const container = mountRef.current
    container.style.position = container.style.position || 'relative'
    container.style.overflow = container.style.overflow || 'hidden'

    const webgl = new WebGLManager({
      wrapper: container,
      autoDemo,
      autoSpeed,
      autoIntensity,
      takeoverDuration,
      autoResumeDelay,
      autoRampDuration,
    })

    webglRef.current = webgl

    const applyOptionsFromProps = () => {
      if (!webglRef.current) {
        return
      }

      const simulation = webglRef.current.output?.simulation
      if (!simulation) {
        return
      }

      const previousResolution = simulation.options.resolution

      Object.assign(simulation.options, {
        mouseForce,
        cursorSize,
        isViscous,
        viscous,
        iterationsViscous,
        iterationsPoisson,
        dt,
        BFECC,
        resolution,
        isBounce,
      })

      if (resolution !== previousResolution) {
        simulation.resize()
      }
    }

    applyOptionsFromProps()
    webgl.start()

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const isVisible = entry.isIntersecting && entry.intersectionRatio > 0
        isVisibleRef.current = isVisible

        if (!webglRef.current) {
          return
        }

        if (isVisible && !document.hidden) {
          webglRef.current.start()
        } else {
          webglRef.current.pause()
        }
      },
      { threshold: [0, 0.01, 0.1] },
    )

    intersectionObserver.observe(container)
    intersectionObserverRef.current = intersectionObserver

    const resizeObserver = new ResizeObserver(() => {
      if (!webglRef.current) {
        return
      }

      if (resizeRafRef.current) {
        cancelAnimationFrame(resizeRafRef.current)
      }

      resizeRafRef.current = requestAnimationFrame(() => {
        if (webglRef.current) {
          webglRef.current.resize()
        }
      })
    })

    resizeObserver.observe(container)
    resizeObserverRef.current = resizeObserver

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      if (resizeRafRef.current) {
        cancelAnimationFrame(resizeRafRef.current)
      }

      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }

      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect()
      }

      if (webglRef.current) {
        webglRef.current.dispose()
      }

      paletteTexture.dispose()
      webglRef.current = null
      return undefined
    }
  }, [
    BFECC,
    cursorSize,
    dt,
    isBounce,
    isViscous,
    iterationsPoisson,
    iterationsViscous,
    mouseForce,
    resolution,
    viscous,
    colors,
    autoDemo,
    autoSpeed,
    autoIntensity,
    takeoverDuration,
    autoResumeDelay,
    autoRampDuration,
  ])

  useEffect(() => {
    const webgl = webglRef.current
    if (!webgl) {
      return
    }

    const simulation = webgl.output?.simulation
    if (!simulation) {
      return
    }

    const previousResolution = simulation.options.resolution

    Object.assign(simulation.options, {
      mouseForce,
      cursorSize,
      isViscous,
      viscous,
      iterationsViscous,
      iterationsPoisson,
      dt,
      BFECC,
      resolution,
      isBounce,
    })

    if (webgl.autoDriver) {
      webgl.autoDriver.enabled = autoDemo
      webgl.autoDriver.speed = autoSpeed
      webgl.autoDriver.resumeDelay = autoResumeDelay
      webgl.autoDriver.rampDurationMs = autoRampDuration * 1000
      webgl.autoDriver.mouse.autoIntensity = autoIntensity
      webgl.autoDriver.mouse.takeoverDuration = takeoverDuration
    }

    if (resolution !== previousResolution) {
      simulation.resize()
    }
  }, [
    mouseForce,
    cursorSize,
    isViscous,
    viscous,
    iterationsViscous,
    iterationsPoisson,
    dt,
    BFECC,
    resolution,
    isBounce,
    autoDemo,
    autoSpeed,
    autoIntensity,
    takeoverDuration,
    autoResumeDelay,
    autoRampDuration,
  ])

  return <div ref={mountRef} className={`liquid-ether-container ${className}`.trim()} style={style} />
}
