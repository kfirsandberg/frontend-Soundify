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
    getEmptyStation,
    removeSong,
    addSong,
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

async function removeSong(song, stationId) {
    let stations = await storageService.query(STORAGE_KEY)

    const stationIdx = stations.findIndex(station => station._id === stationId)
    if (stationIdx === -1) throw new Error('Station not found')

    const songIdx = stations[stationIdx].songs.findIndex(song => song.id === songId)
    if (songIdx === -1) throw new Error('Song not found in station')

    stations[stationIdx].songs.splice(songIdx, 1)

    await saveToStorage(STORAGE_KEY, stations)
    return stations[stationIdx]
}

async function addSong(song, stationId) {
    let stations = await storageService.query(STORAGE_KEY)

    const stationIdx = stations.findIndex(station => station._id === stationId)
    if (stationIdx === -1) throw new Error('Station not found')

    stations[stationIdx].songs.push(song)
    await saveToStorage(STORAGE_KEY, stations)

    return stations[stationIdx]
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
        stations.push(_createStation('Hip Hop Essentials'))
        stations.push(_createStation('Electronic Escape'))
        stations.push(_createStation('Jazz Classics'))
        stations.push(_createStation('Reggae Vibes'))
        stations.push(_createStation('Israeli Vibes'))
        stations.push(_createStation('Funky Monks'))
        stations.push(_createStation('Rock Vibes'))
        stations.push(_createStation('Hip Hop Essentials'))
        stations.push(_createStation('Electronic Escape'))
        stations.push(_createStation('Jazz Classics'))
        stations.push(_createStation('Reggae Vibes'))
        stations.push(_createStation('Israeli Vibes'))

        saveToStorage(STORAGE_KEY, stations)
    }
    return stations
}

function _createStation(name) {
    const station = getEmptyStation(name)

    if (station.songs && station.songs.length > 0) {
        station.imgURL = station.songs[0].imgURL // Use the first song's imgURL if exists
    } else {
        station.imgURL =
            'https://res.cloudinary.com/dwzeothxl/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1731394907/Screenshot_2024-11-12_085302_pmlaey.png'
    }
    return station
}

function getEmptyStation(name = 'My Playlist') {
    const songs = getSongsForStation(name)
    return {
        name,
        imgURL: null,
        songs,
        _id: makeId(),
    }
}

function getVideoIdFromUrl(url) {
    const urlObj = new URL(url)
    return urlObj.searchParams.get('v')
}

