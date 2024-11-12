import { useEffect, useState } from "react"
import { StationList } from "../cmps/StationList"
import { loadStations } from "../store/actions/station.actions.js";
import { NavBtns } from "../cmps/NavBtns.jsx";
import { LastStations } from "../cmps/LastStations.jsx"

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
            <NavBtns/>
            <LastStations stations={stations}/>
            <StationList stations={stations} />
        </main>
    )
}
