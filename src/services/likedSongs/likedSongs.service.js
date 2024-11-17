import { info } from 'sass'
import { storageService } from '../async-storage.service'
import { loadFromStorage, saveToStorage, makeId } from '../util.service'

const STORAGE_KEY = "LIKEDSONGS"

export const likedSongsLocalService = {
    query,
    getSongByIdOrName,
    removeSong,
    addSong,
}

async function query(filterBy = { txt: '', genre: '' }) {
    let stations = await storageService.query(STORAGE_KEY)
    return stations
}

async function getSongByIdOrName(song) {
    const songs = loadFromStorage(STORAGE_KEY);
    if (!songs || !songs.length) return null;
    const foundSong = songs.find(s => 
        (s.id && song.id && s.id === song.id) || 
        (s.name && song.title && s.name.toLowerCase() === song.title.toLowerCase())
    );

    return foundSong || null;
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
