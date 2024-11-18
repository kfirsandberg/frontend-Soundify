import { httpService } from '../http.service'

const BASE_URL = 'spotify/'

export const spotifyService = {
    searchSongs

}


function searchSongs(query) {
    if (!query) return null;   
    return httpService.get(`${BASE_URL}music/search/?q=${query}`).then(((res => res.data)))
}

