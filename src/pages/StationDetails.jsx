import { StationHeader } from '../cmps/StationHeader.jsx'
import { SongList } from '../cmps/SongList.jsx'

import { useEffect, useState } from 'react'
import loaderIcon from '/assets/loader.svg'
import { useNavigate, useParams } from 'react-router'
import { loadStation, setBgColor, getStationById, search } from '../store/actions/station.actions.js'
import { FastAverageColor } from 'fast-average-color'
import { useSelector } from 'react-redux'
import { debounce } from '../services/util.service.js';
import { StationSearch } from '../cmps/StationSearch.jsx'
import { SOCKET_EMIT_STATION_WATCH, SOCKET_EVENT_STATION_REMOVE, SOCKET_EVENT_STATION_UPDATE, socketService } from '../services/socket.service.js'
import { store } from '../store/store.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

const fac = new FastAverageColor()

export function StationDetails() {

    const [showFindMoreSection, setShowFindMoreSection] = useState(false)
    const [searchResult, setsearchResult] = useState(false)
    let station = useSelector(storeState => storeState.stationModule.currentStation)
    const { stationId } = useParams(null)
    useEffect(() => {
        socketService.on(SOCKET_EVENT_STATION_REMOVE, onStationRemove);

        setBgColorDetails(station)
        if (!station) {
            getStationById(stationId)
        }
        return () => {
            socketService.off(SOCKET_EVENT_STATION_REMOVE, onStationRemove);
        };
    }, [stationId])

    function onStationRemove(removedStationid) {
        if (removedStationid === stationId) {
            navigate('/');
        }
    }


    async function setBgColorDetails(station) {

        if (station && station.images[0].url) {
            try {
                const color = await fac.getColorAsync(station.images[0].url)
                // console.log('colorL',color)
                setBgColor(color.rgb) // Dispatch color to update background
            } catch (error) {
                // console.error('Error fetching average color:', error)
            }
        }
    }


    useEffect(() => {

        socketService.emit(SOCKET_EMIT_STATION_WATCH, station._id)
        socketService.on(SOCKET_EVENT_STATION_UPDATE, onStationUpdate)

        return () => {
            socketService.off(SOCKET_EVENT_STATION_UPDATE, onStationUpdate)
        }
    }, [station._id, station])

    function onStationUpdate(station) {
        showSuccessMsg('Playlist Updated.')

        store.dispatch({ type: 'UPDATE_STATION', station })
        store.dispatch({ type: 'SET_STATION', currentStation: station })

        setCurrStation(station)
        setSongs(station.tracks)
    }



    function onFindMore() {
        setShowFindMoreSection(prevState => !prevState)
    }

    const debouncedSearch = debounce(async (value) => {
        if (!value) return;
        try {
            const results = await search(value);
            setsearchResult(results)

            // navigate(`/search/${value}`)
            // navigate('/search');
        } catch (error) {
            console.error('Error during search:', error);
        }
    }, 300);


    async function handleInputChange(ev) {
        const value = ev.target.value;
        debouncedSearch(value);
    }

    function handleClearInput() {
        setSearchValue('');
    }

    function renderStationImage() {
        if (!station.songs || station.songs.length === 0 || showFindMoreSection) {
            return (
                <section>
                    <div className="add-station-container">
                        <div className="station-content">
                            <p>Let's find something for your playlist</p>
                            <div className="search-bar">
                                <input type="text" placeholder="Search for songs or episodes" onChange={handleInputChange} />
                                <button className="close-btn">✕</button>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
    }

    if (!station) {
        return <img src={loaderIcon} alt="Loading..." className="loader-icon" />
    }
    return (
        <section className="station-details-main">
            <StationHeader />
            <SongList />
            {renderStationImage()}
            <StationSearch />
        </section>
    )
}
