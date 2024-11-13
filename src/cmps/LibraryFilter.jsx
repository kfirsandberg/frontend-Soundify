import { useState } from 'react'

export function FilterLibrary({ setFilterCriteria, setSortBy }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedSort, setSelectedSort] = useState('Recents')
    const [showSearch, setShowSearch] = useState(false) // New state for toggling search input visibility

    function handleSearchChange(event) {
        setSearchTerm(event.target.value)
        setFilterCriteria(event.target.value)
    }

    function handleSortClick(sortType) {
        setSortBy(sortType)
        setSelectedSort(sortType)
        setShowModal(false) // Close modal after selecting a sort option
    }

    return (
        <header className="filter-library">
            <div className="sort-buttons">
                <button onClick={() => setSortBy('playlists')}>Playlists</button>
                <button onClick={() => setSortBy('A')}>Artists</button>
                <button onClick={() => setSortBy('artists')}>Albums</button>
            </div>

            <div className="search-and-menu">
                {/* New button to toggle search input visibility */}
                <button
                    className="toggle-search-btn"
                    onClick={() => setShowSearch(prev => !prev)}
                    title="Search in Your Library"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="lib-search-icon Svg-sc-ytk21e-0 bneLcE"
                    >
                        <path d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z" />
                    </svg>
                </button>

                {/* Search input with sliding effect */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search in your library"
                    className={`search-input ${showSearch ? 'open' : ''}`}
                />

                <div className="sort-container">
                    <div className="hamburger-menu">
                        <button className="hamburger-btn" onClick={() => setShowModal(prev => !prev)}>
                            {selectedSort && <span className="selected-sort">{selectedSort}</span>}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                data-encore-id="icon"
                                role="img"
                                aria-hidden="true"
                                viewBox="0 0 16 16"
                                className="hamburger-icon Svg-sc-ytk21e-0 cAMMLk"
                            >
                                <path d="M15 14.5H5V13h10v1.5zm0-5.75H5v-1.5h10v1.5zM15 3H5V1.5h10V3zM3 3H1V1.5h2V3zm0 11.5H1V13h2v1.5zm0-5.75H1v-1.5h2v1.5z" />
                            </svg>
                        </button>

                        <div className={`modal ${showModal ? 'open' : ''}`}>
                            <button onClick={() => handleSortClick('Recents')}>Recents</button>
                            <button onClick={() => handleSortClick('Recently Added')}>Recently Added</button>
                            <button onClick={() => handleSortClick('Alphabetical')}>Alphabetical</button>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
