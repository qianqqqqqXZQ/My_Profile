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
const clampDpr = () => Math.min(window.devicePixelRatio || 1, 1.25)

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

const createTexture = (image, renderer, colorSpace = THREE.NoColorSpace) => {
  const texture = new THREE.Texture(image)
  texture.colorSpace = colorSpace
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.needsUpdate = true
  return texture
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
        // The source GeoJSON is intentionally detailed. Sampling long rings keeps
        // country outlines readable while avoiding thousands of tiny geometries.
        const step = ring.length > 900 ? 4 : ring.length > 450 ? 3 : ring.length > 220 ? 2 : 1
        const points = ring
          .filter((_, index) => index % step === 0 || index === ring.length - 1)
          .map(([lng, lat]) => latLngToVector3(lat, lng, radius + 0.15))
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
    const positionBuffer = new Float32Array(ARC_TRAIL_LENGTH * 3)
    const colorBuffer = new Float32Array(ARC_TRAIL_LENGTH * 3)
    const positionAttribute = new THREE.BufferAttribute(positionBuffer, 3).setUsage(
      THREE.DynamicDrawUsage,
    )
    const colorAttribute = new THREE.BufferAttribute(colorBuffer, 3).setUsage(
      THREE.DynamicDrawUsage,
    )

    const trailGeometry = new THREE.BufferGeometry()
    trailGeometry.setAttribute('position', positionAttribute)
    trailGeometry.setAttribute('color', colorAttribute)
    trailGeometry.setDrawRange(0, 0)
    trailGeometry.boundingSphere = new THREE.Sphere(
      new THREE.Vector3(0, 0, 0),
      GLOBE_RADIUS * (1 + (arc.arcAlt ?? 0.25) + 0.1),
    )

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
    const trailColor = new THREE.Color(arc.color)

    return {
      arc,
      curve,
      points,
      trail,
      particle,
      pulse,
      offset: index * 380,
      colorAttribute,
      positionAttribute,
      positionBuffer,
      colorBuffer,
      trailColor,
    }
  })

const updateArcTrail = (arcObject, elapsedMs) => {
  const {
    points,
    trail,
    particle,
    pulse,
    offset,
    positionAttribute,
    colorAttribute,
    positionBuffer,
    colorBuffer,
    trailColor,
  } = arcObject
  const totalPoints = points.length
  const progress = ((elapsedMs + offset) % ARC_DURATION) / ARC_DURATION
  const headIndex = Math.max(1, Math.floor(progress * (totalPoints - 1)))
  const startIndex = Math.max(0, headIndex - ARC_TRAIL_LENGTH + 1)
  const visibleCount = headIndex - startIndex + 1

  if (!visibleCount) return

  for (let index = 0; index < visibleCount; index += 1) {
    const point = points[startIndex + index]
    const bufferIndex = index * 3
    const intensity = (index + 1) / visibleCount
    const colorIntensity = 0.25 + intensity * 0.75

    positionBuffer[bufferIndex] = point.x
    positionBuffer[bufferIndex + 1] = point.y
    positionBuffer[bufferIndex + 2] = point.z

    colorBuffer[bufferIndex] = trailColor.r * colorIntensity
    colorBuffer[bufferIndex + 1] = trailColor.g * colorIntensity
    colorBuffer[bufferIndex + 2] = trailColor.b * colorIntensity
  }

  trail.geometry.setDrawRange(0, visibleCount)
  positionAttribute.needsUpdate = true
  colorAttribute.needsUpdate = true

  const headPoint = points[headIndex]
  particle.position.copy(headPoint)
  particle.scale.setScalar(0.95 + Math.sin(elapsedMs * 0.006 + offset * 0.01) * 0.18)
  pulse.position.copy(headPoint)
}

export function createContactGlobeScene({ assets, container, paused = false, onReady }) {
  const scene = new THREE.Scene()
  scene.background = null
  scene.fog = new THREE.FogExp2('#02040a', 0.00125)

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 2000)
  camera.position.set(0, 62, 278)

  const renderer = new THREE.WebGLRenderer({
    antialias: window.innerWidth >= 900,
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

  const earthDayTexture = createTexture(assets.day, renderer, THREE.SRGBColorSpace)
  const earthNightTexture = createTexture(assets.night, renderer, THREE.SRGBColorSpace)
  const earthSpecularTexture = createTexture(assets.specular, renderer)
  const dotTexture = createTexture(assets.dot, renderer, THREE.SRGBColorSpace)

  const sunDirection = new THREE.Vector3(-1.1, 0.42, 0.95).normalize()

  // The earth uses a custom shader so day color, night emission, cloud highlights,
  // and atmospheric rim light can be tuned independently from the rest of the scene.
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64),
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
    new THREE.SphereGeometry(GLOBE_RADIUS * 1.08, 64, 64),
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
  countriesGroup.add(createCountries(assets.countries, GLOBE_RADIUS))
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
  onReady?.()

  return {
    setPaused(nextPaused) {
      shouldPause = nextPaused
    },
    destroy() {
      destroyed = true
      window.cancelAnimationFrame(frameId)
      resizeObserver?.disconnect()
      window.removeEventListener('resize', resize)

      // Dispose all scene-owned GPU resources explicitly because this globe mounts
      // outside React Three Fiber and does not get automatic cleanup.
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
