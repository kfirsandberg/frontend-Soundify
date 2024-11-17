import { likedSongsLocalService } from "../../services/likedSongs/likedSongs.service";
import { store } from '../store.js';
import {
    SET_LIKED_SONGS,
    ADD_LIKED_SONG,
    REMOVE_LIKED_SONG,
    SET_SONG,
} from '../reducers/likedSongs.reducer.js';

export async function loadLikedSongs() {
    try {
        const songs = await likedSongsLocalService.query();
        store.dispatch(setLikedSongs(songs));
        return songs;
    } catch (err) {
        console.error('Cannot load liked songs', err);
        throw err;
    }
}

export async function addSong(song, stationAdded) {
    try {
        const songs = await likedSongsLocalService.addSong(song, stationAdded);
        store.dispatch(addLikedSong(songs));
        return songs;
    } catch (err) {
        console.error('Cannot add song', err);
        throw err;
    }
}

export async function removeSong(song, stationToRemove) {
    try {
        const songs = await likedSongsLocalService.removeSong(song, stationToRemove);
        store.dispatch(removeLikedSong(songs));
        return songs;
    } catch (err) {
        console.error('Cannot remove song', err);
        throw err;
    }
}

export async function getSongById(song) {

    try {
        const currentSong = await likedSongsLocalService.getSongByIdOrName(song);
        store.dispatch(setSong(currentSong));
        return currentSong;
    } catch (err) {
        console.error('Cannot get song by ID', err);
        throw err;
    }
}

// Command Creators
function setLikedSongs(songs) {
    return {
        type: SET_LIKED_SONGS,
        songs,
    };
}

function addLikedSong(songs) {
    return {
        type: ADD_LIKED_SONG,
        songs,
    };
}

function removeLikedSong(songs) {
    return {
        type: REMOVE_LIKED_SONG,
        songs,
    };
}

function setSong(song) {
    return {
        type: SET_SONG,
        song,
    };
}
