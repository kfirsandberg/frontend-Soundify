import React, { useEffect } from 'react';
import { StationPreview } from "../cmps/StationPreview.jsx";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setStations } from "../store/actions/station.actions.js"; // Create a sync action

export function AllStations() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stations = useSelector(state => state.stationModule.stations);

    useEffect(() => {
        async function fetchStations() {
            try {
                const response = await loadStations(); // Assume loadStations() returns a promise with data
                dispatch(setStations(response)); // Dispatches the plain object action
            } catch (error) {
                console.error("Failed to load stations:", error);
            }
        }
        fetchStations();
    }, [dispatch]);

    function onClickStation(station) {
        navigate(`/playlist/${station._id}`);
    }

    return (
        <section className="all-stations-container">
            <header className="all-stations-header">
                <h2 className="all-stations-header">All Stations</h2>
            </header>
            <section className="all-stations-list">
                {stations.map(station => (
                    <button 
                        className="all-station-preview"
                        key={station._id}
                        onClick={() => onClickStation(station)}
                    >
                        <StationPreview station={station} />
                    </button>
                ))}
            </section>
        </section>
    );
}
