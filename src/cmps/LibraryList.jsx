import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Scrollbar } from 'react-scrollbars-custom'
import { stationLocalService } from '../services/station/station.service.local'
import { loadStation, removeStation, loadStations } from '../store/actions/station.actions.js'
import loaderIcon from '/assets/loader.svg'
import { useSelector } from 'react-redux'

export function LibraryList({ filterCriteria, sortBy, isCollapsed }) {
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [contextMenu, setContextMenu] = useState(null)
    const contextMenuRef = useRef(null)

    useEffect(() => {
        loadStations()
        setLoading(false)
    }, [])



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
        navigate(`/playlist/${station._id}`);
        loadStation(station._id);
    }

    let filteredStations = stations
    if (stations && filterCriteria) {
        filteredStations = stations.filter(station => station.name.toLowerCase().includes(filterCriteria.toLowerCase()))
    }
    if (sortBy === 'Recents') { // Correct capitalization
        filteredStations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sortBy === 'Recently Added') {
        filteredStations.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
    } else if (sortBy === 'Alphabetical') {
        filteredStations.sort((a, b) => a.name.localeCompare(b.name))
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
        return (
            <div>
                {!isCollapsed ? (
                    <img src={loaderIcon} alt="Loading..." className="loader-icon-2" />
                ) : (
                    <img src={loaderIcon} alt="Loading..." className="loader-icon-3" />
                )}
            </div>
        )
    }

    return (
        <div className={`library-list ${isCollapsed ? 'collapsed' : ''}`}>
            {/* <Scrollbar style={{ height: '800px' }}> */}
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
                              <div className="station-details">
                                  <h3 className="station-kind">Playlist</h3>
                                  <p className="station-creator"> •Spotify  </p>
                              </div>
                          </div>
                          
                            )}
                            {/* SVG Icon overlay */}
                            <div className="overlay-icon">
                                <img src="/assets/lib_player_btn.svg" alt="Play" />
                            </div>
                        </li>
                    ))}
                </ul>
            {/* </Scrollbar> */}

            {contextMenu && (
                <div className="context-menu" ref={contextMenuRef}>
                    <button onClick={handleDeleteStation}>Delete</button>
                </div>
            )}
        </div>
    )
}
