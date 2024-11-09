import { useEffect, useState } from "react";
import { stationLocalService } from "../services/station/station.service.local";

export function LibraryList({ filterCriteria, sortBy, isCollapsed }) {
    const [stations, setStations] = useState(null);

    useEffect(() => {
        loadStations();
    }, []);

    function loadStations() {
        stationLocalService.query()
            .then(data => {
                setStations(data);
            })
            .catch(error => {
                console.error('Error fetching stations:', error);
            });
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

    if (stations === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`library-list ${isCollapsed ? 'collapsed' : ''}`}>
            <ul>
                {filteredStations.map(station => (
                    <li key={station._id} className="station-card">
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
