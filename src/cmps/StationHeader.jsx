import playIcon from '../../public/assets/play.svg';
import dotIcon from '../../public/assets/dots.svg';
import userIcon from '../../public/assets/user.svg';
import { useState } from "react";

export function StationHeader({ station }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editedStation, setEditedStation] = useState({
        ...station
    })
    function onEditStation() {
        setIsModalOpen(true)
    }

    function onCloseModal() {
        setIsModalOpen(false)
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setEditedStation(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function handleSave() {
        console.log("Saved Station:", editedStation);
        setIsModalOpen(false);
    }

    const renderStationImage = () => {
        if (station.imgURL === null) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg"
                    data-encore-id="icon"
                    role="img"
                    aria-hidden="true"
                    data-testid="track"
                    viewBox="0 0 24 24"
                    className="Svg-sc-ytk21e-0 bneLcE">
                    <path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z" /></svg>
            )
        }
        return <img className="playlist-image" src={station.imgURL} alt="playlist image" />
    }

    return (
        <section className="upper-station-details">
            <div className="upper-station-container">
                <button onClick={onEditStation} className='station-img-btn'>
                    <div className='station-img'>
                        {renderStationImage()}
                    </div>
                </button>
                <section className="playlist-details">
                    <span className="playlist-label">Playlist</span>
                    <h2 onClick={onEditStation} className="playlist-title">{station.name}</h2>
                    <div className="playlist-creator">
                        {station.creatorImgURL && (
                            <div className="creator-image-container">
                                <img src={station.creatorImgURL} alt="Creator" className="creator-image" />
                            </div>
                        )}
                        <span className="creator-name">
                            <img src={userIcon} alt="" /> By {station.creatorName || "user"}
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
                    <img src={dotIcon} alt="More options" className="dot-icon" />
                </button>
                <button className="sort-button">Sort</button>
            </div>

            {isModalOpen && (
    <div className="modal-overlay">
        <section className='modal-details'>
            <div className='modal-header'>
                <h2>Edit details</h2>
                <button onClick={onCloseModal} className="close-modal-btn">x</button>
            </div>

            <form className="edit-form">
                <div className="album-image">
                    <img src={station.imgURL} alt="" />
                </div>
                <div className="form-group title">
                    <input
                        type="text"
                        name="name"
                        value={editedStation.name || ''}
                        onChange={handleInputChange}
                        placeholder="Enter Station Name"
                    />
                </div>
                <div className="form-group description">
                    <textarea
                        name="description"
                        value={editedStation.description || ''}
                        onChange={handleInputChange}
                        placeholder="Add an optional description"
                    />
                </div>
                <div className="form-footer save-button">
                    <button type="button" onClick={handleSave} className="save-btn">Save</button>
                </div>
                <div className="disclaimer">
                    <span>By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.</span>
                </div>
            </form>
        </section>
    </div>

            )}

        </section>
    )
}
