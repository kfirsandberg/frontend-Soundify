
import { useEffect, useState } from "react"
import { StationList } from "../cmps/StationList"
import { stationLocalService } from "../services/station/station.service.local"


export function StationIndex() {

    const [stations, setStations] = useState(null)
    useEffect(() => {
        loadStation()
    }, [])
    function loadStation() {
        stationLocalService.query().then(data => {
            setStations(data)

        }).catch(error => {
            console.error('error from cmp :', error)
        })
    }

    if (!stations) {
        return (
            <div>loading...</div>
        )
    }
    return (
        <main className="station-index">
               <section>
                <img src="" alt="" />
                <ul>
                    {stations.map(station => (
                        <li key={station._id}>
                            <h3>{station.name}</h3>
                            <img src={station.imgURL} alt={station.imgURL}  />
                            <ul>
                                {station.songs.map(song => (
                                    <li key={song.id}>
                                        <h4>{song.title}</h4>
                                        <a href={song.url} target="_blank" rel="noopener noreferrer">Listen on YouTube</a>

                                        <img src={song.imgURL} alt={song.imgURL} />
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </section>
            {/* <StationList/> */}
        </main>
    )
}