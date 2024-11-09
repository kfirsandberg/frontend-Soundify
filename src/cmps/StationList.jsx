import { StationPreview } from "../cmps/StationPreview.jsx"
export function StationList({ stations }) {
    console.log(stations)
    return (
        <section className="station-list">
            {stations.map(station => (
                <StationPreview key={station._id} station={station} />
            ))}
        </section>
    )
}