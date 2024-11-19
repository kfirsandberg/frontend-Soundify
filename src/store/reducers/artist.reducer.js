import {
    FETCH_ARTIST_REQUEST,
    FETCH_ARTIST_SUCCESS,
    FETCH_ARTIST_FAILURE,
} from '../actions/artist.actions.js';

const initialState = {
    currentArtistId: null, // Add the currentArtistId state to store the ID
    artist: null,           
    loading: false,         
    error: null,            
};

export function artistReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ARTIST_ID': // Action to set artistId
            return {
                ...state,
                currentArtistId: action.payload,
            };
        case FETCH_ARTIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ARTIST_SUCCESS:
            return {
                ...state,
                loading: false,
                artist: action.payload,
                error: null,
            };
        case FETCH_ARTIST_FAILURE:
            return {
                ...state,
                loading: false,
                artist: null,
                error: action.payload,
            };
        default:
            return state;
    }
}
