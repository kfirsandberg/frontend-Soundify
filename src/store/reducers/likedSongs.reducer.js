export const SET_LIKED_SONGS = 'SET_LIKED_SONGS';
export const ADD_LIKED_SONG = 'ADD_LIKED_SONG';
export const REMOVE_LIKED_SONG = 'REMOVE_LIKED_SONG';
export const SET_SONG = 'SET_SONG';

const initialState = {
    likedSongs: [],
    currentSong: null,
};

export function likedSongsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LIKED_SONGS:
            return { ...state, likedSongs: action.songs };
        case ADD_LIKED_SONG:
            return { ...state, likedSongs: action.songs };
        case REMOVE_LIKED_SONG:
            return { ...state, likedSongs: action.songs };
        case SET_SONG:
            return { ...state, currentSong: action.song };
        default:
            return state;
    }
}



