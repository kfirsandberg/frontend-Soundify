import playIcon from '../../public/assets/play.svg';
import dotIcon from '../../public/assets/dots.svg';
import userIcon from '../../public/assets/user.svg';

export function StationHeader({ station }) {
    return (
        <section className="upper-station-details">
            <div className="upper-station-container">
                <img className="playlist-image" src={station.imgURL} alt="playlist image" />
                <section className="playlist-details">
                    <span className="spanlaylist-label">Playlist</span>
                    <h2 className="playlist-title">{station.name}</h2>
                    {/* <p className="playlist-description">{station.description}</p> */}

                    <div className="playlist-creator">
                        {station.creatorImgURL && (
                            <img src={station.creatorImgURL} alt="Creator" className="creator-image" />
                        )}
                        <span className="creator-name">
                            <img src={userIcon} alt="" /> By {station.creatorName || "Spotify"}
                        </span>
                        <span className="saves-count">{station.saves || ''} saves</span>
                        <span className="playlist-duration">{station.totalDuration}</span>
                    </div>
                </section>
            </div>
            <div className="playlist-actions">
                <button className="play-button">
                    <img src={playIcon} alt="Play" />
                </button>
                <button className="more-options">
                    <svg src={dotIcon} alt="More options" className="dot-icon" />
                </button>
                <button className="sort-button">Sort</button>
            </div>
        </section>
    );
}
