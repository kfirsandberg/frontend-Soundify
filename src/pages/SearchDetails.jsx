import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatTime } from '../services/util.service';
import { loadSong, setIsPlaying, search } from '../store/actions/station.actions.js';
import { stationService } from '../services/station/index.js';
import { removeSong, addSong } from '../store/actions/station.actions.js';
import { useNavigate, useParams } from 'react-router-dom';
import { getArtist } from '../store/actions/station.actions';
import { formatSongDuration } from '../services/station';

export function SearchDetails() {
    const navigate = useNavigate();
    const searchedSongs = useSelector(storeState => storeState.stationModule.searchedSongs);
    const artist = useSelector(storeState => storeState.stationModule.currentArtist);
    const stations = useSelector(storeState => storeState.stationModule.stations);
    const currentStation = useSelector(storeState => storeState.stationModule.currentStation);
    const [currentSong, setCurrentSong] = useState(null);
    const { searchValue } = useParams();
    const contextMenuRef = useRef(null);

    const [contextMenu, setContextMenu] = useState(null);


    useEffect(() => {
        if (!contextMenu) return;
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [contextMenu]);

    useEffect(() => {
        if (!searchedSongs && searchValue) {
            search(searchValue); // טוען את השירים עבור הערך בנתיב
        }
    }, [searchValue, searchedSongs]);

    function onStationClick(station) {
        onLikedSong(currentSong, station);
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
        setCurrentSong(song);
    }

    function handleOutsideClick(event) {
        if (!contextMenu || !contextMenuRef.current) return;
        if (!contextMenuRef.current.contains(event.target)) {
            closeContextMenu();
        }
    }

    function closeContextMenu() {
        setContextMenu(null);
    }

    function handlePlayClick(song) {
        loadSong(song);
        setIsPlaying(true);
    }

    async function onLikedSong(song, station) {
        try {
            let songToCheck = song.added_at ? song.track : song;
            const existingSong = await stationService.isSongOnStation(songToCheck, station);
            if (existingSong) {
                await removeSong(songToCheck, station);
            } else {
                await addSong(songToCheck, station);
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    }

    async function onArtistClick(song) {
        const artistId = song?.artists?.[0]?.id;
        if (artistId) {
            await getArtist(artistId);
            navigate(`/artist/${artistId}`);
        }
    }

    if (!searchedSongs || searchedSongs.length === 0) return null;

    return (
        <section className="search-details">
            <section className='artist-details'>
                <div className='artist'>
                    <h2>Top result</h2>
                    <section className='artist-section'>
                        <img
                            className='artist-img'
                            src={searchedSongs?.artists?.[0]?.images?.[0]?.url || 'default-artist.jpg'}
                            alt={searchedSongs?.artists?.[0]?.name || 'Artist'}
                        />
                        <button className='play-search-btn'>
                            <svg xmlns="http://www.w3.org/2000/svg" data-encore-id="icon" role="img" aria-hidden="true" className="Svg-sc-ytk21e-0 bneLcE zOsKPnD_9x3KJqQCSmAq" viewBox="0 0 24 24">
                                <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" />
                            </svg>
                        </button>
                        <h1 className='artist-name'>{searchedSongs?.artists?.[0]?.name || 'Artist'}</h1>
                        <h2>Artist</h2>
                    </section>
                </div>
            </section>
            <section className="song-list">
                <h2>Songs</h2>
                {searchedSongs?.tracks
                    ?.filter((song) => song?.duration_ms)
                    .slice(0, 4)
                    .map((song) => (
                        <div key={song?._id || song?.id} className="song-item">
                            {/* Song Image */}
                            <div onClick={() => handlePlayClick(song)} className="song-img">
                                <button>
                                    <img
                                        src={song?.album?.images?.[0]?.url || 'default-song.jpg'}
                                        alt={`${song?.name || 'Song'} cover`}
                                    />
                                    <div className="img-overlay">
                                        <div className="play-icon"></div>
                                    </div>
                                </button>
                            </div>

                            {/* Song Details */}
                            <div className="song-details">
                                <span className="song-title">{song?.name || 'Unknown Song'}</span>
                                <span className="song-artist">
                                    {song?.artists?.map((artist, index) => (
                                        <React.Fragment key={artist?.id || index}>
                                            <span
                                                className="artist-name"
                                                onClick={() => onArtistClick(song)}
                                            >
                                                {artist?.name || 'Unknown Artist'}
                                            </span>
                                            {index < song?.artists?.length - 1 && ', '}
                                        </React.Fragment>
                                    ))}
                                </span>
                            </div>

                            {/* Like Button and Duration */}
                            <div className="song-actions">
                                <button
                                    title={
                                        song?.liked
                                            ? 'Remove from liked songs'
                                            : 'Add to liked songs'
                                    }
                                    className="liked-songs-btn"
                                    onClick={(event) => toggleLike(event, song)}
                                >
                                    {song?.liked ? (
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
                                <div className="song-duration">
                                    {formatSongDuration(song?.duration_ms) || '0:00'}
                                </div>
                            </div>
                        </div>
                    ))}
            </section>

            <section className="Featuring-section">
                <h2>Featuring</h2>
                <section className="playlists-section">
                    {searchedSongs?.playlists
                        ?.slice(0, 5)
                        .map((playlist) => (
                            <div key={playlist?.id} className="playlist-container">
                                <section className="playlist-section">
                                    <img
                                        className="playlist-img"
                                        src={playlist?.images?.[0]?.url || 'default-playlist.jpg'}
                                        alt={`${playlist?.name || 'Playlist'} cover`}
                                    />
                                    <button className='play-search-btn'>
                                        <svg xmlns="http://www.w3.org/2000/svg" data-encore-id="icon" role="img" aria-hidden="true" className="Svg-sc-ytk21e-0 bneLcE zOsKPnD_9x3KJqQCSmAq" viewBox="0 0 24 24">
                                            <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" />
                                        </svg>
                                    </button>
                                    <section className='names'>
                                        <h1 className="playlist-name">{playlist?.name || 'Unknown Playlist'}</h1>
                                        <h2 className="playlist-creator">{playlist?.owner?.display_name || 'Unknown Creator'}</h2>
                                    </section>
                                </section>
                            </div>
                        ))}
                </section>
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
                                src={station?.images?.[0]?.url || 'default-thumbnail.jpg'}
                                alt={`${station?.name || 'Station'} thumbnail`}
                                className="station-thumbnail"
                            />
                            <span className='station-add-name'>{station?.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