function getSongsForStation(playlistName) {
    const songLibrary = {
        'Funky Monks': [
            {
                title: 'The Meters - Cissy Strut',
                artist: 'The Meters',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=4_iC0MyIykM'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
            },
            {
                title: "The JB's - Pass The Peas",
                artist: "The JB's",
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=mUkfiLjooxs'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
            },

            {
                title: 'Parliament - Give Up The Funk',
                artist: 'Parliament',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=3WOZwwRH6XU'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/3WOZwwRH6XU/mqdefault.jpg',
            },
            {
                title: 'The Meters - Cissy Strut',
                artist: 'The Meters',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=4_iC0MyIykM'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
            },
            {
                title: "The JB's - Pass The Peas",
                artist: "The JB's",
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=mUkfiLjooxs'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
            },

            {
                title: 'Parliament - Give Up The Funk',
                artist: 'Parliament',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=3WOZwwRH6XU'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/3WOZwwRH6XU/mqdefault.jpg',
            },
        ],
        'Rock Vibes': [
            {
                title: 'Led Zeppelin - Whole Lotta Love',
                artist: 'Led Zeppelin',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=HQmmM_qwG4k'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/HQmmM_qwG4k/mqdefault.jpg',
            },
            {
                title: 'AC/DC - Back In Black',
                artist: 'AC/DC',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=pAgnJDJN4VA'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/pAgnJDJN4VA/mqdefault.jpg',
            },
            {
                title: 'Queen - Bohemian Rhapsody',
                artist: 'Queen',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=fJ9rUzIMcZQ'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/mqdefault.jpg',
            },
            {
                title: 'Pink Floyd - Comfortably Numb',
                artist: 'Pink Floyd',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=_FrOQC-zEog'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/_FrOQC-zEog/mqdefault.jpg',
            },
            {
                title: 'The Rolling Stones - Paint It Black',
                artist: 'The Rolling Stones',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=O4irXQhgMqg'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/O4irXQhgMqg/mqdefault.jpg',
            },
            {
                title: 'Led Zeppelin - Whole Lotta Love',
                artist: 'Led Zeppelin',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=HQmmM_qwG4k'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/HQmmM_qwG4k/mqdefault.jpg',
            },
            {
                title: 'AC/DC - Back In Black',
                artist: 'AC/DC',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=pAgnJDJN4VA'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/pAgnJDJN4VA/mqdefault.jpg',
            },
            {
                title: 'Queen - Bohemian Rhapsody',
                artist: 'Queen',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=fJ9rUzIMcZQ'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/mqdefault.jpg',
            },
            {
                title: 'Pink Floyd - Comfortably Numb',
                artist: 'Pink Floyd',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=_FrOQC-zEog'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/_FrOQC-zEog/mqdefault.jpg',
            },
            {
                title: 'The Rolling Stones - Paint It Black',
                artist: 'The Rolling Stones',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=O4irXQhgMqg'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/O4irXQhgMqg/mqdefault.jpg',
            },
        ],
        'Hip Hop Essentials': [
            {
                title: 'Wu-Tang Clan - C.R.E.A.M.',
                artist: 'Wu-Tang Clan',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=PBwAxmrE194'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/PBwAxmrE194/mqdefault.jpg',
            },

            {
                title: 'A Tribe Called Quest - Electric Relaxation',
                artist: 'A Tribe Called Quest',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=WHRnvjCkTsw'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/WHRnvjCkTsw/mqdefault.jpg',
            },
            {
                title: 'The Notorious B.I.G. - Juicy',
                artist: 'The Notorious B.I.G.',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=_JZom_gVfuw'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/_JZom_gVfuw/mqdefault.jpg',
            },
            {
                title: '2Pac - California Love',
                artist: '2Pac',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=5wBTdfAkqGU'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/5wBTdfAkqGU/mqdefault.jpg',
            },
            {
                title: 'Wu-Tang Clan - C.R.E.A.M.',
                artist: 'Wu-Tang Clan',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=PBwAxmrE194'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/PBwAxmrE194/mqdefault.jpg',
            },

            {
                title: 'A Tribe Called Quest - Electric Relaxation',
                artist: 'A Tribe Called Quest',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=WHRnvjCkTsw'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/WHRnvjCkTsw/mqdefault.jpg',
            },
            {
                title: 'The Notorious B.I.G. - Juicy',
                artist: 'The Notorious B.I.G.',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=_JZom_gVfuw'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/_JZom_gVfuw/mqdefault.jpg',
            },
            {
                title: '2Pac - California Love',
                artist: '2Pac',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=5wBTdfAkqGU'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/5wBTdfAkqGU/mqdefault.jpg',
            },
        ],
        'Electronic Escape': [
            {
                title: 'Deadmau5 - Strobe',
                artist: 'Deadmau5',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=tKi9Z-f6qX4'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/tKi9Z-f6qX4/mqdefault.jpg',
            },
            {
                title: 'Daft Punk - One More Time',
                artist: 'Daft Punk',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=FGBhQbmPwH8'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/FGBhQbmPwH8/mqdefault.jpg',
            },
            {
                title: 'The Chemical Brothers - Galvanize',
                artist: 'The Chemical Brothers',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=Xu3FTEmN-eg'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/Xu3FTEmN-eg/mqdefault.jpg',
            },
            {
                title: 'Fatboy Slim - Right Here, Right Now',
                artist: 'Fatboy Slim',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=ub747pprmJ8'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/ub747pprmJ8/mqdefault.jpg',
            },
            {
                title: 'Justice - D.A.N.C.E.',
                artist: 'Justice',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=sy1dYFGkPUE'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/sy1dYFGkPUE/mqdefault.jpg',
            },
            {
                title: 'Deadmau5 - Strobe',
                artist: 'Deadmau5',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=tKi9Z-f6qX4'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/tKi9Z-f6qX4/mqdefault.jpg',
            },
            {
                title: 'Daft Punk - One More Time',
                artist: 'Daft Punk',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=FGBhQbmPwH8'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/FGBhQbmPwH8/mqdefault.jpg',
            },
            {
                title: 'The Chemical Brothers - Galvanize',
                artist: 'The Chemical Brothers',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=Xu3FTEmN-eg'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/Xu3FTEmN-eg/mqdefault.jpg',
            },
            {
                title: 'Fatboy Slim - Right Here, Right Now',
                artist: 'Fatboy Slim',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=ub747pprmJ8'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/ub747pprmJ8/mqdefault.jpg',
            },
            {
                title: 'Justice - D.A.N.C.E.',
                artist: 'Justice',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=sy1dYFGkPUE'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/sy1dYFGkPUE/mqdefault.jpg',
            },
        ],
        'Jazz Classics': [
            {
                title: 'John Coltrane - A Love Supreme',
                artist: 'John Coltrane',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=clC6cgoh1sU'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/clC6cgoh1sU/mqdefault.jpg',
            },
            {
                title: 'Miles Davis - So What',
                artist: 'Miles Davis',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=zqNTltOGh5c'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/zqNTltOGh5c/mqdefault.jpg',
            },
            {
                title: 'Duke Ellington - Take the A Train',
                artist: 'Duke Ellington',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=cb2w2m1JmCY'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/cb2w2m1JmCY/mqdefault.jpg',
            },
            {
                title: 'John Coltrane - A Love Supreme',
                artist: 'John Coltrane',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=clC6cgoh1sU'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/clC6cgoh1sU/mqdefault.jpg',
            },
            {
                title: 'Miles Davis - So What',
                artist: 'Miles Davis',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=zqNTltOGh5c'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/zqNTltOGh5c/mqdefault.jpg',
            },
            {
                title: 'Duke Ellington - Take the A Train',
                artist: 'Duke Ellington',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=cb2w2m1JmCY'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/cb2w2m1JmCY/mqdefault.jpg',
            },
        ],
        'Reggae Vibes': [
            {
                title: 'Bob Marley - One Love',
                artist: 'Bob Marley',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=vdB-8eLEW8g'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/vdB-8eLEW8g/mqdefault.jpg',
            },
            {
                title: 'Peter Tosh - Legalize It',
                artist: 'Peter Tosh',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=7xYO-VMZUGo'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/7xYO-VMZUGo/mqdefault.jpg',
            },
            {
                title: 'Toots & The Maytals - Pressure Drop',
                artist: 'Toots & The Maytals',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=HrLJ6Saq7u4'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/HrLJ6Saq7u4/mqdefault.jpg',
            },
            {
                title: 'Bob Marley - One Love',
                artist: 'Bob Marley',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=vdB-8eLEW8g'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/vdB-8eLEW8g/mqdefault.jpg',
            },
            {
                title: 'Peter Tosh - Legalize It',
                artist: 'Peter Tosh',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=7xYO-VMZUGo'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/7xYO-VMZUGo/mqdefault.jpg',
            },
            {
                title: 'Toots & The Maytals - Pressure Drop',
                artist: 'Toots & The Maytals',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=HrLJ6Saq7u4'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/HrLJ6Saq7u4/mqdefault.jpg',
            },
        ],
        'Israeli Vibes': [
            {
                title: 'Cowboy',
                artist: 'Tuna',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=yRAvfo3sHFs'),
                id: makeId(),
                imgURL: 'https://patiphon.co.il/Res/Artists/3768/1/d6c0638f-ab40-472d-ba8b-047046e6939a.jpg',
            },
            {
                title: 'Rabot Hadrahim',
                artist: 'דניאל סלומון ודנה עדיני',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=Dpu0Cc1ZQ1g'),
                id: makeId(),
                imgURL: 'https://upload.wikimedia.org/wikipedia/he/thumb/c/ca/%D7%A8%D7%91%D7%95%D7%AA_%D7%94%D7%93%D7%A8%D7%9B%D7%99%D7%9D_-_%D7%93%D7%A0%D7%99%D7%90%D7%9C_%D7%A1%D7%9C%D7%95%D7%9E%D7%95%D7%9F.webp/592px-%D7%A8%D7%91%D7%95%D7%AA_%D7%94%D7%93%D7%A8%D7%9B%D7%99%D7%9D_-_%D7%93%D7%A0%D7%99%D7%90%D7%9C_%D7%A1%D7%9C%D7%95%D7%9E%D7%95%D7%9F.webp.png',
            },
            {
                title: 'פלסטרים',
                artist: 'אושר כהן ',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=psKClFBw5S4'),
                id: makeId(),
                imgURL: 'https://i1.sndcdn.com/artworks-sz8gJhk2rZYd3P6W-gDOI4g-t500x500.jpg',
            },
            {
                title: 'Cowboy',
                artist: 'Tuna',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=yRAvfo3sHFs'),
                id: makeId(),
                imgURL: 'https://patiphon.co.il/Res/Artists/3768/1/d6c0638f-ab40-472d-ba8b-047046e6939a.jpg',
            },
            {
                title: 'Rabot Hadrahim',
                artist: 'דניאל סלומון ודנה עדיני',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=Dpu0Cc1ZQ1g'),
                id: makeId(),
                imgURL: 'https://upload.wikimedia.org/wikipedia/he/thumb/c/ca/%D7%A8%D7%91%D7%95%D7%AA_%D7%94%D7%93%D7%A8%D7%9B%D7%99%D7%9D_-_%D7%93%D7%A0%D7%99%D7%90%D7%9C_%D7%A1%D7%9C%D7%95%D7%9E%D7%95%D7%9F.webp/592px-%D7%A8%D7%91%D7%95%D7%AA_%D7%94%D7%93%D7%A8%D7%9B%D7%99%D7%9D_-_%D7%93%D7%A0%D7%99%D7%90%D7%9C_%D7%A1%D7%9C%D7%95%D7%9E%D7%95%D7%9F.webp.png',
            },
            {
                title: 'פלסטרים',
                artist: 'אושר כהן ',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=psKClFBw5S4'),
                id: makeId(),
                imgURL: 'https://i1.sndcdn.com/artworks-sz8gJhk2rZYd3P6W-gDOI4g-t500x500.jpg',
            },
            {
                title: 'Cowboy',
                artist: 'Tuna',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=yRAvfo3sHFs'),
                id: makeId(),
                imgURL: 'https://patiphon.co.il/Res/Artists/3768/1/d6c0638f-ab40-472d-ba8b-047046e6939a.jpg',
            },
            {
                title: 'Rabot Hadrahim',
                artist: 'דניאל סלומון ודנה עדיני',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=Dpu0Cc1ZQ1g'),
                id: makeId(),
                imgURL: 'https://upload.wikimedia.org/wikipedia/he/thumb/c/ca/%D7%A8%D7%91%D7%95%D7%AA_%D7%94%D7%93%D7%A8%D7%9B%D7%99%D7%9D_-_%D7%93%D7%A0%D7%99%D7%90%D7%9C_%D7%A1%D7%9C%D7%95%D7%9E%D7%95%D7%9F.webp/592px-%D7%A8%D7%91%D7%95%D7%AA_%D7%94%D7%93%D7%A8%D7%9B%D7%99%D7%9D_-_%D7%93%D7%A0%D7%99%D7%90%D7%9C_%D7%A1%D7%9C%D7%95%D7%9E%D7%95%D7%9F.webp.png',
            },
            {
                title: 'פלסטרים',
                artist: 'אושר כהן ',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=psKClFBw5S4'),
                id: makeId(),
                imgURL: 'https://i1.sndcdn.com/artworks-sz8gJhk2rZYd3P6W-gDOI4g-t500x500.jpg',
            },
        ],
    }

    return songLibrary[playlistName] || []
}
