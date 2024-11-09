import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Make sure you import useNavigate from react-router-dom
import { stationLocalService } from "../services/station/station.service.local";
import { loadStation } from "../store/actions/station.actions.js"

export function LibraryList({ filterCriteria, sortBy, isCollapsed }) {
    const [stations, setStations] = useState(null);
    const navigate = useNavigate(); // Initialize navigate
    const [loading, setLoading] = useState(true); // Optional loading state

    useEffect(() => {
        loadStations();
    }, []);

    function loadStations() {
        stationLocalService.query()
            .then(data => {
                setStations(data);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(error => {
                console.error('Error fetching stations:', error);
                setLoading(false); // Ensure loading is false even on error
            });
    }

    function onClickStation(station) {
        navigate(`/station/${station._id}`); // Navigate to station page
        loadStation(station._id); // Load the station data (implement this function as needed)
    }

    let filteredStations = stations;

    if (filterCriteria) {
        filteredStations = stations.filter(station =>
            station.name.toLowerCase().includes(filterCriteria.toLowerCase())
        );
    }

    if (sortBy) {
        if (sortBy === "recents") {
            filteredStations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === "recentlyAdded") {
            filteredStations.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
        } else if (sortBy === "alphabetical") {
            filteredStations.sort((a, b) => a.name.localeCompare(b.name));
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`library-list ${isCollapsed ? 'collapsed' : ''}`}>
            <ul>
                {filteredStations.map(station => (
                    <li
                        key={station._id}
                        className="station-card"
                        onClick={() => onClickStation(station)} // Bind the click handler
                    >
                        {/* Show only the image if collapsed */}
                        <img
                            src={station.imgURL}
                            alt={station.name}
                            className="station-image"
                        />
                        {!isCollapsed && (
                            <div className="station-info">
                                <h3 className="station-name">{station.name}</h3>
                                <p className="station-artist">{station.artist}</p> {/* Add artist name here */}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
