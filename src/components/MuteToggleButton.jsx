import musicIcon from '../assets/audio-icons/music.png'
import muteIcon from '../assets/audio-icons/mute.png'
import { useBackgroundAudio } from './useBackgroundAudio'

function MuteToggleButton() {
  const { isMuted, toggleMute } = useBackgroundAudio()
  const iconSrc = isMuted ? muteIcon : musicIcon
  const iconAlt = isMuted ? 'Muted' : 'Music playing'

  return (
    <button
      type="button"
      className={`global-mute-toggle${isMuted ? ' is-muted' : ''}`}
      onClick={toggleMute}
      aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      aria-pressed={isMuted}
      title={isMuted ? 'Unmute' : 'Mute'}
    >
      <img aria-hidden="true" className="global-mute-icon" src={iconSrc} alt={iconAlt} />
    </button>
  )
}

export default MuteToggleButton
