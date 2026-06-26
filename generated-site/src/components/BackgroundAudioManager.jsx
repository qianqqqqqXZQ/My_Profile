import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const audioSources = {
  groupA: '/bgm/bgm1.mp3',
  groupB: '/bgm/bgm2.mp3',
}

const interactionEvents = ['pointerdown', 'keydown', 'touchstart']

let sharedAudio = null
let activeGroup = null
let interactionCleanup = null
let mountCount = 0
let destroyTimer = null

function getRouteGroup(pathname) {
  return pathname === '/' || pathname === '/ready' ? 'groupA' : 'groupB'
}

function ensureAudio() {
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

function clearInteractionRecovery() {
  if (interactionCleanup) {
    interactionCleanup()
    interactionCleanup = null
  }
}

function destroyAudio() {
  clearInteractionRecovery()

  if (sharedAudio) {
    sharedAudio.pause()
    sharedAudio.removeAttribute('src')
    sharedAudio.load()
  }

  sharedAudio = null
  activeGroup = null
}

function registerInteractionRecovery(audio) {
  if (typeof window === 'undefined') {
    return
  }

  clearInteractionRecovery()

  const resumePlayback = () => {
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

function playCurrentTrack(audio) {
  audio
    .play()
    .then(() => {
      clearInteractionRecovery()
    })
    .catch(() => {
      registerInteractionRecovery(audio)
    })
}

function BackgroundAudioManager() {
  const location = useLocation()

  useEffect(() => {
    mountCount += 1

    if (destroyTimer) {
      window.clearTimeout(destroyTimer)
      destroyTimer = null
    }

    return () => {
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
  }, [])

  useEffect(() => {
    const audio = ensureAudio()

    if (!audio) {
      return undefined
    }

    const nextGroup = getRouteGroup(location.pathname)
    const nextSource = audioSources[nextGroup]

    if (!audio.src) {
      audio.src = nextSource
      activeGroup = nextGroup
      playCurrentTrack(audio)
      return undefined
    }

    if (activeGroup !== nextGroup) {
      audio.pause()
      audio.src = nextSource
      audio.currentTime = 0
      activeGroup = nextGroup
      playCurrentTrack(audio)
      return undefined
    }

    if (audio.paused) {
      playCurrentTrack(audio)
    }

    return undefined
  }, [location.pathname])

  return null
}

export default BackgroundAudioManager
