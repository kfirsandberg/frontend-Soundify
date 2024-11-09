import playIcon from '../../public/assets/play.svg';

export function StationPreview({ station }) {
    const { name, imgURL } = station;
  
    return (
      <section className="station-preview">
        <img src={imgURL} alt={name} />
        <div className="play-button-container">
          <button className="play-button"><img src={playIcon} alt="" /></button>
        </div>
        <h3>{name}</h3>
      </section>
    );
  }
  