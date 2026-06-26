import * as THREE from 'three'

import { contactGlobeArcs, contactGlobePoints } from './contact-globeData'

const atmosphereVertexShader = /* glsl */ `
  varying vec3 vertexNormal;
  varying vec3 vPosition;

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vertexNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
    vPosition = modelPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
  }
`

const atmosphereFragmentShader = /* glsl */ `
  uniform vec3 uSunDirection;
  uniform vec3 uAtmosphereDayColor;
  uniform vec3 uAtmosphereTwilightColor;
  varying vec3 vertexNormal;
  varying vec3 vPosition;

  void main() {
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vertexNormal);
    float sunOrientation = dot(uSunDirection, normal);
    float atmosphereDayMix = smoothstep(-0.5, 1.0, sunOrientation);
    vec3 atmosphereColor = mix(uAtmosphereTwilightColor, uAtmosphereDayColor, atmosphereDayMix);
    float edgeAlpha = dot(viewDirection, normal);
    edgeAlpha = smoothstep(0.0, 0.5, edgeAlpha);
    float dayAlpha = smoothstep(-0.5, 0.0, sunOrientation);
    float alpha = edgeAlpha * dayAlpha;
    vec3 color = atmosphereColor + atmosphereColor * atmosphereDayMix;
    gl_FragColor = vec4(color, alpha);
  }
`

const earthVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vertexNormal;
  varying vec3 vPosition;

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
    vUv = uv;
    vertexNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
    vPosition = modelPosition.xyz;
  }
`

const earthFragmentShader = /* glsl */ `
  uniform sampler2D uDayTexture;
  uniform sampler2D uNightTexture;
  uniform sampler2D uSpecularCloudsTexture;
  uniform vec3 uSunDirection;
  uniform vec3 uAtmosphereDayColor;
  uniform vec3 uAtmosphereTwilightColor;
  uniform float uNightBoost;
  uniform float uAtmosphereStrength;
  uniform float uSpecularStrength;

  varying vec2 vUv;
  varying vec3 vertexNormal;
  varying vec3 vPosition;

  void main() {
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vertexNormal);
    float sunOrientation = dot(uSunDirection, normal);
    float dayMix = smoothstep(-0.18, 0.42, sunOrientation);
    vec3 dayColor = texture2D(uDayTexture, vUv).rgb;
    vec3 nightColor = texture2D(uNightTexture, vUv).rgb;
    nightColor *= uNightBoost;
    vec3 color = mix(nightColor, dayColor, dayMix);

    vec2 specularCloudsColor = texture2D(uSpecularCloudsTexture, vUv).rg;
    float cloudsMix = smoothstep(0.42, 0.98, specularCloudsColor.g) * dayMix;
    color = mix(color, vec3(1.0), cloudsMix * 0.82);

    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = pow(fresnel, 2.0);
    float rimGlow = pow(fresnel, 2.6);

    float atmosphereDayMix = smoothstep(-0.5, 1.0, sunOrientation);
    vec3 atmosphereColor = mix(uAtmosphereTwilightColor, uAtmosphereDayColor, atmosphereDayMix);
    color = mix(color, atmosphereColor, fresnel * atmosphereDayMix * uAtmosphereStrength);
    color += atmosphereColor * rimGlow * 0.18 * uAtmosphereStrength;

    vec3 reflectionDirection = reflect(-uSunDirection, normal);
    float specular = -dot(reflectionDirection, viewDirection);
    specular = max(specular, 0.0);
    specular = pow(specular, 32.0);
    specular *= specularCloudsColor.r * uSpecularStrength;

    vec3 specularColor = mix(vec3(1.0), atmosphereColor, fresnel);
    color += specular * specularColor;

    gl_FragColor = vec4(color, 1.0);
  }
