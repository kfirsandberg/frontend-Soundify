import playIcon from '/assets/play.svg';
import { loadSong } from '../store/actions/station.actions.js'

export function AllStationPreview({ station }) {
  const { name, imgURL } = station;

  function onPlay(ev) {
    ev.stopPropagation()
    
    loadSong(station.tracks[0])

  }
  return (
    <section className="all-station-preview-container">
      <img className="all-station-preview-img" src={station.images[0].url} alt={name} />
      <div className="all-play-button-container">
        <button className="all-play-button" onClick={onPlay}>
          <img className="all-play" src={playIcon} alt="Play" />
        </button>
      </div>
      <h3 className="all-play-button-title" >{name}</h3>
    </section>
  )
}
