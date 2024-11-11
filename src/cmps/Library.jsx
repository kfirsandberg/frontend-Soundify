import { useState } from 'react'
import { LibraryList } from '../cmps/LibraryList'
import { FilterLibrary } from '../cmps/FilterLibrary'
import { Link } from 'react-router-dom'

export function Library({ toggleLibraryActive }) {
    // Accept the prop
    const [filterCriteria, setFilterCriteria] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [isLibraryCollapsed, setIsLibraryCollapsed] = useState(false)

    function toggleLibrary() {
        setIsLibraryCollapsed(prev => !prev)
        toggleLibraryActive() // Toggle active state when the button is clicked
    }

    return (
        <div className={`library-content-${isLibraryCollapsed ? 'collapsed' : ''}`}>
            <section className={`action-btns-${isLibraryCollapsed ? 'collapsed' : ''}`}>
                <button className="toggle-lib-btn" onClick={toggleLibrary}>
                    <img src="/assets/library.svg" alt="Library" className="library-icon" />
                    <h3>{isLibraryCollapsed ? '' : 'Your Library'}</h3>
                </button>
                {/* Show buttons based on collapsed state */}
                {!isLibraryCollapsed && (
                    <>
                        <div className="action-buttons">
                            <Link className="create-playlist" to="/station/add">
                                <img
                                    src="/assets/add playlist.svg"
                                    alt="Create Playlist"
                                    className="create-playlist-icon"
                                />
                            </Link>
                            <button className="show-more">
                                <img src="/assets/right_arrow.svg" alt="Right Arrow" className="right-arrow-icon" />
                            </button>
                        </div>
                    </>
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
