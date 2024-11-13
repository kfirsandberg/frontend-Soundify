import { useEffect, useState } from "react";
import { StationList } from "../cmps/StationList.jsx";
import { loadStations } from "../store/actions/station.actions.js";
import { NavBtns } from "../cmps/NavBtns.jsx";
import { LastStations } from "../cmps/LastStations.jsx";
import loaderIcon from '/assets/loader.svg';
import { useSelector } from 'react-redux';


export function StationIndex() {
    const stations = useSelector(storeState => storeState.stationModule.stations);
    useEffect(() => {
        loadStations();
        console.log(stations);
        
    }, []);
    

    if (!stations) {
        return (
            <div>
                <img src={loaderIcon} alt="Loading..." className="loader-icon-1" />
            </div>
        );
    }

    return (
        <main
            className="station-index">
            <NavBtns />
            <LastStations stations={stations} />
            <StationList stations={stations} />
        </main>
    );
}
