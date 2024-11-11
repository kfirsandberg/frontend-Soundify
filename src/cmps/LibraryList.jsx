import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { stationLocalService } from '../services/station/station.service.local'
import { loadStation, removeStation } from '../store/actions/station.actions.js'

export function LibraryList({ filterCriteria, sortBy, isCollapsed }) {
    const [stations, setStations] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const [contextMenu, setContextMenu] = useState(null)
    const contextMenuRef = useRef(null)

    useEffect(() => {
        loadStations()
    }, [stations])

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

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)
        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [])

    function handleOutsideClick(event) {
        if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
            closeContextMenu()
        }
    }

    function onClickStation(station) {
        navigate(`/playlist/${station._id}`)
        loadStation(station._id)
    }

    // Check if stations are loaded before attempting to filter or sort
    let filteredStations = stations

    if (stations && filterCriteria) {
        filteredStations = stations.filter(station => station.name.toLowerCase().includes(filterCriteria.toLowerCase()))
    }

    if (stations && sortBy) {
        if (sortBy === 'recents') {
            filteredStations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        } else if (sortBy === 'recentlyAdded') {
            filteredStations.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
        } else if (sortBy === 'alphabetical') {
            filteredStations.sort((a, b) => a.name.localeCompare(b.name))
        }
    }

    function handleContextMenu(ev, station) {
        ev.preventDefault()
        setContextMenu({
            x: ev.pageX,
            y: ev.pageY,
            station,
        })
    }

    function closeContextMenu() {
        setContextMenu(null)
    }

    async function handleDeleteStation() {
        try {
            await removeStation(contextMenu.station._id)
            closeContextMenu()
            loadStations()
        } catch (error) {
            console.error('Cannot delete station', error)
        }
    }

    if (loading) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div className={`library-list ${isCollapsed ? 'collapsed' : ''}`}>
            <ul>
                {filteredStations.map(station => (
                    <li
                        key={station._id}
                        className="station-card"
                        onClick={() => onClickStation(station)}
                        onContextMenu={ev => handleContextMenu(ev, station)}
                    >
                        <img src={station.imgURL} alt={station.name} className="station-image" />
                        {!isCollapsed && (
                            <div className="station-info">
                                <h3 className="station-name">{station.name}</h3>
                                <p className="station-artist">{station.artist}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {contextMenu && (
                <div className="context-menu" ref={contextMenuRef}>
                    <button onClick={handleDeleteStation}>Delete</button>
                </div>
            )}
        </div>
    )
}
