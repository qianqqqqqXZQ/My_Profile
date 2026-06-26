import { createContext } from 'react'

export const audioSources = {
  groupA: '/bgm/bgm1.mp3',
  groupB: '/bgm/bgm2.mp3',
}

export const interactionEvents = ['pointerdown', 'keydown', 'touchstart']

export const BackgroundAudioContext = createContext(null)

let sharedAudio = null
let activeGroup = null
let mountCount = 0
let destroyTimer = null
let interactionCleanup = null

export function getRouteGroup(pathname) {
  return pathname === '/' || pathname === '/ready' ? 'groupA' : 'groupB'
}

export function ensureAudio() {
  if (typeof window === 'undefined') {
    return null
  }

  if (!sharedAudio) {
    sharedAudio = new Audio()
    sharedAudio.loop = true
    sharedAudio.preload = 'auto'
  }

  return sharedAudio
}

export function clearInteractionRecovery() {
  if (interactionCleanup) {
    interactionCleanup()
    interactionCleanup = null
  }
}

export function destroyAudio() {
  clearInteractionRecovery()

  if (sharedAudio) {
    sharedAudio.pause()
    sharedAudio.removeAttribute('src')
    sharedAudio.load()
  }

  sharedAudio = null
  activeGroup = null
}

export function registerInteractionRecovery(audio) {
  if (typeof window === 'undefined') {
    return
  }

  clearInteractionRecovery()

  const resumePlayback = () => {
    if (audio.muted) {
      clearInteractionRecovery()
      return
    }

    audio
      .play()
      .then(() => {
        clearInteractionRecovery()
      })
      .catch(() => {})
  }

  interactionEvents.forEach((eventName) => {
    window.addEventListener(eventName, resumePlayback, { passive: true })
  })

  interactionCleanup = () => {
    interactionEvents.forEach((eventName) => {
      window.removeEventListener(eventName, resumePlayback)
    })
  }
}

export function playCurrentTrack(audio) {
  if (audio.muted) {
    return Promise.resolve(false)
  }

  return audio.play().then(
    () => {
      clearInteractionRecovery()
      return true
    },
    () => {
      registerInteractionRecovery(audio)
      return false
    },
  )
}

export function incrementAudioMount() {
  mountCount += 1

  if (destroyTimer) {
    window.clearTimeout(destroyTimer)
    destroyTimer = null
  }
}

export function decrementAudioMount() {
  mountCount = Math.max(0, mountCount - 1)
  clearInteractionRecovery()

  if (mountCount === 0 && typeof window !== 'undefined') {
    destroyTimer = window.setTimeout(() => {
      if (mountCount === 0) {
        destroyAudio()
      }
      destroyTimer = null
    }, 0)
  }
}

export function getActiveGroup() {
  return activeGroup
}

export function setActiveGroup(group) {
  activeGroup = group
}

