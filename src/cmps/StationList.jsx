import { StationPreview } from "../cmps/StationPreview.jsx";
import { useNavigate } from 'react-router-dom';
import { FastAverageColor } from 'fast-average-color';
import { loadStation } from "../store/actions/station.actions.js";

const fac = new FastAverageColor();

export function StationList({ stations }) {

    const navigate = useNavigate();
    async function onClickStation(station) {
        // console.log(station.imgURL)
        // try {
        //     const color = await fac.getColorAsync(station.imgURL);
        //     console.log('Average color:', color.rgb);  
        // } catch (error) {
        //     console.error('Error fetching average color:', error);
        // }
    
        navigate(`/playlist/${station._id}`);
        loadStation(station._id);
    }


    function handleShowAll() {
        // Define the behavior when "Show all" is clicked, e.g., navigate to a full list page.
        navigate('/all-stations'); // Adjust the route as needed
    }

    return (
        <section className="station-list-container">
            <header className="station-list-header-container">
                <h2 className="station-list-header">Created for you</h2>
                <button className="station-list-header-2" onClick={handleShowAll}>
                    Show all
                </button>
            </header>
            <section className="station-list">
                {stations.slice(0, 7).map(station => (
                    <button className="station-preview"
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
