import { stationLocalService } from '../../services/station/station.service.local.js'
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
} from '../reducers/station.reducer'

export async function loadStations(filterBy) {
    try {
        // const stations = await stationService.query(filterBy)
        const stations = await stationLocalService.query()
        store.dispatch(getCmdSetStations(stations))
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
    } catch (err) {
        console.log('Cannot load station', err)
        throw err
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

export async function updateStation(station) {
    try {
        const savedStation = await stationLocalService.save(station)
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
