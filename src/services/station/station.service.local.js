import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'
const STORAGE_KEY = 'playlist'
export const playlistService = {
    query,
    getById,
    save,
    remove,
    addPlaylist,
    removePlaylist
}

window.ps = playlistService
async function query(filterBy = { txt: '', genre: '' }) {
    var playlists = await storageService.query(STORAGE_KEY)
    const { txt, genre, sortField, sortDir } = filterBy
    if (txt) {
        const regex = new RegExp(txt, 'i')
        playlists = playlists.filter(playlist => regex.test(playlist.name) || regex.test(playlist.description))
    }
    if (genre) {
        playlists = playlists.filter(playlist => playlist.genre === genre)
    }
    if (sortField === 'name' || sortField === 'owner') {
        playlists.sort((p1, p2) =>
            p1[sortField].localeCompare(p2[sortField]) * +sortDir)
    }
    playlists = playlists.map(({ _id, name, genre, owner }) => ({ _id, name, genre, owner }))
    return playlists
}
function getById(playlistId) {
    return storageService.get(STORAGE_KEY, playlistId)
}
async function remove(playlistId) {
    await storageService.remove(STORAGE_KEY, playlistId)
}
async function save(playlist) {
    var savedPlaylist
    if (playlist._id) {
        const playlistToSave = {
            _id: playlist._id,
            name: playlist.name,
            genre: playlist.genre
        }
        savedPlaylist = await storageService.put(STORAGE_KEY, playlistToSave)
    } else {
        const playlistToSave = {
            name: playlist.name,
            genre: playlist.genre,
            owner: userService.getLoggedinUser()
        }
        savedPlaylist = await storageService.post(STORAGE_KEY, playlistToSave)
    }
    return savedPlaylist
}
async function addPlaylist(name, genre) {
    const newPlaylist = {
        _id: makeId(),
        name,
        genre,
        owner: userService.getLoggedinUser()
    }
    await storageService.post(STORAGE_KEY, newPlaylist)
    return newPlaylist
}





