import { useEffect, useState } from 'react'
import { StationList } from '../cmps/StationList.jsx'
import { getCmdAddStation, getCmdRemoveStation, loadStations } from '../store/actions/station.actions.js'
import { NavBtns } from '../cmps/NavBtns.jsx'
import { LastStations } from '../cmps/LastStations.jsx'
import loaderIcon from '/assets/loader.svg'
import { useSelector } from 'react-redux'
import { loadStation, setBgColor } from '../store/actions/station.actions.js'
import { SOCKET_EMIT_STATIONS_WATCH, SOCKET_EVENT_STATION_ADD, SOCKET_EVENT_STATION_REMOVE, socketService } from '../services/socket.service.js'
import { useDispatch } from 'react-redux'
import { showSuccessMsg } from '../services/event-bus.service.js'


export function StationIndex() {
    const isSearch = useSelector(storeState => storeState.stationModule.isSearch)
    useEffect(() => {
        console.log(isSearch);
        
    }, [isSearch])

    const stations = useSelector(storeState => storeState.stationModule.stations)
    // console.log(stations);

    const dispatch = useDispatch()

    
    useEffect(() => {
        socketService.on(SOCKET_EVENT_STATION_ADD, handleStationAdd)
        socketService.on(SOCKET_EVENT_STATION_REMOVE, handleStationRemove)
    
        return () => {
            socketService.off(SOCKET_EVENT_STATION_ADD, handleStationAdd)
            socketService.off(SOCKET_EVENT_STATION_REMOVE, handleStationRemove)
        }
    }, [dispatch, stations])
    

    function handleStationAdd  (station)  {
        if (!station || stations.some((s) => s._id === station._id)) return
        dispatch(getCmdAddStation(station))
        showSuccessMsg('Playlist Added.');
    }

    function handleStationRemove ({ id })  {
        dispatch(getCmdRemoveStation(id))
        showSuccessMsg('Playlist Removed.')
    }

    if (!stations) {
        return (
            <div>
                <img src={loaderIcon} alt="Loading..." className="loader-icon-1" />
            </div>
        )
    }
    if (isSearch) {
        return <img src={loaderIcon} alt="Loading..." className="loader-icon" />
    }
    return (
        <main className="station-index">
            <NavBtns />
            <LastStations />
            <StationList />
        </main>
    )
}
