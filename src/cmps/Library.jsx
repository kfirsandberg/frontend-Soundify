import { useState  } from 'react'
import { useSelector } from 'react-redux'
import { LibraryList } from '../cmps/LibraryList'
import { FilterLibrary } from './LibraryFilter.jsx'
import { addNewStation } from '../store/actions/station.actions.js'
import {  showSuccessMsg } from '../services/event-bus.service.js'

import { useNavigate } from 'react-router-dom'

export function Library({ toggleLibraryActive }) {
    // Accept the prop
    const navigate = useNavigate()
    const stations = useSelector(storeState => storeState.stationModule.stations)
    
    const [filterCriteria, setFilterCriteria] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [isLibraryCollapsed, setIsLibraryCollapsed] = useState(false)

    function toggleLibrary() {
        setIsLibraryCollapsed(prev => !prev)
        toggleLibraryActive() // Toggle active state when the button is clicked
    }

    async function onAddStation() {
        try {
            const newStation = await addNewStation(stations)
            console.log(newStation._id);
            
            showSuccessMsg('Added to Your Library.')
            navigate(`/playlist/${newStation._id}`)
        } catch (err) {
            console.log('Error adding station:', err)
        }
    }

    return (
        <div className={`library-content-${isLibraryCollapsed ? 'collapsed' : ''}`}>
            <section className={`action-btns-${isLibraryCollapsed ? 'collapsed' : ''}`}>
                <button
                    className="toggle-lib-btn"
                    onClick={toggleLibrary}
                    title={`${isLibraryCollapsed ? 'Expand Your Library' : 'Collapse Your Library'}`}
                >
                    {!isLibraryCollapsed && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            data-encore-id="icon"
                            role="img"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="library-icon Svg-sc-ytk21e-0 bneLcE"
                        >
                            <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z" />
                        </svg>
                    )}
                    {isLibraryCollapsed && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            data-encore-id="icon"
                            role="img"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="library-icon collapsed Svg-sc-ytk21e-0 bneLcE"
                        >
                            <path d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1z" />
                        </svg>
                    )}
                    <h3>{isLibraryCollapsed ? '' : 'Your Library'}</h3>
                </button>
                {/* Show buttons based on collapsed state */}
                {!isLibraryCollapsed && (
                    <div className="action-buttons">
                        <button className="create-playlist" onClick={onAddStation} title="Create playlist">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                data-encore-id="icon"
                                role="img"
                                aria-hidden="true"
                                viewBox="0 0 16 16"
                                className="create-playlist-icon Svg-sc-ytk21e-0 dYnaPI"
                            >
                                <path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z" />
                            </svg>
                        </button>
                        <button className="show-more">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                data-encore-id="icon"
                                role="img"
                                aria-hidden="true"
                                viewBox="0 0 16 16"
                                className="right-arrow-icon Svg-sc-ytk21e-0 cAMMLk"
                            >
                                <path d="M7.19 1A.749.749 0 0 1 8.47.47L16 7.99l-7.53 7.521a.75.75 0 0 1-1.234-.815.75.75 0 0 1 .174-.243l5.72-5.714H.75a.75.75 0 1 1 0-1.498h12.38L7.41 1.529a.749.749 0 0 1-.22-.53z" />
                            </svg>
                        </button>
                    </div>
                )}
            </section>
            <div className={`library-list-wrapper ${isLibraryCollapsed ? 'collapsed' : ''}`}>
                {isLibraryCollapsed ? (
                    <LibraryList filterCriteria={filterCriteria} sortBy={sortBy} isCollapsed={true} />
                ) : (
                    <>
                        <FilterLibrary setFilterCriteria={setFilterCriteria} setSortBy={setSortBy} />
                        <LibraryList filterCriteria={filterCriteria} sortBy={sortBy} isCollapsed={false} />
                    </>
                )}
            </div>
        </div>
    )
}
