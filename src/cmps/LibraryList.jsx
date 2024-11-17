import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Scrollbar } from 'react-scrollbars-custom'
import { stationLocalService } from '../services/station/station.service.local'
import { loadStation, removeStation, loadStations } from '../store/actions/station.actions.js'
import loaderIcon from '/assets/loader.svg'
import { useSelector } from 'react-redux'

import {  showSuccessMsg } from '../services/event-bus.service.js'

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
            showSuccessMsg('Removed from Your Library.');
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
            <ul className='library-ul'>
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
                                  <span className='dot'>.</span>
                                  <p className="station-creator">Spotify</p>
                              </div>
                          </div>)}
                        {/* SVG Icon overlay */}
                        <div className="overlay-icon">
                            <img src="/assets/lib_player_btn.svg" alt="Play" />
                        </div>
                    </li>
                ))}
            </ul>
            {/* </Scrollbar> */}

            {contextMenu && (
                <ul
                    className="context-menu"
                    ref={contextMenuRef}
                    style={{
                        position: 'absolute',
                        top: `${contextMenu.y}px`,
                        left: `${contextMenu.x}px`,
                        zIndex: 100,
                    }}
                >
                    <li onClick={handleDeleteStation}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            data-encore-id="icon"
                            role="img"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            className="delete-icon Svg-sc-ytk21e-0 bmPLlI"
                        >
                            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                            <path d="M12 8.75H4v-1.5h8v1.5z" />
                        </svg>
                        <span>Delete</span>
                    </li>
                </ul>
            )}
        </div>
    )
}
