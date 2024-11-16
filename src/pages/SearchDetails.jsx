import React from 'react'
import { useSelector } from 'react-redux'

export function SearchDetails() {
    const searchedSongs = useSelector(state => state.songModule.searchedSongs)

    if (!searchedSongs || searchedSongs.length === 0) return

    return (
        <section className="search-details">
            <h2>Songs</h2>
            <ul className="song-list">
                {searchedSongs.map(song => (
                    <li
                        key={song.id}
                        className="song-item"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px 0',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        {/* Song Image */}
                        <div className="song-img" style={{ marginRight: '10px', cursor: 'pointer' }}>
                            <button style={{ border: 'none', background: 'none', padding: 0 }}>
                                <img
                                    src={song.imgURL}
                                    alt={`${song.title} cover`}
                                    style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover' }}
                                />
                            </button>
                        </div>

                        {/* Song Details */}
                        <div className="song-details" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <span
                                className="song-title"
                                style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                {song.title}
                            </span>
                            <span
                                className="song-artist"
                                style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', cursor: 'pointer' }}
                            >
                                {song.artist}
                            </span>
                        </div>

                        {/* Like Button */}
                        <button
                            onClick={() => toggleLike(song)}
                            title={song.liked ? 'Remove from liked songs' : 'Add to liked songs'}
                            className="liked-songs-btn"
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
                            style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', marginLeft: '20px' }}
                        >
                            {song.duration}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
