import { artistService } from '../../services/artist/artistService.js'  

export const FETCH_ARTIST_REQUEST = 'FETCH_ARTIST_REQUEST'
export const FETCH_ARTIST_SUCCESS = 'FETCH_ARTIST_SUCCESS'
export const FETCH_ARTIST_FAILURE = 'FETCH_ARTIST_FAILURE'

// Action to start fetching artist data
export const fetchArtistRequest = () => ({
  type: FETCH_ARTIST_REQUEST,
})

// Action when artist data is successfully fetched
export const fetchArtistSuccess = (artistData) => ({
  type: FETCH_ARTIST_SUCCESS,
  payload: artistData,
})

// Action when an error occurs while fetching artist data
export const fetchArtistFailure = (error) => ({
  type: FETCH_ARTIST_FAILURE,
  payload: error,
})

// Async action to fetch artist by ID
export const fetchArtistById = (artistId) => {
    return async (dispatch) => {
      console.log('Dispatching FETCH_ARTIST_REQUEST for ID:', artistId);
      dispatch(fetchArtistRequest()); // Start request
  
      try {
        console.log('Calling artistService.getArtistById with ID:', artistId);
        const data = await artistService.getArtistById(artistId); // Fetch data
        console.log('Artist data fetched successfully:', data);
        dispatch(fetchArtistSuccess(data)); // Dispatch success with data
      } catch (error) {
        console.error('Error fetching artist data:', error.message);
        dispatch(fetchArtistFailure(error.message)); // Dispatch failure with error
      }
    };
  };
