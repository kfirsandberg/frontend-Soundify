import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AllStations } from './pages/AllStations.jsx'
import { StationIndex } from './pages/StationIndex.jsx'
import { AppHeader } from './cmps/AppHeader'
import { AppPlayer } from './cmps/AppPlayer.jsx'
import { StationDetails } from './pages/StationDetails.jsx'
import { Library } from './cmps/Library.jsx'
import { YouTubeAudioPlayer } from './cmps/YouTubeAudioPlayer.jsx'
import { setBgColor } from './store/actions/station.actions.js'
import { FastAverageColor } from 'fast-average-color'

const fac = new FastAverageColor()
export function RootCmp() {
    const [isLibraryActive, setIsLibraryActive] = useState(false) // Track the active state of the library

    // Toggle the library route active state
    const toggleLibraryActive = () => setIsLibraryActive(prev => !prev)
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const bgColor = useSelector(storeState => storeState.stationModule.bgColor)

    useEffect(() => {
        const fetchBackgroundColor = async () => {
            if (stations && stations.length > 0 && stations[0].imgURL) {
                try {
                    const color = await fac.getColorAsync(stations[0].imgURL)
                    setBgColor(color.rgb)
                } catch (error) {
                    console.error('Error fetching average color:', error)
                }
            }
        }

        fetchBackgroundColor()
    }, [stations])

    return (
        <div className="main-container">
            <AppHeader className="header" />
            <div className="content">
                <aside className={`library-route ${isLibraryActive ? 'active' : ''}`}>
                    {/* Apply active class conditionally */}
                    <Library toggleLibraryActive={toggleLibraryActive} /> {/* Pass toggle function to Library */}
                </aside>

                <main
                    className="station-index-route"
                    style={{
                        backgroundColor: `${bgColor}`,
                        position: 'relative',
                        transition: 'background-color 2s ease',
                    }}
                >
                    <div
                        style={{
                            background: `linear-gradient(to top, #121212 72%,  rgba(18, 18, 18, 0) 100%)`,
                        }}
                    >
                        <Routes>
                            <Route path="/" element={<StationIndex />} />
                            <Route path="/all-stations" element={<AllStations />} /> {/* Add AllStations route */}
                            <Route path="/playlist/:stationId" element={<StationDetails />} />
                        </Routes>
                    </div>
                </main>
            </div>
            <AppPlayer className="player" />
            <YouTubeAudioPlayer />
        </div>
    )
}
