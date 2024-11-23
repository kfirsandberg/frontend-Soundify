import React, { useEffect } from 'react'
import { AllStationPreview } from '../cmps/AllStationPreview.jsx'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loadStations, setStations } from '../store/actions/station.actions.js' // Create a sync action

export function AllStations() {
    const navigate = useNavigate()
    const stations = useSelector(state => state.stationModule.stations)

    function onClickStation(station) {
        navigate(`/playlist/${station._id}`)
    }

    return (
        <section className="all-stations-container">
            <header className="all-stations-header">
                <h2 className="all-stations-header">All Stations</h2>
            </header>
            <section className="all-stations-list">
                {stations.map(station => (
                    <button className="all-station-preview"
                        key={station._id}
                        onClick={() => onClickStation(station)}
                    >
                        <AllStationPreview station={station} />
                    </button>
                ))}
            </section>
        </section>
    )
}
