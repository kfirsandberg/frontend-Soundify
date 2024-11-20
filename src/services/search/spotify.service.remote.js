import { httpService } from '../http.service'

const BASE_URL = 'spotify/'

export const spotifyService = {
    searchSongs,getArtist

}
function searchSongs(query) {
    if (!query) return null;   
    return httpService.get(`${BASE_URL}music/search/?q=${query}`).then(((res => res.data)))
}




function getArtist(artistId) {
  
    return httpService.get(`${BASE_URL}artists/${artistId}`).then(((res => res.data)))

}

