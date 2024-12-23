import { stationLocalService } from '../../services/station/station.service.local.js'
import { stationService } from '../../services/station/'
import { spotifyService } from '../../services/search/spotify.service.remote.js'
import { chatService } from '../../services/chat/chat.service.remote.js'
import { detectLanguage } from '../../services/util.service.js'
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
    SET_SEARCHED_SONGS,
    REMOVE_SONG,
    SET_CURRENT_ARTIST,
    SET_IS_SEARCH
} from '../reducers/station.reducer'


export async function loadStations(filterBy) {
    try {
        const stations = await stationService.query()
        store.dispatch(getCmdSetStations(stations))
    } catch (err) {
        console.log('Cannot load stations', err)
        throw err
    }
}

export async function loadStation(station) {
    try {
        store.dispatch(getCmdSetStation(station))
        return station
    } catch (err) {
        console.log('Cannot load station', err)
        throw err
    }
}

export async function getStationById(stationId) {
    try {
        const station = await stationService.getById(stationId)
        store.dispatch(getCmdSetStation(station))
        return station
    } catch (err) {
        console.log('Cannot find station', err)
        throw err
    }
}


export async function removeStation(stationId) {
    try {
        await stationService.removeStation(stationId)
        store.dispatch(getCmdRemoveStation(stationId))
    } catch (err) {
        console.log('Cannot remove station', err)
        throw err
    }
}

export async function addStation(station) {
    try {
        const savedStation = await stationService.saveStation(station)
        store.dispatch(getCmdAddStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot add station', err)
        throw err
    }
}

export async function updateStation(station) {
    try {
        const savedStation = await stationService.saveStation(station)
        store.dispatch(getCmdUpdateStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot save station', err)
        throw err
    }
}


export async function addNewStation(stations) {
    try {
        // const savedStation = await stationLocalService.saveStation(newStation
        const newStation = await stationService.getNewStation(stations.length)
        store.dispatch(getCmdAddStation(newStation))
        store.dispatch(getCmdSetStation(newStation))
        return newStation
    } catch (err) {
        console.log('Cannot add station', err)
        throw err
    }
}
export async function loadSong(song) {
    let songToPlay = {}
    if (song.added_at) {
        songToPlay = song.track
    } else {
        songToPlay = song
    }

    try {
        const trackName = songToPlay.name;
        const artistNames = songToPlay.artists.map((artist) => artist.name).join(', ')
        const songString = `${trackName} ${artistNames}`
        const youtubeId = await stationService.getYoutubeID(songString)
        songToPlay.youtubeId = youtubeId
        store.dispatch(getCmdSetSong(songToPlay))
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

export async function removeSongFromLiked(songId) {
    try {
        const likedSongsStation = await stationLocalService.removeSongFromLikedSongs(songId)
        store.dispatch(getCmdSetStation(likedSongsStation))
    } catch (err) {
        console.log('Cannot remove song from Liked Songs', err)
    }
}
export async function search(query) {
    try {
        const searchedSongs = await spotifyService.searchSongs(query)

        store.dispatch(getCmdSongs(searchedSongs))
        return searchedSongs
    } catch (err) {
        console.log('Cannot load stations', err)
        throw err
    }
}

export async function chatSearch(query) {
    try {
        const formattedQuery = `תייצר לי ${query} בפורמט JSON שיהיה רק חמשה שירים, עם המבנה הבא:
        {
            "playlist": [
                {
                    "title": "שם השיר",
                    "artist": "שם האמן",
                    "genre": "הז'אנר",
                    "year": שנה
                }
            ]
        }`;

        const chatRes = await chatService.searchChat(formattedQuery)
        const backUpChat = {
            "playlist": [
                {
                    "title": "Happy Birthday",
                    "artist": "Stevie Wonder",
                    "genre": "Pop",
                    "year": 1980
                },
                {
                    "title": "Celebration",
                    "artist": "Kool & The Gang",
                    "genre": "Funk",
                    "year": 1980
                },
                {
                    "title": "Party Rock Anthem",
                    "artist": "LMFAO",
                    "genre": "Electronic",
                    "year": 2011
                },
                {
                    "title": "Dancing Queen",
                    "artist": "ABBA",
                    "genre": "Disco",
                    "year": 1976
                },
                {
                    "title": "Can't Stop the Feeling!",
                    "artist": "Justin Timberlake",
                    "genre": "Pop",
                    "year": 2016
                }
            ]
        }
        const songs = (chatRes?.playlist?.length > 0) ? chatRes.playlist : backUpChat.playlist;        
        const savedStation = await stationService.createNewStation(songs)
        store.dispatch(getCmdAddStation(savedStation))
        store.dispatch(getCmdSetStation(savedStation))
        return savedStation;
    } catch (err) {
        console.log('Cannot get chatgpt', err)
        throw err
    }
}

export async function removeSong(song, station) {
    try {
        const updatedTracks = station.tracks.filter(s => s.track.id !== song.track.id);
        const updatedStation = { ...station, tracks: updatedTracks };
        await stationService.removeSong(station._id, updatedStation)
        store.dispatch(getCmdUpdateStation(updatedStation))
        store.dispatch(getCmdSetStation(updatedStation))
    } catch (err) {
        console.log('Cannot remove song', err)
        throw err
    }
}

export async function addSong(song, station) {
    try {
        const updatedTracks = [...station.tracks, { track: song }];
        const updatedStation = { ...station, tracks: updatedTracks };
        await stationService.addSong(station._id, updatedStation)
        store.dispatch(getCmdUpdateStation(updatedStation))
        store.dispatch(getCmdSetStation(updatedStation))
    } catch (err) {
        console.log('Cannot add song to Liked Songs', err)
    }
}

export async function getArtist(artistId) {
    try {
        const artist = await spotifyService.getArtist(artistId)
        store.dispatch(getCmdArtist(artist))
    } catch (err) {
        console.log('Cannot find artist', err)
    }
}
export async function setIsSearch(isSearch) {
    try {
        store.dispatch(setCmdIsSearch(isSearch))
    } catch (err) {
        console.log('Cannot find artist', err)
    }
}

// Command Creators:
function getCmdSetStations(stations) {
    return {
        type: SET_STATIONS,
        stations,
    }
}
function getCmdSetStation(currentStation) {
    return {
        type: SET_STATION,
        currentStation,
    }
}

export function getCmdRemoveStation(stationId) {
    return {
        type: REMOVE_STATION,
        stationId,
    }
}
export function getCmdAddStation(station) {
    return {
        type: ADD_STATION,
        station,
    }
}
export function getCmdUpdateStation(station) {
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
function getCmdSongs(searchedSongs) {
    return {
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
export function getCmdArtist(currentArtist) {
    return {
        type: SET_CURRENT_ARTIST,
        currentArtist,
    }
}
export function setCmdIsSearch(isSearch) {
    console.log(isSearch);

    return {
        type: SET_IS_SEARCH,
        isSearch,
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