`

const GLOBE_RADIUS = 100
const ARC_DURATION = 2600
const ARC_TRAIL_LENGTH = 22
const POINT_TEXTURE = '/contact-globe/dot.png'
const EARTH_DAY_TEXTURE = '/contact-globe/day.jpg'
const EARTH_NIGHT_TEXTURE = '/contact-globe/night.jpg'
const EARTH_SPECULAR_TEXTURE = '/contact-globe/specularClouds.jpg'
const COUNTRIES_URL = '/contact-globe/globe.json'

const clampDpr = () => Math.min(window.devicePixelRatio || 1, 1.6)

const latLngToVector3 = (lat, lng, radius) => {
  const phi = ((90 - lat) * Math.PI) / 180
  const theta = ((lng + 180) * Math.PI) / 180

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

// Lift the midpoint away from the globe so each route reads as a glowing travel arc.
const createCurve = (start, end, arcAltitude = 0.25) => {
  const mid = start.clone().add(end).multiplyScalar(0.5)
  const elevation = mid.normalize().multiplyScalar(start.length() * (1 + arcAltitude))
  return new THREE.QuadraticBezierCurve3(start, elevation, end)
}

const setTextureQuality = (texture, renderer) => {
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.needsUpdate = true
}

const createCountries = (countriesData, radius) => {
  const group = new THREE.Group()
  const material = new THREE.LineBasicMaterial({
    color: '#7df9ff',
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
  })

  for (const feature of countriesData.features ?? []) {
    const geometryType = feature.geometry?.type
    const coordinates = feature.geometry?.coordinates
    if (!geometryType || !coordinates) continue

    const polygons = geometryType === 'Polygon' ? [coordinates] : coordinates
    for (const polygon of polygons) {
      for (const ring of polygon) {
        if (!Array.isArray(ring) || ring.length < 2) continue
        const points = ring.map(([lng, lat]) => latLngToVector3(lat, lng, radius + 0.15))
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        group.add(new THREE.LineLoop(geometry, material))
      }
    }
  }

  return group
}

const createPointCloud = (pointsData, texture) => {
  const group = new THREE.Group()

  for (const point of pointsData) {
    const basePosition = latLngToVector3(point.lat, point.lng, GLOBE_RADIUS + 0.35)
    const dotMaterial = new THREE.SpriteMaterial({
      map: texture,
      color: point.color,
      transparent: true,
      opacity: 0.82,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const dot = new THREE.Sprite(dotMaterial)
    dot.position.copy(basePosition)
    dot.scale.setScalar(point.size * 3.4)
    group.add(dot)

    const pulseGeometry = new THREE.RingGeometry(0.9, 1.25, 48)
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: point.color,
      transparent: true,
      opacity: 0.38,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial)
    pulse.position.copy(latLngToVector3(point.lat, point.lng, GLOBE_RADIUS + 0.6))
    pulse.lookAt(pulse.position.clone().multiplyScalar(2))
    pulse.rotation.z = Math.random() * Math.PI
    pulse.userData = {
      originScale: 1,
      speed: 0.55 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      baseOpacity: 0.22 + Math.random() * 0.16,
    }
    group.add(pulse)
  }

  return group
}

const createArcObjects = (arcsData) =>
  arcsData.map((arc, index) => {
    const start = latLngToVector3(arc.startLat, arc.startLng, GLOBE_RADIUS + 0.2)
    const end = latLngToVector3(arc.endLat, arc.endLng, GLOBE_RADIUS + 0.2)
    const curve = createCurve(start, end, arc.arcAlt)
    const points = curve.getPoints(140)

    const trailGeometry = new THREE.BufferGeometry()
    trailGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(0), 3))
    trailGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(0), 3))

    const trailMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const trail = new THREE.Line(trailGeometry, trailMaterial)

    const particle = new THREE.Mesh(
      new THREE.SphereGeometry(0.85, 18, 18),
      new THREE.MeshBasicMaterial({
        color: arc.color,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    )

    const pulse = new THREE.PointLight(arc.color, 0.9, 36, 2.4)

    return {
      arc,
      curve,
      points,
      trail,
      particle,
      pulse,
      offset: index * 380,
      positionBuffer: new Float32Array(ARC_TRAIL_LENGTH * 3),
      colorBuffer: new Float32Array(ARC_TRAIL_LENGTH * 3),
    }
  })

const updateArcTrail = (arcObject, elapsedMs) => {
  const { points, trail, particle, pulse, offset, positionBuffer, colorBuffer } = arcObject
  const totalPoints = points.length
  const progress = ((elapsedMs + offset) % ARC_DURATION) / ARC_DURATION
  const headIndex = Math.max(1, Math.floor(progress * (totalPoints - 1)))
  const startIndex = Math.max(0, headIndex - ARC_TRAIL_LENGTH + 1)
  const visiblePoints = points.slice(startIndex, headIndex + 1)
  const visibleCount = visiblePoints.length

  if (!visibleCount) return

  for (let index = 0; index < visibleCount; index += 1) {
    const point = visiblePoints[index]
    const bufferIndex = index * 3
    const intensity = (index + 1) / visibleCount

    positionBuffer[bufferIndex] = point.x
    positionBuffer[bufferIndex + 1] = point.y
    positionBuffer[bufferIndex + 2] = point.z

    const color = new THREE.Color(arcObject.arc.color).multiplyScalar(0.25 + intensity * 0.75)
    colorBuffer[bufferIndex] = color.r
    colorBuffer[bufferIndex + 1] = color.g
    colorBuffer[bufferIndex + 2] = color.b
  }

  trail.geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positionBuffer.slice(0, visibleCount * 3), 3),
  )
  trail.geometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colorBuffer.slice(0, visibleCount * 3), 3),
  )
  trail.geometry.computeBoundingSphere()

  const headPoint = points[headIndex]
  particle.position.copy(headPoint)
  particle.scale.setScalar(0.95 + Math.sin(elapsedMs * 0.006 + offset * 0.01) * 0.18)
  pulse.position.copy(headPoint)
}

export function createContactGlobeScene({ container, paused = false }) {
  const scene = new THREE.Scene()
  scene.background = null
  scene.fog = new THREE.FogExp2('#02040a', 0.00125)

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 2000)
  camera.position.set(0, 62, 278)

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(clampDpr())
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  renderer.domElement.style.display = 'block'
  container.appendChild(renderer.domElement)

  const ambientLight = new THREE.AmbientLight('#d6ddff', 1.7)
  const keyLight = new THREE.DirectionalLight('#7fd7ff', 4.6)
  keyLight.position.set(-210, 145, 180)
  const rimLight = new THREE.DirectionalLight('#9fffe6', 1.8)
  rimLight.position.set(190, -40, -135)
  const fillLight = new THREE.PointLight('#4e6dff', 1.4, 900, 2)
  fillLight.position.set(0, 120, 230)
  scene.add(ambientLight, keyLight, rimLight, fillLight)

  const globeRoot = new THREE.Group()
  globeRoot.rotation.x = THREE.MathUtils.degToRad(13)
  globeRoot.rotation.z = THREE.MathUtils.degToRad(-18)
  scene.add(globeRoot)

  const textureLoader = new THREE.TextureLoader()
  const earthDayTexture = textureLoader.load(EARTH_DAY_TEXTURE)
  const earthNightTexture = textureLoader.load(EARTH_NIGHT_TEXTURE)
  const earthSpecularTexture = textureLoader.load(EARTH_SPECULAR_TEXTURE)
  const dotTexture = textureLoader.load(POINT_TEXTURE)
  setTextureQuality(earthDayTexture, renderer)
  setTextureQuality(earthNightTexture, renderer)
  earthSpecularTexture.anisotropy = renderer.capabilities.getMaxAnisotropy()
  earthSpecularTexture.wrapS = THREE.ClampToEdgeWrapping
  earthSpecularTexture.wrapT = THREE.ClampToEdgeWrapping
  earthSpecularTexture.needsUpdate = true

  const sunDirection = new THREE.Vector3(-1.1, 0.42, 0.95).normalize()

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_RADIUS, 96, 96),
    new THREE.ShaderMaterial({
      uniforms: {
        uDayTexture: { value: earthDayTexture },
        uNightTexture: { value: earthNightTexture },
        uSpecularCloudsTexture: { value: earthSpecularTexture },
        uSunDirection: { value: sunDirection },
        uAtmosphereDayColor: { value: new THREE.Color('#8be7ff') },
        uAtmosphereTwilightColor: { value: new THREE.Color('#4b59c7') },
        uNightBoost: { value: 1.48 },
        uAtmosphereStrength: { value: 1.2 },
        uSpecularStrength: { value: 1.18 },
      },
      vertexShader: earthVertexShader,
      fragmentShader: earthFragmentShader,
      transparent: true,
      toneMapped: true,
    }),
  )
  globeRoot.add(earth)

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_RADIUS * 1.08, 96, 96),
    new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        uSunDirection: { value: sunDirection },
        uAtmosphereDayColor: { value: new THREE.Color('#7ee5ff') },
        uAtmosphereTwilightColor: { value: new THREE.Color('#6873ff') },
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    }),
  )
  globeRoot.add(atmosphere)
  const countriesGroup = new THREE.Group()
  globeRoot.add(countriesGroup)

  const pointGroup = createPointCloud(contactGlobePoints, dotTexture)
  globeRoot.add(pointGroup)

  const arcsGroup = new THREE.Group()
  const arcObjects = createArcObjects(contactGlobeArcs)
  for (const arcObject of arcObjects) {
    arcsGroup.add(arcObject.trail, arcObject.particle, arcObject.pulse)
  }
  globeRoot.add(arcsGroup)

  const starGeometry = new THREE.BufferGeometry()
  const starCount = 320
  const starPositions = new Float32Array(starCount * 3)
  for (let index = 0; index < starCount; index += 1) {
    const radius = 360 + Math.random() * 200
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    starPositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
    starPositions[index * 3 + 1] = radius * Math.cos(phi)
    starPositions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
  }
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
  const stars = new THREE.Points(
    starGeometry,
    new THREE.PointsMaterial({
      color: '#d4e8ff',
      size: 1.7,
      transparent: true,
      opacity: 0.52,
      depthWrite: false,
    }),
  )
  scene.add(stars)

  let shouldPause = paused
  let frameId = 0
  let destroyed = false
  const clock = new THREE.Clock()

  const resize = () => {
    const width = container.clientWidth
    const height = container.clientHeight
    if (!width || !height) return

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
    renderer.setPixelRatio(clampDpr())
  }

  const resizeObserver =
    typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => {
          resize()
        })
      : null

  resizeObserver?.observe(container)
  window.addEventListener('resize', resize)
  resize()

  fetch(COUNTRIES_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load countries data: ${response.status}`)
      }
      return response.json()
    })
    .then((countriesData) => {
      if (destroyed) {
        return
      }
      const countriesLines = createCountries(countriesData, GLOBE_RADIUS)
      countriesGroup.add(countriesLines)
    })
    .catch(() => {
      // Keep the hero functional even if the auxiliary country-outline data fails to load.
    })

  const render = () => {
    if (destroyed) return

    frameId = window.requestAnimationFrame(render)
    if (shouldPause) return

    const delta = clock.getDelta()
    const elapsedMs = clock.elapsedTime * 1000

    // Rotate the major layers at slightly different speeds so the scene feels alive
    // without introducing camera motion that could hurt readability.
    globeRoot.rotation.y += delta * 0.135
    countriesGroup.rotation.y += delta * 0.024
    stars.rotation.y -= delta * 0.012

    for (const child of pointGroup.children) {
      if (child.isMesh && child.userData.originScale) {
        const scale =
          child.userData.originScale +
          Math.sin(elapsedMs * 0.001 * child.userData.speed + child.userData.phase) * 0.24
        child.scale.setScalar(scale)
        child.material.opacity =
          child.userData.baseOpacity +
          Math.sin(elapsedMs * 0.0015 + child.userData.phase) * 0.08
      }
    }

    for (const arcObject of arcObjects) {
      updateArcTrail(arcObject, elapsedMs)
    }

    renderer.render(scene, camera)
  }

  render()

  return {
    setPaused(nextPaused) {
      shouldPause = nextPaused
    },
    destroy() {
      destroyed = true
      window.cancelAnimationFrame(frameId)
      resizeObserver?.disconnect()
      window.removeEventListener('resize', resize)

      scene.traverse((child) => {
        if (child.geometry) {
          child.geometry.dispose()
        }
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material?.dispose?.())
          } else {
            child.material.dispose?.()
          }
        }
      })

      earthDayTexture.dispose()
      earthNightTexture.dispose()
      earthSpecularTexture.dispose()
      dotTexture.dispose()
      renderer.dispose()
      container.replaceChildren()
    },
  }
}
