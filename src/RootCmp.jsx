import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { StationIndex } from './pages/StationIndex.jsx'
import { AppHeader } from './cmps/AppHeader'
import { AppPlayer } from './cmps/AppPlayer.jsx'
import { StationDetails } from './pages/StationDetails.jsx'
import { Library } from './cmps/Library.jsx'
import { YouTubeAudioPlayer } from './cmps/YouTubeAudioPlayer.jsx'
import { AddStation } from './cmps/AddStation.jsx'
import { StationEdit } from './cmps/StationEdit.jsx'

export function RootCmp() {
    const [isLibraryActive, setIsLibraryActive] = useState(false) // Track the active state of the library

    // Toggle the library route active state
    const toggleLibraryActive = () => setIsLibraryActive(prev => !prev)

    return (
        <div className="main-container">
            <AppHeader className="header" />
            <div className="content">
                <aside className={`library-route ${isLibraryActive ? 'active' : ''}`}>
                    {/* Apply active class conditionally */}
                    <Library toggleLibraryActive={toggleLibraryActive} /> {/* Pass toggle function to Library */}
                </aside>

                <main className="station-index-route">
                    <Routes>
                        <Route path="/" element={<StationIndex />} />
                        <Route path="/station/:stationId" element={<StationDetails />} />
                        <Route path="/station/add" element={<AddStation />}>
                            <Route path="/station/add/edit" element={<StationEdit />} />
                        </Route>
                    </Routes>
                </main>
            </div>
            <YouTubeAudioPlayer />
            <AppPlayer className="player" />
        </div>
    )
}
