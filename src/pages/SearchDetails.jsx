import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { formatTime } from '../services/util.service'
import { addSong, removeSong, getSongById } from "../store/actions/likedSongs.actions.js";
import { updateStation } from '../store/actions/station.actions.js'
import { stationLocalService } from '../services/station/station.service.local.js';
import { useNavigate } from 'react-router-dom'

export function SearchDetails() {

    const navigate = useNavigate()
    const searchedSongs = useSelector(storeState => storeState.stationModule.searchedSongs)

    const stations = useSelector(storeState => storeState.stationModule.stations)
    const [currentSong, setCurrentSong] = useState(null);


    const contextMenuRef = useRef(null)

    const menuWidth = contextMenuRef.current?.offsetWidth || 150;
    const menuHeight = contextMenuRef.current?.offsetHeight || 100;


    const [contextMenu, setContextMenu] = useState(null)

    useEffect(() => {
        if (!contextMenu) return
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [contextMenu]);

    useEffect(() => {
        console.log(searchedSongs)

    }, [searchedSongs])

    function onStationClick(station) {
        console.log('Station clicked:', station);
        onLikedSong(currentSong, station)
        closeContextMenu();
    }


    async function toggleLike(ev, song) {
        ev.stopPropagation();

        const menuWidth = 290;
        const menuHeight = 390;

        let x = ev.pageX;
        let y = ev.pageY;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;


        if (x + menuWidth > screenWidth) {
            x = screenWidth - menuWidth;
        }

        if (y + menuHeight > screenHeight) {
            y = screenHeight - menuHeight;
        }

        setContextMenu({ x, y, song });
        setCurrentSong(song)
    }

    function handleOutsideClick(event) {
        if (!contextMenu || !contextMenuRef.current) return;
        if (!contextMenuRef.current.contains(event.target)) {
            console.log('Clicked outside, closing context menu.');
            closeContextMenu();
        }
    }


    function closeContextMenu() {
        setContextMenu(null)
    }


    async function onLikedSong(song, station) {
        const stationName = station.name
        console.log(song, stationName)
        try {
            const existingSong = await getSongById(song);

            if (existingSong) {
                await removeSong(song, stationName);
                console.log(`Song removed from ${stationName}`);
                station.songs = station.songs.filter(s => s._id !== song._id);

            } else {
                await addSong(song, stationName);
                console.log(`Song added to ${stationName}`);
                const newSong = stationLocalService.ensureSong(song)
                station.songs.push(newSong);
            }

            await updateStation(station);
        } catch (error) {
            console.error('Error toggling like:', error);
        }

    }


    if (!searchedSongs || searchedSongs.length === 0) return

    return (
        <section className="search-details">
            <h2>Songs</h2>
            <section className="song-list">
                {searchedSongs.tracks
                    ?.filter((song) => song.duration_ms)
                    .map((song) => (
                        <div key={song._id} className="song-item">
                            {/* Song Image */}
                            <div className="song-img">
                                <button>
                                    <img
                                        src={song.album.images[0]?.url}
                                        alt={`${song.name} cover`}
                                    />
                                    <div className="img-overlay">
                                        <div className="play-icon"></div>
                                    </div>
                                </button>
                            </div>

                            {/* Song Details */}
                            <div className="song-details">
                                <span className="song-title">{song.name}</span>
                                <span className="song-artist">
                                    {song.artists.map((artist, index) => (
                                        <React.Fragment key={artist.id}>
                                            <span
                                                className="artist-name"
                                                onClick={() => navigate(`/artist/${artist.id}`)}
                                            >
                                                {artist.name}
                                            </span>
                                            {index < song.artists.length - 1 && ', '}
                                        </React.Fragment>
                                    ))}
                                </span>

                            </div>

                            {/* Like Button and Duration */}
                            <div className="song-actions">
                                <button
                                    title={song.liked ? 'Remove from liked songs' : 'Add to liked songs'}
                                    className="liked-songs-btn"
                                    onClick={(event) => toggleLike(event, song)}
                                >
                                    {song.liked ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            role="img"
                                            aria-hidden="true"
                                            viewBox="0 0 16 16"
                                            className="liked-icon"
                                        >
                                            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            role="img"
                                            aria-hidden="true"
                                            viewBox="0 0 24 24"
                                            className="not-liked-icon"
                                        >
                                            <path d="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z" />
                                            <path d="M17.999 12a1 1 0 0 1-1 1h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0v4h4a1 1 0 0 1 1 1z" />
                                        </svg>
                                    )}
                                </button>
                                <div className="song-duration">{formatTime(song.duration_ms)}</div>
                            </div>
                        </div>
                    ))}
            </section>



            {contextMenu && (
                <ul
                    className="add-stations-menu"
                    ref={contextMenuRef}
                    style={{
                        position: 'absolute',
                        top: `${contextMenu.y}px`,
                        left: `${contextMenu.x}px`,
                        zIndex: 100,
                    }}
                >
                    <span className='add-to-playlist'>Add to playlist</span>

                    {stations.map((station) => (
                        <li className='add-station' key={station._id} onClick={() => onStationClick(station)}>
                            <img
                                src={station.images[0].url || 'default-thumbnail.jpg'}
                                alt={`${station.name} thumbnail`}
                                className="station-thumbnail"
                            />
                            <span className='station-add-name'>{station.name}</span>
                        </li>
                    ))}
                </ul>
            )}


        </section>
    );
}