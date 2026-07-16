import { useContext } from 'react'
import { BackgroundAudioContext } from './backgroundAudioStore'

export function useBackgroundAudio() {
  const context = useContext(BackgroundAudioContext)

  if (!context) {
    throw new Error('useBackgroundAudio must be used within BackgroundAudioProvider')
  }

  return context
}

