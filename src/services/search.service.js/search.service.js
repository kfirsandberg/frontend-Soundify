import axios from 'axios';
import { debounce } from 'lodash';
import { httpService } from '../http.service'
const BASE_URL = '/api/ytmusic/search';

export function searchSongs(query) {
    // פונקציה עם debounce של 500ms
    const debouncedSearch = debounce(async (query) => {
        if (!query) return;
        const formattedQuery = query.replace(/ /g, '_');

        try {
            const res = await httpService.getApi('ytmusic/search', { query: formattedQuery });
            return res;
        } catch (error) {
            console.error('Error fetching search results:', error);
            throw error;
        }
    }, 500);

    return debouncedSearch(query);
}

