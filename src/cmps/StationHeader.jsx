import { useState } from 'react';
import userIcon from '../../public/assets/user.svg';
import { StationEdit } from './StationEdit';

export function StationHeader({ station }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedImgURL, setUpdatedImgURL] = useState(station.imgURL);
    const [openFileUpload, setOpenFileUpload] = useState(false);

    function onEditStation() {
        setOpenFileUpload(false);
        setIsModalOpen(true);
    }

    function onImageClick() {
        setOpenFileUpload(true);
        setIsModalOpen(true);
    }

    function onCloseModal() {
        setIsModalOpen(false);
    }

    function handleImageUpload(url) {
        setUpdatedImgURL(url);
    }

    return (
        <section className="station-header">
                <div className="station-image">
                    <img
                        src={station.imgURL || userIcon}
                        onClick={onImageClick}
                        alt="Station"
                    />
                    <div className="overlay" />
                    {/* <button onClick={onEditStation} className="edit-icon-button">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            data-encore-id="icon"
                            role="img" aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="Svg-sc-ytk21e-0 bHdpig">
                            <path d="M17.318 1.975a3.329 3.329 0 1 1 4.707 4.707L8.451 20.256c-.49.49-1.082.867-1.735 1.103L2.34 22.94a1 1 0 0 1-1.28-1.28l1.581-4.376a4.726 4.726 0 0 1 1.103-1.735L17.318 1.975zm3.293 1.414a1.329 1.329 0 0 0-1.88 0L5.159 16.963c-.283.283-.5.624-.636 1l-.857 2.372 2.371-.857a2.726 2.726 0 0 0 1.001-.636L20.611 5.268a1.329 1.329 0 0 0 0-1.879z" /></svg>
                            Choose photo
                    </button> */}
                </div>
                <div className="playlist-info">
                    <p>Playlist</p>
                    <span className="playlist-title" onClick={onEditStation}>
                        {station.name}
                    </span>
                    <div className="creator-info">
                        <img
                            src={station.creatorImgURL || userIcon}
                            alt="Creator"
                            className="avatar"
                        />
                        <span>{station.creatorName || 'User'}</span>
                        <span>
                            • {station.songs?.length || 0} {station.songs?.length === 1 ? 'song' : 'songs'}
                        </span>
                        <span>{station.totalDuration}</span>
                    </div>
                </div>
            </section>
    );
}
