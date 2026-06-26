import { useBackgroundAudio } from './useBackgroundAudio'

function MuteToggleButton() {
  const { isMuted, toggleMute } = useBackgroundAudio()

  return (
    <button
      type="button"
      className={`global-mute-toggle${isMuted ? ' is-muted' : ''}`}
      onClick={toggleMute}
      aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      aria-pressed={isMuted}
      title={isMuted ? 'Unmute' : 'Mute'}
    >
      <span aria-hidden="true" className="global-mute-icon">
        {isMuted ? 'M' : 'S'}
      </span>
    </button>
  )
}

export default MuteToggleButton
