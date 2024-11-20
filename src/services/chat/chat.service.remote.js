import { httpService } from '../http.service'
const BASE_URL = 'chat/'

export const chatService = {
    searchChat
}

function searchChat(query) {
    if (!query) return null;   
    return httpService.get(`${BASE_URL}send/?q=${query}`).then(((res => res.data)))
}
