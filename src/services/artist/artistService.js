export const artistService = {
    getArtists,
    getArtistById,
}

async function getArtists(filter = '') {
    try {
        console.log('Fetching artists with filter:', filter);
        const queryParam = filter ? `?txt=${encodeURIComponent(filter)}` : '';
        console.log('Requesting URL:', `/api/artists${queryParam}`);
        const response = await fetch(`/api/artists${queryParam}`);
        if (!response.ok) throw new Error('Failed to fetch artists');
        const data = await response.json();
        console.log('Response data:', data);
        return data;
    } catch (err) {
        console.error('Error fetching artists:', err);
        throw err;
    }
}

async function getArtistById(artistId) {
    try {
        console.log('Fetching artist with ID:', artistId);
        const response = await fetch(`/api/artists/${artistId}`);
        // console.log('Request URL:', `/api/artists/${artistId}`);
        if (!response.ok) throw new Error('Failed to fetch artist details');
        const data = await response.json();
        console.log('Artist details response:', data);
        return data;
    } catch (err) {
        console.error(`Error fetching artist with ID ${artistId}:`, err);
        throw err;
    }
}
