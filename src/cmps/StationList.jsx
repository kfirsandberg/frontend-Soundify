import { StationPreview } from "../cmps/StationPreview.jsx";
import { useNavigate } from 'react-router-dom';
import { loadStation } from "../store/actions/station.actions.js";

export function StationList({ stations }) {

    const navigate = useNavigate();
    async function onClickStation(station) {
        navigate(`/playlist/${station._id}`);
        loadStation(station._id);
    }


    function handleShowAll() {
        navigate('/all-stations');
    }

    return (
        <section className="station-list-container">
            <header className="station-list-header-container">
                <h2 className="station-list-header">Created for you</h2>
                <button className="show-all-btn" onClick={handleShowAll}>
                    Show all
                </button>
            </header>
            <section className="station-list">
                {stations.map(station => (
                    <div className="station-preview"
                        key={station._id}
                        onClick={() => onClickStation(station)}
                    >
                        <StationPreview station={station} />
                    </div>
                ))}
            </section>
        </section>
    );
}
