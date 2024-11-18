import { stationLocalService } from '../../services/station/station.service.local.js'
import { stationService } from '../../services/station/'

import { searchSongs } from '../../services/search/search.service.js'
import { store } from '../store.js'
import {
    ADD_STATION,
    REMOVE_STATION,
    SET_STATIONS,
    SET_STATION,
    UPDATE_STATION,
    SET_SONG,
    SET_CURRENT_TIME,
    SET_SONG_DURATION,
    SET_VOLUME,
    SET_IS_PLAYING,
    SET_BG_COLOR,
    SET_SEARCHED_SONGS
} from '../reducers/station.reducer'


export async function loadStations(filterBy) {
    try {        
        const stations = await  stationService.query()
        store.dispatch(getCmdSetStations(stations.data))
    } catch (err) {
        console.log('Cannot load stations', err)
        throw err
    }
}


export async function search(query) {
    try {
        const searchedSongs=await searchSongs(query)
        store.dispatch(getCmdSongs(searchedSongs))
        return searchedSongs
    } catch (err) {
        console.log('Cannot load stations', err)
        throw err
    }
}

export async function loadStation(stationId) {
    try {
        const station = await stationLocalService.getById(stationId)
        // const station = await stationLocalService.getById(stationId)
        store.dispatch(getCmdSetStation(station))
        return station
    } catch (err) {
        console.log('Cannot load station', err)
        throw err
    }
}

export async function loadStationByName(stationName) {
    try {
        const stations = await stationLocalService.query(); 
        const station = stations.find(station => station.name === stationName);

        if (!station) {
            throw new Error(`Station with name "${stationName}" not found`);
        }

        store.dispatch(getCmdSetStation(station));
        return station;
    } catch (err) {
        console.log('Cannot load station', err);
        throw err;
    }
}

export async function removeStation(stationId) {
    try {
        await stationLocalService.removeStation(stationId)
        store.dispatch(getCmdRemoveStation(stationId))
    } catch (err) {
        console.log('Cannot remove station', err)
        throw err
    }
}

export async function addStation(station) {
    try {
        const savedStation = await stationLocalService.saveStation(station)
        store.dispatch(getCmdAddStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot add station', err)
        throw err
    }
}
export async function addNewStation() {
    try {
        const newStation = stationLocalService.getEmptyStation()
        const savedStation = await stationLocalService.saveStation(newStation)
        store.dispatch(getCmdSetStation(savedStation))
        store.dispatch(getCmdAddStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot add station', err)
        throw err
    }
}

export async function updateStation(station) {
    try {
        const savedStation = await stationLocalService.saveStation(station)
        store.dispatch(getCmdUpdateStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot save station', err)
        throw err
    }
}

export async function loadSong(songId) {
    try {
        const song = await stationLocalService.getSongById(songId)
        store.dispatch(getCmdSetSong(song))
    } catch (err) {
        console.log('Cannot load song', err)
        throw err
    }
}

export function updateCurrentTime(currentTime) {
    try {
        store.dispatch(getCmdSetCurrentTime(currentTime))
    } catch (err) {
        console.log('Cannot set current time', err)
        throw err
    }
}

export function updateSongDuration(songDuration) {
    try {
        store.dispatch(getCmdSetSongDuration(songDuration))
    } catch (err) {
        console.log('Cannot set song duration', err)
        throw err
    }
}

export function updateVolume(volume) {
    try {
        store.dispatch(getCmdSetVolume(volume))
    } catch (err) {
        console.log('Cannot set volume', err)
        throw err
    }
}

export function setIsPlaying(isPlaying) {
    try {
        store.dispatch(getCmdSetIsPlaying(isPlaying))
    } catch (err) {
        console.log('Cannot set is playing', err)
        throw err
    }
}

export function setBgColor(bgColor) {
    try {
        store.dispatch(getCmdSetBgColor(bgColor))
    } catch (err) {
        console.log('Cannot set is playing', err)
        throw err
    }
}

export async function addSongToLiked(song) {
    try {
        const likedSongsStation = await stationLocalService.addSongToLikedSongs(song)
        store.dispatch(getCmdSetStation(likedSongsStation))
    } catch (err) {
        console.log('Cannot add song to Liked Songs', err)
    }
}

export async function removeSongFromLiked(songId) {
    try {
        const likedSongsStation = await stationLocalService.removeSongFromLikedSongs(songId)
        store.dispatch(getCmdSetStation(likedSongsStation))
    } catch (err) {
        console.log('Cannot remove song from Liked Songs', err)
    }
}
export async function setCurrentStation(stationIdOrName) {
    try {

        const station = await stationLocalService.getById(stationIdOrName) || 
                        await stationLocalService.getStationByName(stationIdOrName);

        if (!station || !station.songs || station.songs.length === 0 ) {
            console.log(`Station not found: ${stationIdOrName}`);
            return;
        }
        store.dispatch(getCmdSetStation(station));
        return station;
    } catch (err) {
        console.log('Cannot set current station', err);
        throw err;
    }
}




// Command Creators:
 function getCmdSetStations(stations) {
    return {
        type: SET_STATIONS,
        stations,
    }
}
function getCmdSetStation(station) {
    return {
        type: SET_STATION,
        station,
    }
}
function getCmdRemoveStation(stationId) {
    return {
        type: REMOVE_STATION,
        stationId,
    }
}
function getCmdAddStation(station) {
    return {
        type: ADD_STATION,
        station,
    }
}
function getCmdUpdateStation(station) {
    return {
        type: UPDATE_STATION,
        station,
    }
}

function getCmdSetSong(song) {
    return {
        type: SET_SONG,
        song,
    }
}
function getCmdSetCurrentTime(currentTime) {
    return {
        type: SET_CURRENT_TIME,
        currentTime,
    }
}
function getCmdSetSongDuration(songDuration) {
    return {
        type: SET_SONG_DURATION,
        songDuration,
    }
}
function getCmdSetVolume(volume) {
    return {
        type: SET_VOLUME,
        volume,
    }
}
function getCmdSetIsPlaying(isPlaying) {
    return {
        type: SET_IS_PLAYING,
        isPlaying,
    }
}
function getCmdSongs(searchedSongs){
    return{
        type: SET_SEARCHED_SONGS,
        searchedSongs,
    }
}
export function setStations(stations) {
    return {
        type: 'SET_STATIONS',
        stations,
    }
}
export function getCmdSetBgColor(bgColor) {
    return {
        type: SET_BG_COLOR,
        bgColor,
    }
}
export function getCmdSetSearchedSongs(songs) {
    return {
        type: SET_SEARCHED_SONGS,
        songs,
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadStations()
    await addStation(stationLocalService.getEmptyStation())
    await updateStation({
        _id: 'm1oC7',
        title: 'station-Good',
    })
    await removeStation('m1oC7')
}

export { getCmdSetSong }
