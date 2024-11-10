import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stationLocalService } from "../services/station/station.service.local";
import { loadStation } from "../store/actions/station.actions.js";

export function LibraryList({ filterCriteria, sortBy, isCollapsed }) {
    const [stations, setStations] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStations();
    }, []);

    const loadStations = async () => {
        try {
            const data = await stationLocalService.query();
            setStations(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching stations:', error);
            setLoading(false);
        }
    };

    const onClickStation = (station) => {
        navigate(`/station/${station._id}`);
        loadStation(station._id);
    };

    // Check if stations are loaded before attempting to filter or sort
    let filteredStations = stations;

    if (stations && filterCriteria) {
        filteredStations = stations.filter(station =>
            station.name.toLowerCase().includes(filterCriteria.toLowerCase())
        );
    }

    if (stations && sortBy) {
        if (sortBy === "recents") {
            filteredStations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === "recentlyAdded") {
            filteredStations.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
        } else if (sortBy === "alphabetical") {
            filteredStations.sort((a, b) => a.name.localeCompare(b.name));
        }
    }

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className={`library-list ${isCollapsed ? 'collapsed' : ''}`}>
            <ul>
                {filteredStations.map(station => (
                    <li
                        key={station._id}
                        className="station-card"
                        onClick={() => onClickStation(station)}
                    >
                        <img src={station.imgURL} alt={station.name} className="station-image" />
                        {!isCollapsed && (
                            <div className="station-info">
                                <h3 className="station-name">{station.name}</h3>
                                <p className="station-artist">{station.artist}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
