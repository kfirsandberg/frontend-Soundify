import { useState } from 'react';

export function FilterLibrary({ setFilterCriteria, setSortBy }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedSort, setSelectedSort] = useState('');
  const [showSearch, setShowSearch] = useState(false); // New state for toggling search input visibility

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setFilterCriteria(event.target.value);
  };

  const handleSortClick = (sortType) => {
    setSortBy(sortType);
    setSelectedSort(sortType);
    setShowModal(false); // Close modal after selecting a sort option
  };

  return (
    <header className="filter-library">
      <div className="sort-buttons">
        <button onClick={() => setSortBy('playlists')}>Playlists</button>
        <button onClick={() => setSortBy('albums')}>Albums</button>
        <button onClick={() => setSortBy('artists')}>Artists</button>
      </div>

      <div className="search-and-menu">
        {/* New button to toggle search input visibility */}
        <button
          className="toggle-search-btn"
          onClick={() => setShowSearch((prev) => !prev)}
        >
          <img
            src="/assets/search.svg"
            alt="Toggle search visibility"
            className="search-icon"
          />
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
          {selectedSort && <span className="selected-sort">{selectedSort}</span>}

          <div className="hamburger-menu">
            <button className="hamburger-btn" onClick={() => setShowModal((prev) => !prev)}>
              <img src="/assets/hamburger.svg" alt="Hamburger icon" className="hamburger-icon" />
            </button>

            <div className={`modal ${showModal ? 'open' : ''}`}>
              <button onClick={() => handleSortClick('recents')}>Recents</button>
              <button onClick={() => handleSortClick('recentlyAdded')}>Recently Added</button>
              <button onClick={() => handleSortClick('alphabetical')}>Alphabetical</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
