import { info } from 'sass'
import { storageService } from '../async-storage.service'
import { loadFromStorage, saveToStorage, makeId } from '../util.service'

const STORAGE_KEY = "LIKEDSONGS"

export const likedSongsLocalService = {
    query,
    getSongById,
    removeSong,
    addSong,
}
// _createStations()

async function query(filterBy = { txt: '', genre: '' }) {
    let stations = await storageService.query(STORAGE_KEY)
    return stations
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
function removeSong(song, stationToRemove) {
    let songs = loadFromStorage(STORAGE_KEY);
    if (!songs || !songs.length) return;
    const existingSong = songs.find(existing => existing.id === song.id);

    if (existingSong) {
        const stationIndex = existingSong.stationAdded.indexOf(stationToRemove);
        if (stationIndex !== -1) {

            existingSong.stationAdded.splice(stationIndex, 1);
            console.log(`Removed station: ${stationToRemove} from song: ${existingSong.name}`);
        }

        if (existingSong.stationAdded.length === 0) {
            songs = songs.filter(existing => existing.id !== song.id);
            console.log(`Removed song: ${existingSong.name} as it is no longer in any playlists`);
        }
    }

    saveToStorage(STORAGE_KEY, songs);
    return songs;
}


function addSong(song, stationAdded) {

    let songs = loadFromStorage(STORAGE_KEY)
    if (!songs || !songs.length) {
        songs = [];
    }

    const existingSong = songs.find(existing => existing.id === song.id);

    if (existingSong) {

        if (!existingSong.stationAdded.includes(stationAdded)) {
            existingSong.stationAdded.push(stationAdded);
        }
    } else {
        const newSong = {
            id: song.id || makeId(),
            name: song.title,
            stationAdded: [stationAdded],
            songInfo: { ...song },
        }
        songs.push(newSong)
    }

    saveToStorage(STORAGE_KEY, songs)
    return songs;

}



// async function _createStations() {
//     let songs = loadFromStorage(STORAGE_KEY)

//     if (!songs || !songs.length) {
//         songs = [
//             {
//                 "id": "DujKJ1OaLQE",
//                 "name": 'The Beach (Audio)',
//                 "stationAdded": ["Liked Songs"],
//                 "songInfo": {
//                     "id": "DujKJ1OaLQE",
//                     "title": "The Beach (Audio)",
//                     "artist": "The Neighbourhood",
//                     "album": "",
//                     "albumId": "",
//                     "duration": 257,
//                     "thumbnails": [
//                         {
//                             "url": "https://i.ytimg.com/vi/DujKJ1OaLQE/sddefault.jpg?sqp=-oaymwEWCJADEOEBIAQqCghqEJQEGHgg6AJIWg&rs=AMzJL3l_6InO3T3Fu2JvhWgvHT4E6dNMsw",
//                             "width": 400,
//                             "height": 225
//                         }
//                     ]
//                 }
//             },
//             {
//                 "id": makeId(),
//                 "name": 'Here Comes The Sun (Remastered 2009)',
//                 "stationAdded": ["Liked Songs"],
//                 "songInfo": {
//                     "type": "SONG",
//                     "videoId": "xUNqsfFUwhY",
//                     "name": "Here Comes The Sun (Remastered 2009)",
//                     "artist": {
//                         "name": "The Beatles",
//                         "artistId": "UC2XdaAVUannpujzv32jcouQ"
//                     },
//                     "album": {
//                         "name": "Abbey Road",
//                         "albumId": "MPREb_pyQa1mky9hE"
//                     },
//                     "duration": 186,
//                     "thumbnails": [
//                         {
//                             "url": "https://lh3.googleusercontent.com/bmG1q9eu3ub2CtYcgArvzpiehqUpZGuLsOa_B0Bxkwxdfsk9r7nRzAQy1P5dTjqerODLxq3LycWGWW5m=w60-h60-l90-rj",
//                             "width": 60,
//                             "height": 60
//                         },
//                         {
//                             "url": "https://lh3.googleusercontent.com/bmG1q9eu3ub2CtYcgArvzpiehqUpZGuLsOa_B0Bxkwxdfsk9r7nRzAQy1P5dTjqerODLxq3LycWGWW5m=w120-h120-l90-rj",
//                             "width": 120,
//                             "height": 120
//                         }
//                     ]
//                 }
//             }

//         ]


//         saveToStorage(STORAGE_KEY, songs);

//     }
//     return songs
// }
