import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'station'

export const stationLocalService = {
    query,
    getById,
    saveStation,
    removeStation,
    addStation
}

async function query(filterBy = { txt: '', genre: '' }) {
    var stations = await storageService.query(STORAGE_KEY)
    const { txt, genre, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(txt, 'i')
        stations = stations.filter(station => regex.test(station.name) || regex.test(station.description))
    }
    if (genre) {
        stations = stations.filter(station => station.genre === genre)
    }
    if (sortField === 'name' || sortField === 'artist') {
        stations.sort((s1, s2) => s1[sortField].localeCompare(s2[sortField]) * +sortDir)
    }

    return stations.map(({ _id, name, genre, artist }) => ({ _id, name, genre, artist }))
}

function getById(stationId) {
    return storageService.get(STORAGE_KEY, stationId)
}

async function removeStation(stationId) {
    await storageService.remove(STORAGE_KEY, stationId)
}

async function saveStation(station) {
    const stationToSave = {
        _id: station._id || makeId(),
        name: station.name,
        genre: station.genre,
        artist: station.artist || userService.getLoggedinUser()
    }
    return station._id
        ? await storageService.put(STORAGE_KEY, stationToSave)
        : await storageService.post(STORAGE_KEY, stationToSave)
}

async function addStation(name, genre) {
    const newStation = {
        _id: makeId(),
        name,
        genre,
        artist: userService.getLoggedinUser()
    }
    await storageService.post(STORAGE_KEY, newStation)
    return newStation
}
