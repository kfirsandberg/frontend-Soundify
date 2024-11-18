import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.15),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 0.2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgb(180, 180, 180)',
    '&:hover': {
        color: 'white',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
    //   padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '0', // Initially collapse input width
      '&::placeholder': {
        color: 'rgb(180, 180, 180)', // Placeholder in white
        opacity: 0, // Hide placeholder by default
      },
      '&:focus': {
        width: '1ch', // Expand width when focused
        '&::placeholder': {
          opacity: 1, // Show placeholder only on focus
        },
      },
      [theme.breakpoints.up('sm')]: {
        width: '0.2ch', // Slightly visible width on larger screens
        '&:focus': {
          width: '10ch', // Expanded width on focus for larger screens
        },
      },
    },
  }));
  

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
            </div>

            <div className="search-and-menu">
                {/* New button to toggle search input visibility */}
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>

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
