import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useSelector, useDispatch } from 'react-redux';
import { setStations, } from '../store/actions/station.actions.js'; // Import your actions here

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
    color: 'white',
    width: '100%',
    '& .MuiInputBase-input': {
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '0',
        '&::placeholder': {
            color: 'rgb(180, 180, 180)',
            opacity: 0,
        },
        '&:focus': {
            width: '1ch',
            '&::placeholder': {
                opacity: 1,
            },
        },
        [theme.breakpoints.up('sm')]: {
            width: '0.2ch',
            '&:focus': {
                width: '10ch',
            },
        },
    },
}));

export function FilterLibrary({ setFilterCriteria, setSortBy }) {
    const dispatch = useDispatch();

    // Get stations and current station from the Redux store
    const stations = useSelector((state) => state.stationModule.stations);
    const currentStation = useSelector((state) => state.stationModule.currentStation);

    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedSort, setSelectedSort] = useState('Recents');

    // Handle search input changes
    function handleSearchChange(event) {
        const term = event.target.value;
        setSearchTerm(term);

        // Update filter criteria and filter stations
        setFilterCriteria(term); // Call parent function if needed
        const filteredStations = stations.filter((station) =>
            station.name.toLowerCase().includes(term.toLowerCase())
        );

        dispatch(setStations(filteredStations)); // Dispatch the filtered stations
    }

    // Handle sorting
    function handleSortClick(sortType) {
        let sortedStations;

        switch (sortType) {
            case 'Recents':
                sortedStations = [...stations].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                break;
            case 'Recently Added':
                sortedStations = [...stations].sort(
                    (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
                );
                break;
            case 'Alphabetical':
                sortedStations = [...stations].sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                break;
            default:
                sortedStations = [...stations];
                break;
        }

        setSortBy(sortType); // Call parent function if needed
        setSelectedSort(sortType); // Update selected sort
        setShowModal(false); // Close modal
        dispatch(setStations(sortedStations)); // Dispatch sorted stations
    }

    return (
        <header className="filter-library">
            <div className="sort-buttons">
                <button onClick={() => handleSortClick('Playlists')}>Playlists</button>
                <button onClick={() => handleSortClick('Artists')}>Artists</button>
            </div>

            <div className="search-and-menu">
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchTerm}
                        onChange={handleSearchChange} // Handle search input
                    />
                </Search>

                <div className="sort-container">
                    <div className="hamburger-menu">
                        <button
                            className="hamburger-btn"
                            onClick={() => setShowModal((prev) => !prev)}
                        >
                            {selectedSort && (
                                <span className="selected-sort">{selectedSort}</span>
                            )}
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
                            <button onClick={() => handleSortClick('Recents')}>
                                Recents
                            </button>
                            <button onClick={() => handleSortClick('Recently Added')}>
                                Recently Added
                            </button>
                            <button onClick={() => handleSortClick('Alphabetical')}>
                                Alphabetical
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
