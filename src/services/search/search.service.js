import { debounce } from 'lodash';
import { httpService } from '../http.service';
const BASE_URL = '/api/ytmusic/search';
export async function searchSongs(query) {
    if (!query) return null;
    const formattedQuery = query.replace(/ /g, '_');
    try {
        const res = await httpService.getApi('ytmusic/search', { query: formattedQuery });
        return res;
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }
}
export const debouncedSearchSongs = debounce(async (query, callback) => {
    const results = await searchSongs(query);
    if (callback) callback(results);
}, 500);