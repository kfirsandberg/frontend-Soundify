import { httpService } from '../http.service'


const BASE_URL = 'station/'

export const stationServiceRemote = {
    query,
    getById,
    saveStation,
    removeStation,
    getEmptyStation,
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
function saveStation(station) {
    const method = station._id ? 'put' : 'post'
    return httpService[method](BASE_URL, station)
}

function getEmptyStation(name,stationSubtitle=''){
    let playlistCount = parseInt(localStorage.getItem('playlistCount'), 10) || 0
    playlistCount += 1
    const newStationName = name || `My Playlist #${playlistCount}`
    localStorage.setItem('playlistCount', playlistCount)
    return {
        name: newStationName,
        songs: getSongsForStation(newStationName) || [],
        _id,
        stationSubtitle
    }
}



