import { storageService } from '../async-storage.service'
import { loadFromStorage, saveToStorage, makeId } from '../util.service'

const STORAGE_KEY = 'songs'

export const songsService = {
    query,
    addSong,
    removeSong
}

_createSongs

async function query (stationId){
    const songs = await storageService.query(STORAGE_KEY)
    return songs.filter(song => song.stationId === stationId)
}

async function addSong(song, stationId) {
    const newSong = {
        id: makeId(),
        stationId,
        title: song.title,
        videoId: song.videoId,
        imgURL: song.imgURL,
    }
    await storageService.post(STORAGE_KEY, newSong)
    return newSong
}


function removeSong(song,stationId){

}

function _createSongs (){

}