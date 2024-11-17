import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { formatTime } from '../services/util.service'
import { addSong, removeSong, getSongById } from "../store/actions/likedSongs.actions.js";
import { loadSong, setIsPlaying, updateStation, loadStationByName, addStation } from '../store/actions/station.actions.js'
import { stationLocalService } from '../services/station/station.service.local.js'; 

export function SearchDetails() {
    const searchedSongs = useSelector(storeState => storeState.stationModule.searchedSongs)

    useEffect(() => {

        // console.log('searchedSongs:', searchedSongs)

    }, [searchedSongs])

    async function toggleLike(song, stationName = 'Liked Songs') {
        try {
            const existingSong = await getSongById(song.id);
            let likedSongsStation = await loadStationByName(stationName);

            if (!likedSongsStation) {
                console.log(`Station ${stationName} does not exist. Creating it...`);
                const newStation = { name: stationName };
                likedSongsStation = await addStation(newStation);
            }

            if (existingSong) {
                await removeSong(song, stationName);
                console.log(`Song removed from ${stationName}`);
                likedSongsStation.songs = likedSongsStation.songs.filter(s => s.id !== song.id);

            } else {
                await addSong(song, stationName);
                console.log(`Song added to ${stationName}`);
                const newSong = stationLocalService.ensureSong(song)
                likedSongsStation.songs.push(newSong);
            }

            await updateStation(likedSongsStation);
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    }


    if (!searchedSongs || searchedSongs.length === 0) return

    return (
        <section className="search-details">
            <h2>Songs</h2>
            <section className="song-list">
                {searchedSongs
                    .filter(song => song.duration)
                    .map(song => (
                        <div
                            key={song.id}
                            className="song-item"
                        >
                            {/* Song Image */}
                            <div className="song-img" >
                                <button >
                                    <img
                                        src={song.thumbnails[0]?.url}
                                        alt={`${song.title} cover`}
                                    />
                                    <div className="img-overlay">
                                        <div className="play-icon"></div>
                                    </div>
                                </button>
                            </div>

                            {/* Song Details */}
                            <div className="song-details" >
                                <span
                                    className="song-title"
                                >
                                    {song.title}
                                </span>
                                <span
                                    className="song-artist"
                                >
                                    {song.artist}
                                </span>
                            </div>

                            {/* Like Button */}
                            <button
                                title={song.liked ? 'Remove from liked songs' : 'Add to liked songs'}
                                className="liked-songs-btn"
                                onClick={() => toggleLike(song)}
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

                            {/* Song Duration */}
                            <div
                                className="song-duration"
                            >
                                {formatTime(song.duration)}
                            </div>
                        </div>
                    ))}
            </section>
        </section>
    )
}
