import playIcon from '../../public/assets/play.svg';
import { loadSong } from '../store/actions/station.actions.js'

export function StationPreview({ station }) {
  const { name, imgURL } = station;

  function onPlay(ev) {
    ev.stopPropagation()

    loadSong(station.songs[0].id)

  }
  return (
    <section className="station-preview">
      <img src={imgURL} alt={name} />
      <div className="play-button-container">
        <button className="play-button"><img className='play' src={playIcon} onClick={onPlay} /></button>
      </div>
      <h3>{name}</h3>
    </section>
  );
}
