
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
                <StationList  stations = {stations}/>
            </section>
        </main>
    )
}