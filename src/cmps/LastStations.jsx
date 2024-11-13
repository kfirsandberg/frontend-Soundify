import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStation } from '../store/actions/station.actions.js';

export function LastStations({ stations }) {
    const displayedStations = stations.slice(0, 8);
    const navigate = useNavigate();

    function onClickStation(station) {
        navigate(`/playlist/${station._id}`);
        loadStation(station._id);
    }

    if (!stations) {
        return <div>Loading...</div>;
    }

    return (
        <div className="last-stations-grid">
            {displayedStations.map((station, index) => (
                <div className="playlist-card" key={index} onClick={() => onClickStation(station)}>
                    <img src={station.imgURL} alt={station.name} className="playlist-thumbnail" />
                    <div className="playlist-info">
                        <div className="playlist-name">{station.name}</div>
                    </div>
                    <div className="playlist-play-btn">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                        >
                            <path d="M7.05 3.606l13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394a.7.7 0 0 1-1.05-.606V4.212a.7.7 0 0 1 1.05-.606z" />
                        </svg>
                    </div>
                </div>
            ))}
        </div>
    );
}
