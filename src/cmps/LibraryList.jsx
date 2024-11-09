import { useEffect, useState } from "react"
import { stationLocalService } from "../services/station/station.service.local"

export function LibraryList() {
    const [stations, setStations] = useState(null)  // Initializing stations state

    useEffect(() => {
        loadStations()
    }, [])  // Run this effect only once when component mounts

    function loadStations() {
        stationLocalService.query()
            .then(data => {
                setStations(data)  // Set stations data from local service
            })
            .catch(error => {
                console.error('Error fetching stations:', error)
            })
    }

    // Loading state to display while data is being fetched
    if (stations === null) {
        return <div>Loading...</div>
    }

    return (
        <div className="library-list">
            <ul>
                {stations.map(station => (
                    <li key={station._id}>
                        <h3>{station.name}</h3>
                        <img src={station.imgURL} alt={station.name} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
