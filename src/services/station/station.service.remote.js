import { httpService } from '../http.service'


const BASE_URL = 'station/'

export const stationServiceRemote = {
    query,
    getById,
    save,
    remove,
    // getEmptyToy,
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(stationId) {
    return httpService.get(BASE_URL + stationId)
}

function remove(stationId) {
    return httpService.delete(BASE_URL + stationId)
}
function save(station) {
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





