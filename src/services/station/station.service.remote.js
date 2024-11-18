import { httpService } from '../http.service'


const BASE_URL = 'station/'

export const stationServiceRemote = {
    query,
    getById,
    saveStation,
    removeStation,
    // getEmptyToy,
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(stationId) {
    return httpService.get(BASE_URL + stationId)
}

function removeStation(stationId) {
    return httpService.delete(BASE_URL + stationId)
}
function saveStation(station) {
    const method = station._id ? 'put' : 'post'
    return httpService[method](BASE_URL, station)
}

// function getEmptyToy() {
//     return {
//         name: '',
//         price: '',
//         labels: _getRandomLabels(),
//     }
// }





