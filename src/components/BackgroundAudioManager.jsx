import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  BackgroundAudioContext,
  audioSources,
  decrementAudioMount,
  ensureAudio,
  getActiveGroup,
  getRouteGroup,
  incrementAudioMount,
  playCurrentTrack,
  setActiveGroup,
} from './backgroundAudioStore'

export function BackgroundAudioProvider({ children }) {
  const location = useLocation()
  const [isMuted, setIsMuted] = useState(false)
  const [hasAutoplayBlock, setHasAutoplayBlock] = useState(false)

  useEffect(() => {
    incrementAudioMount()

    return () => {
      decrementAudioMount()
    }
  }, [])

  useEffect(() => {
    const audio = ensureAudio()

    if (!audio) {
      return undefined
    }

    audio.muted = isMuted

    const nextGroup = getRouteGroup(location.pathname)
    const nextSource = audioSources[nextGroup]
    const currentGroup = getActiveGroup()

    if (!audio.src) {
      // Initial mount: attach the route-mapped track once and keep the element alive globally.
      audio.src = nextSource
      setActiveGroup(nextGroup)

      if (!isMuted) {
        void playCurrentTrack(audio).then((didPlay) => {
          setHasAutoplayBlock(!didPlay)
        })
      }

      return undefined
    }

    if (currentGroup !== nextGroup) {
      // Only restart playback when navigation crosses between the two route groups.
      audio.pause()
      audio.src = nextSource
      audio.currentTime = 0
      setActiveGroup(nextGroup)

      if (!isMuted) {
        void playCurrentTrack(audio).then((didPlay) => {
          setHasAutoplayBlock(!didPlay)
        })
      }

      return undefined
    }

    if (!isMuted && hasAutoplayBlock && audio.paused) {
      // A previous play attempt was blocked, so retry when the route effect runs again
      // after the recovery listeners have had a chance to capture user interaction.
      void playCurrentTrack(audio).then((didPlay) => {
        setHasAutoplayBlock(!didPlay)
      })
    }

    return undefined
  }, [hasAutoplayBlock, isMuted, location.pathname])

  const value = useMemo(
    () => ({
      isMuted,
      toggleMute: () => {
        const audio = ensureAudio()

        setIsMuted((current) => {
          const nextMuted = !current

          if (audio) {
            audio.muted = nextMuted

            if (nextMuted) {
              audio.pause()
            } else if (audio.src && audio.paused) {
              void playCurrentTrack(audio).then((didPlay) => {
                setHasAutoplayBlock(!didPlay)
              })
            }
          }

          return nextMuted
        })
      },
    }),
    [isMuted],
  )

  return <BackgroundAudioContext.Provider value={value}>{children}</BackgroundAudioContext.Provider>
}

export default BackgroundAudioProvider
