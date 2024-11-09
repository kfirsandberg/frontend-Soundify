import { useState } from 'react';

export function FilterLibrary({ setFilterCriteria, setSortBy }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setFilterCriteria(event.target.value); // Pass search term to parent to filter stations
  };

  const handleSortClick = (sortType) => {
    setSortBy(sortType);  // Pass sort type to parent to sort stations
    setShowModal(false);  // Close modal after selecting sort
  };

  return (
    <header className="filter-library">
      <div className="sort-buttons">
        <button onClick={() => setSortBy('playlists')}>Playlists</button>
        <button onClick={() => setSortBy('albums')}>Albums</button>
        <button onClick={() => setSortBy('artists')}>Artists</button>
      </div>

      {/* Flex container to align the search input and hamburger menu side by side */}
      <div className="search-and-menu">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search in your library"
          className="search-input"
        />

        <div className="hamburger-menu">
          <button className="hamburger-btn" onClick={() => setShowModal(!showModal)}>
            <span className="hamburger-icon">☰</span>
          </button>

          {showModal && (
            <div className="modal">
              <button onClick={() => handleSortClick('recents')}>Recents</button>
              <button onClick={() => handleSortClick('recentlyAdded')}>Recently Added</button>
              <button onClick={() => handleSortClick('alphabetical')}>Alphabetical</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
