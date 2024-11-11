
import { useEffect, useState } from "react"
import { StationList } from "../cmps/StationList"
import { loadStations } from "../store/actions/station.actions.js";

import { useSelector } from 'react-redux'

export function StationIndex() {
    const stations = useSelector(storeState => storeState.stationModule.stations) 
    useEffect(() => {
        loadStations()
    }, [])
    if (!stations) {
        return <div>loading...</div>
    }
    return (
        <main className="station-index">
                <StationList stations={stations} />
        </main>
    )
}
