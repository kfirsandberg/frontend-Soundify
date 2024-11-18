import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadStation, removeStation, loadStations, setIsPlaying, loadSong } from '../store/actions/station.actions.js'
import loaderIcon from '/assets/loader.svg'
import { useSelector, } from 'react-redux'
import { DeleteStationModal } from './DeleteStationModal';




import { showSuccessMsg } from '../services/event-bus.service.js'

export function LibraryList({ filterCriteria, sortBy = 'Recents', isCollapsed }) {
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const navigate = useNavigate()


    const contextMenuRef = useRef(null)

    const [contextMenu, setContextMenu] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStation, setSelectedStation] = useState(null);
    const [currentStation, setCurrentStation] = useState(null)

    const [filteredStations, setFilteredStations] = useState([])

    useEffect(() => {
        loadStations()
        setLoading(false)
        document.addEventListener('click', handleOutsideClick)
        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [])

    function handlePlayFirstSong(station) {
        if (station.tracks.length > 0) {
            const firstSong = station.tracks[0]
            if (firstSong) {
                loadSong(firstSong)
                setIsPlaying(true)
            } else {
                console.log('First song does not have a valid ID')
            }
        } else {
            console.log('No songs found in station')
        }
    }




    useEffect(() => {
        updateFilteredStations()
    }, [stations, filterCriteria, sortBy])

    function updateFilteredStations() {
        try {
            let filtered = stations || []
            if (stations && filterCriteria) {
                filtered = stations.filter(station =>
                    station.name.toLowerCase().includes(filterCriteria.toLowerCase())
                )
            }

            switch (sortBy) {
                case 'Recents':
                    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    break
                case 'Recently Added':
                    filtered.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
                    break
                case 'Alphabetical':
                    filtered.sort((a, b) => a.name.localeCompare(b.name))
                    break
                default:
                    break
            }

            setFilteredStations(filtered)
        } catch (err) {
            console.error('Error in updateFilteredStations:', err)
        }
    }


    function handleOutsideClick(event) {
        if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
            closeContextMenu()
        }
    }

    function onClickStation(station) {
        setCurrentStation(station._id)
        navigate(`/playlist/${station._id}`);
        loadStation(station._id);
        handlePlayFirstSong(station);
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

    function openDeleteModal(station) {
        setSelectedStation(station)
        setIsModalOpen(true)
        closeContextMenu()
    }

    async function handleDeleteStation() {
        console.log('selectedStation:', selectedStation)
        if (!selectedStation?._id) return
        try {
            await removeStation(selectedStation._id)
            setIsModalOpen(false)
            loadStations()
            showSuccessMsg('Removed from Your Library.');
        } catch (error) {
            console.error('Cannot delete station', error)
        }
    }



    if (loading) {
        return (
            // <div>
            //     {!isCollapsed ? (
            //         <img src={loaderIcon} alt="Loading..." className="loader-icon-2" />
            //     ) : (
            //         <img src={loaderIcon} alt="Loading..." className="loader-icon-3" />
            //     )}
            // </div>
            <span></span>
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
                        <img src={station.images[0].url} alt={station.name} className="station-image" />
                        {!isCollapsed && (
                            <div className="station-info">
                                <h3
                                    className="station-name"
                                    style={{
                                        color: currentStation === station._id ? '#1ed760' : '', // Change color if active
                                    }}
                                >
                                    {station.name}
                                </h3>
                                <div className="station-details">
                                    <h3 className="station-kind">Playlist</h3>
                                    <span className='dot'>.</span>
                                    <p className="station-creator">Spotify</p>
                                </div>
                            </div>)}
                        {/* SVG Icon overlay */}
                        <div className="overlay-icon" onClick={() => handlePlayFirstSong(station)}>
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
                     {contextMenu.station.name !== 'Liked Songs' && (
                    <li onClick={() => openDeleteModal(contextMenu.station)}>
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
                     )}
                </ul>
            )}
            {isModalOpen && (
                <DeleteStationModal
                    playlistName={selectedStation?.name}
                    onConfirm={handleDeleteStation}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}
        </div>
    )
}
