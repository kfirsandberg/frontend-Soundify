import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadStation, setBgColor } from '../store/actions/station.actions.js'
import { FastAverageColor } from 'fast-average-color'
import { useSelector } from 'react-redux'
const fac = new FastAverageColor()

export function LastStations() {
    const stations = useSelector(storeState => storeState.stationModule.stations)

    const displayedStations = stations.slice(0, 8)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function onClickStation(station) {
        loadStation(station)
        navigate(`/playlist/${station._id}`)
    }

    async function onHoverStation(station) {
        if (station.images[0].url) {
            try {
                const color = await fac.getColorAsync(station.images[0].url)
                dispatch(setBgColor(color.rgb)) // Dispatch color to update background
            } catch (error) {
                console.error('Error fetching average color:', error)
            }
        }
    }

    if (!stations) {
        return <div>Loading...</div>
    }

    return (
        <div className="last-stations-grid">
            {displayedStations.map((station, index) => (
                <div
                    className="playlist-card"
                    key={index}
                    onClick={() => onClickStation(station)}
                    onMouseEnter={() => onHoverStation(station)} // Fetch color on hover
                >
                    <img src={station.images[0].url} alt={station.name} className="playlist-thumbnail" />
                    <div className="playlist-info">
                        <p className="playlist-name">{station.name}</p>
                    </div>
                    <div className="playlist-play-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" viewBox="0 0 24 24">
                            <path d="M7.05 3.606l13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394a.7.7 0 0 1-1.05-.606V4.212a.7.7 0 0 1 1.05-.606z" />
                        </svg>
                    </div>
                </div>
            ))}
        </div>
    )
}
