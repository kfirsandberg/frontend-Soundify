import React, { useEffect } from 'react'
import { StationPreview } from '../cmps/StationPreview.jsx'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loadStations, setStations } from '../store/actions/station.actions.js' // Create a sync action

export function AllStations() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const stations = useSelector(state => state.stationModule.stations)

    useEffect(() => {
        loadStations()
    }, [])

    async function loadStations() {
        try {
            const data = await stationLocalService.query()
            setStations(data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching stations:', error)
            setLoading(false)
        }
    }
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
                    <button className="all-station-preview" key={station._id} onClick={() => onClickStation(station)}>
                        <StationPreview station={station} />
                    </button>
                ))}
            </section>
        </section>
    )
}
