import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { StationIndex } from './pages/StationIndex.jsx'
import { AppHeader } from './cmps/AppHeader'
import { AppPlayer } from './cmps/AppPlayer.jsx'
import { StationDetails } from './pages/StationDetails.jsx'
import { Library } from "./cmps/Library.jsx"

export function RootCmp() {
    return (
        <div className="main-container">
            <AppHeader className="header" />
            <div className="content">
                <aside className="library-route">
                    <Library />
                </aside>
                <main className="station-index-route">
                    <h2>aviv kfir amit</h2>
                    <Routes>
                        <Route path="/" element={<StationIndex />} />
                        <Route path="playlist/:playlistId" element={<StationDetails />} />
                    </Routes>
                </main>
            </div>
            <AppPlayer className="player" />
        </div>
    )
}
