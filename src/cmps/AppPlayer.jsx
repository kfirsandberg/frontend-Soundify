import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadSong } from '../store/actions/station.actions.js'

export function AppPlayer() {
    const currentSong = useSelector(state => state.stationModule.currentSong)

    useEffect(() => {
        loadSong('Fc8Bfd')
    }, [])

    if (!currentSong) {
        return (
            <footer className="app-player full">
                <p>No song is currently playing</p>
            </footer>
        )
    }

    return (
        <footer className="app-player full">
            <div className="player-container">
                <div className="song-info">
                    <img src={currentSong.imgURL} alt={currentSong.title} className="song-img" />
                    <div className="song-details">
                        <h4>{currentSong.title}</h4>
                        <p>{currentSong.artist}</p>
                    </div>
                </div>

                <div className="player-controls">
                    <button>⏮️</button>
                    <button>▶️</button>
                    <button>⏭️</button>
                </div>

                <div className="progress-bar">
                    <span className="current-time">1:06</span>
                    <div className="timeline">
                        <div className="progress"></div>
                    </div>
                    <span className="duration">4:53</span>
                </div>
            </div>
        </footer>
    )
}
