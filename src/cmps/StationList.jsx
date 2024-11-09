import { StationPreview } from "../cmps/StationPreview.jsx"
import { useNavigate } from 'react-router-dom';

import { loadStation } from "../store/actions/station.actions.js";
export function StationList({ stations }) {
    const navigate = useNavigate()

    function onClickStation(station) {
        // console.log('Station clicked:', station);
        navigate(`/station/${station._id}`)
        loadStation(station._id)
    }

    return (
        <section className="station-list">
            {stations.map(station => (
                <button
                    key={station._id}
                    onClick={() => onClickStation(station)} // Pass the station's _id to the click handler
                >
                    <StationPreview station={station} />
                </button>
            ))}

        </section>
    )
}