import playIcon from '/assets/play.svg';
import { loadSong } from '../store/actions/station.actions.js'

export function StationPreview({ station }) {
  const { name, stationSubtitle, imgURL } = station;

  function onPlay(ev) {
    ev.stopPropagation()
    loadSong(station.songs[0].id)

  }
  return (
    <section className="station-preview-container">
      <img className="station-preview-img" src={imgURL} alt={name} />
      <div className="play-button-container">
        <button className="play-button" onClick={onPlay}>
          <img className="play" src={playIcon} alt="Play" />
        </button>
      </div>
      <section className='station-description'>
        <a className='station-name-description' title={name}>{name}</a>
        <p className="play-button-title" >{stationSubtitle}</p>
      </section>
    </section>
  )
}
