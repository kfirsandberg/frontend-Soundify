import playIcon from '/assets/play.svg'
import dotIcon from '/assets/dots.svg'
import userIcon from '/assets/user.svg'
import { useState } from 'react'

export function StationHeader({ station }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editedStation, setEditedStation] = useState({
        ...station,
    })
    function onEditStation() {
        setIsModalOpen(true)
    }

    function onCloseModal() {
        setIsModalOpen(false)
    }

    function handleInputChange(event) {
        const { name, value } = event.target
        setEditedStation(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    function handleSave() {
        setIsModalOpen(false)
    }

    const renderStationImage = () => {
        if (station.imgURL === null) {
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-encore-id="icon"
                    role="img"
                    aria-hidden="true"
                    data-testid="track"
                    viewBox="0 0 24 24"
                    className="Svg-sc-ytk21e-0 bneLcE"
                >
                    <path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z" />
                </svg>
            )
        }
        return <img className="playlist-image" src={station.imgURL} alt="playlist image" />
    }

    return (
        <section className="upper-station-details">
            <div className="upper-station-container">
                <button onClick={onEditStation} className="station-img-btn">
                    <div className="station-img">
                        {renderStationImage()}
                        <div className="edit-icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                data-encore-id="icon"
                                role="img"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="Svg-sc-ytk21e-0 bHdpig edit-btn"
                            >
                                <path d="M17.318 1.975a3.329 3.329 0 1 1 4.707 4.707L8.451 20.256c-.49.49-1.082.867-1.735 1.103L2.34 22.94a1 1 0 0 1-1.28-1.28l1.581-4.376a4.726 4.726 0 0 1 1.103-1.735L17.318 1.975zm3.293 1.414a1.329 1.329 0 0 0-1.88 0L5.159 16.963c-.283.283-.5.624-.636 1l-.857 2.372 2.371-.857a2.726 2.726 0 0 0 1.001-.636L20.611 5.268a1.329 1.329 0 0 0 0-1.879z" />
                            </svg>
                            Choose photo
                        </div>
                    </div>
                </button>
                <section className="playlist-details">
                    <span className="playlist-label">Playlist</span>
                    <h2 onClick={onEditStation} className="playlist-title">
                        {station.name}
                    </h2>
                    <div className="playlist-creator">
                        {station.creatorImgURL && (
                            <div className="creator-image-container">
                                <img src={station.creatorImgURL} alt="Creator" className="creator-image" />
                            </div>
                        )}
                        <span className="creator-name">
                            <img src={userIcon} alt="" /> By {station.creatorName || 'user'}
                            <span className="dot">·</span>
                        </span>
                        {/* <span className="saves-count">{station.saves || ''} saves</span> */}
                        <span className="song-counter">{station.songs?.length || 0} songs</span>

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
                    <section className="modal-details">
                        <div className="modal-header">
                            <h2>Edit details</h2>
                            <button onClick={onCloseModal} className="close-modal-btn">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    data-encore-id="icon"
                                    role="img"
                                    aria-label="Close"
                                    aria-hidden="true"
                                    viewBox="0 0 16 16"
                                    class="Svg-sc-ytk21e-0 kcUFwU"
                                >
                                    <path d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06Z" />
                                </svg>
                            </button>
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
                                <button type="button" onClick={handleSave} className="save-btn">
                                    Save
                                </button>
                            </div>
                            <div className="disclaimer">
                                <span>
                                    By proceeding, you agree to give Spotify access to the image you choose to upload.
                                    Please make sure you have the right to upload the image.
                                </span>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </section>
    )
}
