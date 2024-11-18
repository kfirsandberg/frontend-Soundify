import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { updateCurrentTime, updateSongDuration, updateVolume, setIsPlaying } from '../store/actions/station.actions';
import { formatTime } from '../services/util.service';

export function AppPlayer() {
    const {
        currentSong,
        currentTime = 0,
        songDuration,
        volume,
        prevVolume,
        isPlaying,
    } = useSelector((state) => state.stationModule);
    
    const [isHoverVolume, setIsHoverVolume] = useState(false)
    const [isHoverPlayer, setIsHoverPlayer] = useState(false)
    const intervalRef = useRef(null)

    useEffect(() => {
        if (currentSong) {
            const duration = currentSong.duration
            updateSongDuration(duration)
            updateCurrentTime(0)
        }
    }, [currentSong])

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                if (currentTime < songDuration) {
                    updateCurrentTime(parseInt(currentTime) + 1)
                }
            }, 1000)
        }
        return () => clearInterval(intervalRef.current)
    }, [currentTime, songDuration, isPlaying])

    function handleVolumeChange(ev) {
        const newVolume = parseInt(ev.target.value)
        updateVolume(newVolume)
    }

    function handleProgressChange(ev) {
        const newTime = ev.target.value
        console.log(newTime);
        
        updateCurrentTime(newTime)
    }

    function handleMuteToggle() {
        if (volume > 0) {
            updateVolume(0)
        } else {
            updateVolume(prevVolume > 0 ? prevVolume : 50)
        }
    }

    function togglePlayPause() {
        if (!currentSong) return
        setIsPlaying(!isPlaying)
    }


    function getVolumeIcon(volume) {
        if (volume === 0) {
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-encore-id="icon"
                    role="presentation"
                    aria-label="Volume off"
                    aria-hidden="true"
                    id="volume-icon"
                    viewBox="0 0 16 16"
                    className="svg-fill Svg-sc-ytk21e-0 kcUFwU"
                >
                    <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z" />
                    <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z" />
                </svg>
            )
        } else if (volume > 0 && volume <= 33) {
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-encore-id="icon"
                    role="presentation"
                    aria-label="Volume low"
                    aria-hidden="true"
                    id="volume-icon"
                    viewBox="0 0 16 16"
                    className="svg-fill Svg-sc-ytk21e-0 kcUFwU"
                >
                    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z" />
                </svg>
            )
        } else if (volume > 33 && volume <= 66) {
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-encore-id="icon"
                    role="presentation"
                    aria-label="Volume medium"
                    aria-hidden="true"
                    id="volume-icon"
                    viewBox="0 0 16 16"
                    className="svg-fill Svg-sc-ytk21e-0 kcUFwU"
                >
                    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z" />
                </svg>
            )
        } else {
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-encore-id="icon"
                    role="presentation"
                    aria-label="Volume high"
                    aria-hidden="true"
                    id="volume-icon"
                    viewBox="0 0 16 16"
                    className="svg-fill Svg-sc-ytk21e-0 kcUFwU"
                >
                    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z" />
                    <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z" />
                </svg>
            )
        }
    }

    return (
        <footer className="app-player full">
            {currentSong && (
                <div className="song-info">
                    <div className="image-container">
                        <img src={currentSong.track.album.images[0].url} alt={currentSong.track.name} className="song-img" />
                    </div>
                    <div className="song-details">
                        <h4>{currentSong.track.name}</h4>
                        <p>{currentSong.track.artists.map(artist => artist.name).join(', ')}</p>
                    </div>
                </div>
            )}
            <div className="player-container">
                <div className="player-controls">
                    <button className="back-btn ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            data-encore-id="icon"
                            role="img"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            className="svg-fill Svg-sc-ytk21e-0 dYnaPI"
                        >
                            <path
                                className="svg-path"
                                d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"
                            />
                        </svg>
                    </button>
                    <button
                        style={currentSong ? {} : { cursor: 'not-allowed' }}
                        className="play-btn"
                        onClick={togglePlayPause}
                    >
                        {isPlaying ? (
                            <svg
                                className="pause-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                aria-hidden="true"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    className="svg-path"
                                    d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="icon"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className="svg-path"
                                    d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
                                />
                            </svg>
                        )}
                    </button>
                    <button className="next-btn">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            data-encore-id="icon"
                            role="img"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            className="svg-fill Svg-sc-ytk21e-0 dYnaPI"
                        >
                            <path
                                className="svg-path"
                                d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"
                            />
                        </svg>
                    </button>
                </div>
                <div className="progress-bar">
                    <span className="current-time">{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min="0"
                        max={songDuration}
                        step="1"
                        value={currentTime}
                        onChange={handleProgressChange}
                        onMouseEnter={() => setIsHoverPlayer(true)}
                        onMouseLeave={() => setIsHoverPlayer(false)}
                        className="progress-slider"
                        style={{
                            background: `linear-gradient(to right,  ${isHoverPlayer ? '#1ED760' : '#ffffff'}  ${
                                (currentTime / songDuration) * 100
                            }%, #2a2a2a ${(currentTime / songDuration) * 100}%)`,
                        }}
                    />
                    <span className="duration">{songDuration ? formatTime(songDuration - currentTime) : '0:00'}</span>
                </div>
            </div>
            <div className="volume-control">
                <button className="volume-btn" onClick={handleMuteToggle}>
                    {getVolumeIcon(volume)}
                </button>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={volume}
                    onChange={handleVolumeChange}
                    onMouseEnter={() => setIsHoverVolume(true)}
                    onMouseLeave={() => setIsHoverVolume(false)}
                    className="volume-slider slider"
                    style={{
                        background: `linear-gradient(to right, ${
                            isHoverVolume ? '#1ED760' : '#ffffff'
                        } ${volume}%, #2a2a2a ${volume}%)`,
                    }}
                />
            </div>
        </footer>
    )
    
}
