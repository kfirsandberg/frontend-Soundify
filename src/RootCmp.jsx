import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { StationIndex } from './pages/StationIndex.jsx'
import { AppHeader } from './cmps/AppHeader'
import { AppPlayer } from './cmps/AppPlayer.jsx'
import { StationDetails } from './pages/StationDetails.jsx'
import { Library } from "./cmps/Library.jsx"
import { YouTubeAudioPlayer } from './cmps/YouTubeAudioPlayer.jsx'
export function RootCmp() {
    return (
        <div className="main-container">
            <AppHeader className="header" />
            <div className="content">
                <aside className="library-route">
                    <Library />
                </aside>
                <main className="station-index-route">

                    <Routes>
                    <Route path="/" element={<StationIndex />} />
                    <Route path="/station/:stationId" element={<StationDetails />} />
                    </Routes>
                </main>
            </div>
            <AppPlayer className="player" />
            <YouTubeAudioPlayer />
        </div>
    )
}
