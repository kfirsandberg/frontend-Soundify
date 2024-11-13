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
        stations.push(_createStation('Liked Songs'))
        stations.push(_createStation('This is Infected Mushroom'))
        stations.push(_createStation('Daily Mix 2'))
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
    if (station.name === 'Liked Songs') station.imgURL = 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731428252/liked-songs_fdevoi.png'
    if (station.songs && station.songs.length > 0) {
        station.imgURL = station.songs[0].imgURL // Use the first song's imgURL if exists
    } else if (station.name !== 'Liked Songs') {
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

        'This is Infected Mushroom': [
            {
                title: 'Infected Mushroom - I Wish',
                artist: 'Infected Mushroom',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=kX9EMvpcJ5s'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731488424/converting_rewrqa.jpg',
                duration: '4:24',
                album: 'Converting Vegetarians',
            },
            {
                title: 'Infected Mushroom - Becoming Insane',
                artist: 'Infected Mushroom',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=wFZmBsp7vUA'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731488228/vicus_delicius_quzq1a.jpg',
                duration: '7:20',
                album: 'Vicious Delicious',
            },

            {
                title: 'Infected Mushroom - Saeed',
                artist: 'Infected Mushroom',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=xRaqVZce8rI'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731488266/black_shwwarma_aabhnf.jpg',
                duration: '7:00',
                album: 'Legend of the Black Shawarma',
            },
            {
                title: 'Infected Mushroom - Heavyweight',
                artist: 'Infected Mushroom',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=gWipzkzOpZA'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731488228/vicus_delicius_quzq1a.jpg',
                duration: '8:41',
                album: 'Vicious Delicious',
            },
            {
                title: 'Infected Mushroom - Converting Vegetarians',
                artist: 'Infected Mushroom',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=8nF6nTLP_XA'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731488424/converting_rewrqa.jpg',
                duration: '6:35',
                album: 'Converting Vegetarians',
            },
            {
                title: 'Infected Mushroom - Vicious Delicious',
                artist: 'Infected Mushroom',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=3kYIks_Hwns'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731488228/vicus_delicius_quzq1a.jpg',
                duration: '7:25',
                album: 'Vicious Delicious',
            },
            {
                title: 'Infected Mushroom - Pink Nightmares',
                artist: 'Infected Mushroom',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=4ZHiBCzPiJQ'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731488424/converting_rewrqa.jpg',
                duration: '5:46',
                album: 'Converting Vegetarians II',
            },
            {
                title: 'Infected Mushroom - Spitfire',
                artist: 'Infected Mushroom',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=EVFrkjHZH40'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731488556/freinds_lcmads.jpg',
                duration: '6:29',
                album: 'Friends on Mushrooms',
            },
            {
                title: 'Infected Mushroom - Groove Attack',
                artist: 'Infected Mushroom',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=vMDGzdPguoI'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731488556/freinds_lcmads.jpg',
                duration: '5:12',
                album: 'Return to the Sauce',
            },
            {
                title: 'Infected Mushroom - Bust a Move',
                artist: 'Infected Mushroom',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=hq-ZHKDufY4'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731488551/classical_ifihyq.jpg',
                duration: '6:55',
                album: 'Classical Mushroom',
            },
        ],
        'Daily Mix 2': [
            {
                title: 'Shnei Meshugaim',
                artist: 'Omer Adam',
                album: 'Omer',
                duration: '3:58',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=XYZ1abcdEFG'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731489303/daily_mix_2_rbzcdd.jpg',
            },
            {
                title: 'Tagid Li Ze Halom',
                artist: 'Sarit Hadad',
                album: 'Best of Sarit Hadad',
                duration: '4:21',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=XYZ2abcdEFG'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731489273/sara_2_pdexd2.jpg',
            },
            {
                title: 'HaMalach Shelach',
                artist: 'Eyal Golan',
                album: 'Histakluti',
                duration: '3:40',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=XYZ3abcdEFG'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731489286/eyal_d5ifky.jpg',
            },
            {
                title: 'Lo Mishtaneh',
                artist: 'Osher Cohen',
                album: 'Yoter Tov',
                duration: '3:55',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=XYZ4abcdEFG'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731489270/osher_cohen_d9pchp.jpg',
            },
            {
                title: 'Rak Itach',
                artist: 'Lior Narkis',
                album: 'Rak Itach',
                duration: '3:45',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=XYZ5abcdEFG'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731489281/liot_narkis_uhcvth.jpg',
            },
            {
                title: 'Yesh Lanu Et HaAhava',
                artist: 'Omer Adam',
                album: 'Omer Adam Hits',
                duration: '4:05',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=XYZ6abcdEFG'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731489297/omer_uimi57.jpg',
            },
            {
                title: 'Mahalach Chayai',
                artist: 'Sarit Hadad',
                album: 'Classic Hits',
                duration: '4:02',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=XYZ7abcdEFG'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731489291/sarit_lhppus.jpg',
            },
            {
                title: 'Mi Shemaamin',
                artist: 'Eyal Golan',
                album: 'Mi Shemaamin',
                duration: '4:20',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=XYZ8abcdEFG'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731489286/eyal_d5ifky.jpg',
            },
            {
                title: 'Tachzor',
                artist: 'Osher Cohen',
                album: 'Leilot',
                duration: '3:35',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=XYZ9abcdEFG'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731489270/osher_cohen_d9pchp.jpg',
            },
            {
                title: 'Chocolata',
                artist: 'Lior Narkis',
                album: 'Chocolata',
                duration: '3:30',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=XYZaabcdEFG'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731489281/liot_narkis_uhcvth.jpg',
            }
        ],


        'Funky Monks': [
            {
                title: 'Cissy Strut',
                artist: 'The Meters',
                album: 'The Meters',
                duration: '3:05',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=4_iC0MyIykM'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
            },
            {
                title: 'Pass The Peas',
                artist: "The JB's",
                album: 'Food for Thought',
                duration: '3:30',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=mUkfiLjooxs'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
            },
            {
                title: 'Give Up The Funk',
                artist: 'Parliament',
                album: 'Mothership Connection',
                duration: '5:46',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=3WOZwwRH6XU'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/3WOZwwRH6XU/mqdefault.jpg',
            }
        ],

        'Rock Vibes': [
            {
                title: 'Whole Lotta Love',
                artist: 'Led Zeppelin',
                album: 'Led Zeppelin II',
                duration: '5:34',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=HQmmM_qwG4k'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/HQmmM_qwG4k/mqdefault.jpg',
            },
            {
                title: 'Back In Black',
                artist: 'AC/DC',
                album: 'Back In Black',
                duration: '4:15',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=pAgnJDJN4VA'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/pAgnJDJN4VA/mqdefault.jpg',
            },
            {
                title: 'Bohemian Rhapsody',
                artist: 'Queen',
                album: 'A Night at the Opera',
                duration: '5:55',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=fJ9rUzIMcZQ'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/mqdefault.jpg',
            }
        ],

        'Hip Hop Essentials': [
            {
                title: 'C.R.E.A.M.',
                artist: 'Wu-Tang Clan',
                album: 'Enter the Wu-Tang (36 Chambers)',
                duration: '4:12',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=PBwAxmrE194'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/PBwAxmrE194/mqdefault.jpg',
            },
            {
                title: 'Electric Relaxation',
                artist: 'A Tribe Called Quest',
                album: 'Midnight Marauders',
                duration: '4:04',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=WHRnvjCkTsw'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/WHRnvjCkTsw/mqdefault.jpg',
            },
            {
                title: 'Juicy',
                artist: 'The Notorious B.I.G.',
                album: 'Ready to Die',
                duration: '5:02',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=_JZom_gVfuw'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/_JZom_gVfuw/mqdefault.jpg',
            }
        ],

        'Electronic Escape': [
            {
                title: 'Strobe',
                artist: 'Deadmau5',
                album: 'For Lack of a Better Name',
                duration: '10:37',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=tKi9Z-f6qX4'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/tKi9Z-f6qX4/mqdefault.jpg',
            },
            {
                title: 'One More Time',
                artist: 'Daft Punk',
                album: 'Discovery',
                duration: '5:20',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=FGBhQbmPwH8'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/FGBhQbmPwH8/mqdefault.jpg',
            },
            {
                title: 'Galvanize',
                artist: 'The Chemical Brothers',
                album: 'Push the Button',
                duration: '4:28',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=Xu3FTEmN-eg'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/Xu3FTEmN-eg/mqdefault.jpg',
            }
        ]
        ,
        'Jazz Classics': [
            {
                title: 'John Coltrane - A Love Supreme',
                artist: 'John Coltrane',
                album: 'A Love Supreme',
                duration: '7:43',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=clC6cgoh1sU'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/clC6cgoh1sU/mqdefault.jpg',
            },
            {
                title: 'Miles Davis - So What',
                artist: 'Miles Davis',
                album: 'Kind of Blue',
                duration: '9:22',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=zqNTltOGh5c'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/zqNTltOGh5c/mqdefault.jpg',
            },
            {
                title: 'Duke Ellington - Take the A Train',
                artist: 'Duke Ellington',
                album: 'The Duke Ellington Songbook',
                duration: '3:15',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=cb2w2m1JmCY'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/cb2w2m1JmCY/mqdefault.jpg',
            }
        ],
        'Reggae Vibes': [
            {
                title: 'Bob Marley - One Love',
                artist: 'Bob Marley',
                album: 'Exodus',
                duration: '2:53',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=vdB-8eLEW8g'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/vdB-8eLEW8g/mqdefault.jpg',
            },
            {
                title: 'Peter Tosh - Legalize It',
                artist: 'Peter Tosh',
                album: 'Legalize It',
                duration: '4:35',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=7xYO-VMZUGo'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/7xYO-VMZUGo/mqdefault.jpg',
            },
            {
                title: 'Toots & The Maytals - Pressure Drop',
                artist: 'Toots & The Maytals',
                album: 'The Harder They Come',
                duration: '2:53',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=HrLJ6Saq7u4'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/HrLJ6Saq7u4/mqdefault.jpg',
            }
        ],
        'Israeli Vibes': [
            {
                title: 'Cowboy',
                artist: 'Tuna',
                album: 'Tuna Album',
                duration: '3:50',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=yRAvfo3sHFs'),
                id: makeId(),
                imgURL: 'https://patiphon.co.il/Res/Artists/3768/1/d6c0638f-ab40-472d-ba8b-047046e6939a.jpg',
            },
            {
                title: 'Rabot Hadrahim',
                artist: 'דניאל סלומון ודנה עדיני',
                album: 'Rabot Hadrahim',
                duration: '4:10',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=Dpu0Cc1ZQ1g'),
                id: makeId(),
                imgURL: 'https://upload.wikimedia.org/wikipedia/he/thumb/c/ca/%D7%A8%D7%91%D7%95%D7%AA_%D7%94%D7%93%D7%A8%D7%9B%D7%99%D7%9D_-_%D7%93%D7%A0%D7%99%D7%90%D7%9C_%D7%A1%D7%9C%D7%95%D7%9E%D7%95%D7%9F.webp/592px-%D7%A8%D7%91%D7%95%D7%AA_%D7%94%D7%93%D7%A8%D7%9B%D7%99%D7%9D_-_%D7%93%D7%A0%D7%99%D7%90%D7%9C_%D7%A1%D7%9C%D7%95%D7%9E%D7%95%D7%9F.webp.png',
            },
            {
                title: 'פלסטרים',
                artist: 'אושר כהן',
                album: 'פלסטרים',
                duration: '3:30',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=psKClFBw5S4'),
                id: makeId(),
                imgURL: 'https://i1.sndcdn.com/artworks-sz8gJhk2rZYd3P6W-gDOI4g-t500x500.jpg',
            }
        ],
    }

    return songLibrary[playlistName] || []
}
