import { httpService } from '../http.service'


const BASE_URL = 'station/'

export const stationServiceRemote = {
    query,
    getById,
    saveStation,
    removeStation,
    getNewStation,
    getYoutubeID,
    removeSong,
    addSong,
    createNewStation
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy).then(((res => res.data)))
}

function getById(stationId) {
    return httpService.get(BASE_URL + stationId).then(((res => res.data)))
}

function removeStation(stationId) {
    return httpService.delete(BASE_URL + stationId)
}
function removeSong(stationId, updatedData) {
    return httpService.put(BASE_URL + stationId, updatedData).then(((res => res.data)))
}
function addSong(stationId, updatedData) {
    return httpService.put(BASE_URL + stationId, updatedData).then(((res => res.data)))
}
function saveStation(station) {
    const method = station._id ? 'put' : 'post'
    console.log(station);

    return httpService[method](BASE_URL + (station._id || ''), station)
}

function getYoutubeID(songName) {
    return httpService.get('youtube/search?q=' + songName).then(((res => res.data)))
}

function getNewStation(stationsNum) {
    return httpService.post(`station/${stationsNum}`).then(((res => res.data)))
}

function createNewStation(station) {
    return httpService.post(`chat/send`,station).then(((res => res.data)))
}


