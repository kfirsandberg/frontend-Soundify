import { useEffect, useState } from 'react'
import { StationList } from '../cmps/StationList.jsx'
import { loadStations } from '../store/actions/station.actions.js'
import { NavBtns } from '../cmps/NavBtns.jsx'
import { LastStations } from '../cmps/LastStations.jsx'
import loaderIcon from '/assets/loader.svg'
import { useSelector } from 'react-redux'
import { loadStation, setBgColor } from '../store/actions/station.actions.js'
import { SOCKET_EMIT_STATIONS_WATCH, SOCKET_EVENT_STATION_ADD, SOCKET_EVENT_STATION_REMOVE, socketService } from '../services/socket.service.js'
import { useDispatch } from 'react-redux'

export function StationIndex() {
    const stations = useSelector(storeState => storeState.stationModule.stations)
    // console.log(stations);

    const dispatch = useDispatch()

    useEffect(() => {

        socketService.emit(SOCKET_EVENT_STATION_ADD, station=>{
           dispatch(getCmdAddStation(station))
        showSuccessMsg('Playlist Addded.')

        })
        socketService.emit(SOCKET_EVENT_STATION_REMOVE, station=>{
            dispatch(getCmdRemoveStation(station._id))
        showSuccessMsg('Playlist Removed.')

         })
        return () => {
            socketService.off(SOCKET_EVENT_STATION_ADD)
            socketService.off(SOCKET_EVENT_STATION_REMOVE)
        }
    }, [stations])





    if (!stations) {
        return (
            <div>
                <img src={loaderIcon} alt="Loading..." className="loader-icon-1" />
            </div>
        )
    }

    return (
        <main className="station-index">
            <NavBtns />
            <LastStations />
            <StationList />
        </main>
    )
}
