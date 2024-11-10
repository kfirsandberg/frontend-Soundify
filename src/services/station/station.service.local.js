import { storageService } from '../async-storage.service'

import { userService } from '../user'
import { loadFromStorage, saveToStorage, makeId } from '../util.service'
const STORAGE_KEY = 'station'

export const stationLocalService = {
    query,
    getById,
    getSongById,
    saveStation,
    removeStation,
    addStation,
}

_createStations()

async function query(filterBy = { txt: '', genre: '' }) {
    let stations = await storageService.query(STORAGE_KEY)
    // const { txt, genre, sortField, sortDir } = filterBy

    // if (txt) {
    //     const regex = new RegExp(txt, 'i')
    //     stations = stations.filter(station => regex.test(station.name) || regex.test(station.description))
    // }
    // if (genre) {
    //     stations = stations.filter(station => station.genre === genre)
    // }
    // if (sortField === 'name' || sortField === 'artist') {
    //     stations.sort((s1, s2) => s1[sortField].localeCompare(s2[sortField]) * +sortDir)
    // }

    // return stations.map(({ _id, name, genre }) => ({ _id, name, genre }))
    return stations
}

function getById(stationId) {
    return storageService.get(STORAGE_KEY, stationId)
}

async function getSongById(songId) {
    const stations = await query()

    for (let station of stations) {
        const song = station.songs.find(song => song.id === songId)
        if (song) {
            return song
        }
    }

    return null
}

async function removeStation(stationId) {
    await storageService.remove(STORAGE_KEY, stationId)
}

async function saveStation(station) {
    const stationToSave = {
        _id: station._id || makeId(),
        name: station.name,
        genre: station.genre,
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
    }
    await storageService.post(STORAGE_KEY, newStation)
    return newStation
}

async function _createStations() {
    let stations = loadFromStorage(STORAGE_KEY)

    if (!stations || !stations.length) {
        stations = []
        // Create several example stations
        stations.push(_createStation('Funky Monks'))
        stations.push(_createStation('Rock Vibes'))
        stations.push(_createStation('Chill Beats'))
        stations.push(_createStation('Hip Hop Essentials'))
        stations.push(_createStation('Electronic Escape'))

        saveToStorage(STORAGE_KEY, stations)
    }
    return stations
}

function _createStation(name) {
    const station = getEmptyStation(name)
    station._id = makeId()
    return station
}

function getEmptyStation(name = '') {
    const songs = getSongsForStation(name)
    return {
        name,
        imgURL: songs[0].imgURL, // Use the first song's imgURL
        songs,
    }
}

function getVideoIdFromUrl(url) {
    // Extract the video ID from the YouTube URL
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v");
}

function getSongsForStation(playlistName) {
    const songLibrary = {
        'Funky Monks': [
            {
                title: 'The Meters - Cissy Strut',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=4_iC0MyIykM'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
            },
            {
                title: "The JB's - Pass The Peas",
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=mUkfiLjooxs'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
            },
            {
                title: 'James Brown - Funky President',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=OZCFd0zP5BU'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/OZCFd0zP5BU/mqdefault.jpg',
            },
        ],
        'Rock Vibes': [
            {
                title: 'Led Zeppelin - Whole Lotta Love',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=HQmmM_qwG4k'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/HQmmM_qwG4k/mqdefault.jpg',
            },
            {
                title: 'AC/DC - Back In Black',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=pAgnJDJN4VA'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/pAgnJDJN4VA/mqdefault.jpg',
            },
            {
                title: 'Queen - Bohemian Rhapsody',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=fJ9rUzIMcZQ'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/mqdefault.jpg',
            },
        ],
        'Chill Beats': [
            {
                title: 'Jinsang - Affection',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=T5o_0BoTvWg'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/T5o_0BoTvWg/mqdefault.jpg',
            },
            {
                title: 'Idealism - Controlla',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=E5Z3CJZ7Sg0'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/E5Z3CJZ7Sg0/mqdefault.jpg',
            },
            {
                title: 'Aso - Seasons',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=Cy8x0RRlnOM'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/Cy8x0RRlnOM/mqdefault.jpg',
            },
        ],
        'Hip Hop Essentials': [
            {
                title: 'Wu-Tang Clan - C.R.E.A.M.',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=PBwAxmrE194'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/PBwAxmrE194/mqdefault.jpg',
            },
            {
                title: 'Nas - N.Y. State of Mind',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=hI2hK94_Sms'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/hI2hK94_Sms/mqdefault.jpg',
            },
            {
                title: 'A Tribe Called Quest - Electric Relaxation',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=WHRnvjCkTsw'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/WHRnvjCkTsw/mqdefault.jpg',
            },
        ],
        'Electronic Escape': [
            {
                title: 'Deadmau5 - Strobe',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=tKi9Z-f6qX4'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/tKi9Z-f6qX4/mqdefault.jpg',
            },
            {
                title: 'Daft Punk - One More Time',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=FGBhQbmPwH8'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/FGBhQbmPwH8/mqdefault.jpg',
            },
            {
                title: 'The Chemical Brothers - Galvanize',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=Xu3FTEmN-eg'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/Xu3FTEmN-eg/mqdefault.jpg',
            },
        ],
    };

    return songLibrary[playlistName] || [];
}

