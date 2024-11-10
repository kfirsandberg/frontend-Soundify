import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import playIcon from '../../public/assets/player/play.svg'
import pauseIcon from '../../public/assets/player/pause.svg'
import backIcon from '../../public/assets/player/back.svg'
import nextIcon from '../../public/assets/player/next.svg'
import muteIcon from '../../public/assets/mute.svg'
import unmuteIcon from '../../public/assets/unmute.svg'
import { updateCurrentTime, updateSongDuration, updateVolume, setIsPlaying } from '../store/actions/station.actions'

export function AppPlayer() {
    const currentSong = useSelector(state => state.stationModule.currentSong)
    const [isHoverVolume, setIsHoverVolume] = useState(false)
    const [isHoverPlayer, setIsHoverPlayer] = useState(false)

    const currentTime = useSelector(state => state.stationModule.currentTime) || 0
    const songDuration = useSelector(state => state.stationModule.songDuration) || 293
    const volume = useSelector(state => state.stationModule.volume)
    const prevVolume = useSelector(state => state.stationModule.prevVolume)
    const isPlaying = useSelector(state => state.stationModule.isPlaying)

    const intervalRef = useRef(null)

    useEffect(() => {
        if (currentSong) {
            const duration = currentSong.duration
            updateSongDuration(duration)
            updateCurrentTime(0)
        }
    }, [currentSong])

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            if (currentTime < songDuration && isPlaying) {
                updateCurrentTime(currentTime + 1)
            }
        }, 1000)
        return () => clearInterval(intervalRef.current)
    }, [currentTime, songDuration, isPlaying])

    function handleVolumeChange(ev) {
        const newVolume = ev.target.value
        updateVolume(newVolume)
        console.log('Volume changed to:', volume)
    }

    function handleProgressChange(ev) {
        const newTime = ev.target.value
        updateCurrentTime(newTime)
        console.log('Current time changed to:', newTime)
    }

    function handleMuteToggle() {
        if (volume > 0) {
            updateVolume(0)
        } else {
            updateVolume(prevVolume)
        }
        console.log('Volume toggled to:', volume)
    }

    function togglePlayPause() {
        setIsPlaying(!isPlaying)
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
            .toString()
            .padStart(2, '0')
        return `${mins}:${secs}`
    }

    if (!currentSong) {
        return (
            <footer className="app-player full">
                <p>No song is currently playing</p>
            </footer>
        )
    }

    return (
        <footer className="app-player full">
            <div className="song-info">
                <img src={currentSong.imgURL} alt={currentSong.title} className="song-img" />
                <div className="song-details">
                    <h4>{currentSong.title}</h4>
                    <p>{currentSong.artist}</p>
                </div>
            </div>
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
                    <button className="play-btn" onClick={togglePlayPause}>
                        {isPlaying ? (
                            // Pause Icon
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                data-encore-id="icon"
                                role="img"
                                aria-hidden="true"
                                viewBox="0 0 16 16"
                                className="Svg-sc-ytk21e-0 dYnaPI"
                            >
                                <path
                                    className="svg-path"
                                    d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"
                                />
                            </svg>
                        ) : (
                            // Play Icon
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                data-encore-id="icon"
                                role="img"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="Svg-sc-ytk21e-0 bneLcE"
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
                            background: `linear-gradient(to right,  ${isHoverPlayer ? '#1ed760' : '#fff'}  ${
                                (currentTime / songDuration) * 100
                            }%, #b3b3b3 ${(currentTime / songDuration) * 100}%)`,
                        }}
                    />
                    <span className="duration">{formatTime(songDuration - currentTime)}</span>
                </div>
            </div>

            <div className="volume-control">
                <button className="volume-btn" onClick={handleMuteToggle}>
                    {volume > 0 ? (
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
                    ) : (
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
                    )}
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
                            isHoverVolume ? '#1ed760' : '#fff'
                        } ${volume}%, #b3b3b3 ${volume}%)`,
                    }}
                />
            </div>
        </footer>
    )
}
