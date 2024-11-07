import { httpService } from '../http.service'

export const stationRemoteService = {
    query,
    getById,
    saveStation,
    removeStation,
    addStation
}

async function query(filterBy = { txt: '', genre: '' }) {
    return httpService.get('station', filterBy)
}

function getById(stationId) {
    return httpService.get(`station/${stationId}`)
}

async function removeStation(stationId) {
    return httpService.delete(`station/${stationId}`)
}

async function saveStation(station) {
    const url = station._id ? `station/${station._id}` : 'station'
    return station._id
        ? await httpService.put(url, station)
        : await httpService.post(url, station)
}

async function addStation(name, genre) {
    const newStation = {
        name,
        genre,
        owner: userService.getLoggedinUser()
    }
    return await httpService.post('station', newStation)
}
