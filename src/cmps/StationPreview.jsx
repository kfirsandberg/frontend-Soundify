import playIcon from '/assets/play.svg';
import { loadSong } from '../store/actions/station.actions.js'

export function StationPreview({ station }) {
  const { name, description, images, owner } = station;

  function onPlay(ev) {
    ev.stopPropagation()
    loadSong(station.tracks[0])

  }
  return (
    <section className="station-preview-container">
      <img className="station-preview-img" src={images[0].url} alt={name} />
      <div className="play-button-container">
        <button className="play-button" onClick={onPlay}>
          <img className="play" src={playIcon} alt="Play" />
        </button>
      </div>
      <section className='station-description'>
        <a className='station-name-description' title={name}>{name}</a>
        <p className="play-button-title">{description || owner.display_name}</p>
      </section>
    </section>
  )
}
