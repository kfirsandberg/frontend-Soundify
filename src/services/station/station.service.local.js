import { storageService } from '../async-storage.service'
import { searchSongs } from '../search/search.service'
import { loadFromStorage, saveToStorage, makeId } from '../util.service'

const STORAGE_KEY = 'station'
const BASE_URL = 'http://127.0.0.1:3030/api/ytmusic/search'

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
    addSongToLikedSongs,
    removeSongFromLikedSongs,
    ensureSong,
    searchSongs,
    getYoutubeID,
    getArtist
}
const gImg = 'https://res.cloudinary.com/dwzeothxl/image/upload/v1731394907/Screenshot_2024-11-12_085302_pmlaey.png'
_createStations()

async function query(filterBy = { txt: '', genre: '' }) {
    let stations = await storageService.query(STORAGE_KEY)
  
    return stations
}
function getById(stationId) {
    return storageService.get(STORAGE_KEY, stationId)
}
function ensureSong(song) {
    const id = song.id || makeId();
    const imgURL = song.imgURL || (song.thumbnails && song.thumbnails.length > 0 ? song.thumbnails[0].url : '');

    const formattedDuration = song.duration
        ? `${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, '0')}`
        : '';

    return {
        id,
        title: song.title || '',
        artist: song.artist || '',
        album: song.album || '',
        videoId: song.videoId || '',
        imgURL,
        duration: formattedDuration,
    };
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
        imgURL: station.imgURL || gImg,
        songs: station.songs || [],
         description: station.description || '',
    }
    return station._id
        ? await storageService.put(STORAGE_KEY, stationToSave)
        : await storageService.post(STORAGE_KEY, stationToSave)
}

async function removeSong(stationId, updatedData) {
}
function addSong(stationId, updatedData) {
    return httpService.put(BASE_URL + stationId, updatedData);
}


async function addSongToLikedSongs(song) {
    const likedSongsStation = await getLikedSongsStation()

    const isSongLiked = likedSongsStation.songs.some(likedSong => likedSong.id === song.id)
    if (isSongLiked) return likedSongsStation

    likedSongsStation.songs.push(song)
    await saveStation(likedSongsStation)
    return likedSongsStation
}

async function removeSongFromLikedSongs(songId) {
    const likedSongsStation = await getLikedSongsStation()

    likedSongsStation.songs = likedSongsStation.songs.filter(song => song.id !== songId)
    await saveStation(likedSongsStation)
    return likedSongsStation
}


async function getLikedSongsStation() {
    let stations = await storageService.query(STORAGE_KEY)
    let likedSongsStation = stations.find(station => station.name === 'Liked Songs')

    return likedSongsStation || null
}

async function addStation(name, genre) {
    const newStation = {
        _id: makeId(),
        name,
    }
    await storageService.post(STORAGE_KEY, newStation)
    return newStation
}

async function _createStations() {
    let stations = loadFromStorage(STORAGE_KEY)

    if (!stations || !stations.length) {
        stations = []
        // Create several example stations
        stations.push(_createStation('Liked Songs', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731428252/liked-songs_fdevoi.png'));
        stations.push(_createStation('TECHNO 2024', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731606719/techno-2024_fzehuc.jpg', 'By kfirSandberg'));
        stations.push(_createStation('Beast Mode', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731606720/beast-mode_n95afc.jpg', 'Get your beast mode on!'));
        // stations.push(_createStation('Running Motivation 2024', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731606719/running_vnrqas.jpg'));
        stations.push(_createStation('ישראלי', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731606719/%D7%99%D7%A9%D7%A8%D7%90%D7%9C%D7%99_btks2v.jpg', 'kfirSandberg'));
        stations.push(_createStation('הלהיטים הגדולים של ישראל', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731606718/%D7%94%D7%9C%D7%94%D7%99%D7%98%D7%99%D7%9D_%D7%A9%D7%9C_%D7%99%D7%A9%D7%A8%D7%90%D7%9C_kyxngb.jpg', 'הפלייליסט הכי גדול בישראל, עם השירים הכי חמים של ישראל'));
        stations.push(_createStation('Top Songs - Global', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731606718/top-songs-global_bh7xg0.jpg', 'Your weekly update of the most played tracks right now - Global.'));
        stations.push(_createStation('Top Songs - USA', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731606718/top-songs-USA_s0xg2s.jpg', 'Your weekly update of the most played tracks right now - USA.'));
        stations.push(_createStation('Top 50 - global', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731606718/top50_ggdj8d.jpg', 'Your daily update of the most played tracks right now - Global.'));
        stations.push(_createStation('Viral 50 - Global', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731606718/viral50_yks0vl.jpg', 'Your daily update of the most viral tracks right now - Global.'));
        stations.push(_createStation('2000s Hip-Hop', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731606718/2000shiphop_f9tiqf.jpg', 'Taking it back to the 2000s. Cover: Kid Cudi'));
        stations.push(_createStation('Israeli Vibes', makeId(), ''));
        stations.push(_createStation('Rock Vibes', makeId(), ''));
        saveToStorage(STORAGE_KEY, stations);

    }
    return stations
}

function _createStation(name, _id, imgURL = gImg, stationSubtitle) {
    const station = getEmptyStation(name, _id, stationSubtitle)
    if (station.songs && station.songs.length > 0 && !imgURL) {
        station.imgURL = station.songs[0].imgURL // Use the first song's imgURL if exists
    }
    if (imgURL) {
        station.imgURL = imgURL
    }

    return station
}

function getEmptyStation(name, _id = '', stationSubtitle = '') {
    let playlistCount = parseInt(localStorage.getItem('playlistCount'), 10) || 0
    playlistCount += 1
    const newStationName = name || `My Playlist #${playlistCount}`
    localStorage.setItem('playlistCount', playlistCount)
    return {
        name: newStationName,
        songs: getSongsForStation(newStationName) || [],
        _id,
        stationSubtitle
    }
}

function getVideoIdFromUrl(url) {
    if (!url) return
    const urlObj = new URL(url)
    return urlObj.searchParams.get('v')
}

function getYoutubeID(songName) {
    return httpService.get('youtube/search?q=' + songName).then(((res => res.data)))
}

function getArtist(artistId) {    
    return httpService.post(`spotify/artists/${artistId}`).then(((res => res.data)))
}
