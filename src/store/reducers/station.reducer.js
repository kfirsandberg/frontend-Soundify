export const SET_STATIONS = 'SET_STATIONS'
export const SET_STATION = 'SET_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'
export const SET_BG_COLOR = 'SET_BG_COLOR'

// Player
export const SET_SONG = 'SET_SONG'
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME'
export const SET_SONG_DURATION = 'SET_SONG_DURATION'
export const SET_VOLUME = 'SET_VOLUME'
export const SET_IS_PLAYING = 'SET_IS_PLAYING'
export const SET_SEARCHED_SONGS = 'SET_SEARCHED_SONGS'
export const REMOVE_SONG = 'REMOVE_SONG'
export const SET_CURRENT_ARTIST = 'SET_CURRENT_ARTIST'

const initialState = {
    stations: [],
    currentStation: null,
    currentSong: null,
    currentTime: 0,
    songDuration: 0,
    volume: 40,
    prevVolume: 40,
    isPlaying: false,
    bgColor: '#121212',
    searchedSongs: null,
    currentArtist: ''
}

export function stationReducer(state = initialState, action) {
    var newState = state
    var stations
    switch (action.type) {
        case SET_STATIONS:
            newState = { ...state, stations: action.stations }
            break
        case SET_STATION:
            newState = { ...state, currentStation: action.currentStation }
            break
        case REMOVE_STATION:
            stations = state.stations.filter(station => station._id !== action.stationId)
            newState = { ...state, stations }
            break
        case ADD_STATION:
            newState = { ...state, stations: [...state.stations, action.station] }
            break
        case UPDATE_STATION:
            console.log(action.station);
            const stations = state.stations.map(station => {
                if (station._id === action.station._id) {
                    return {
                        ...station,
                        ...action.station,
                        tracks: action.station.tracks
                            ? station.tracks.map(track => {

                                const updatedTrack = action.station.tracks.find(t => t.id === track.id);
                                return updatedTrack ? { ...track, ...updatedTrack } : track;
                            })
                            : station.tracks 
                    };
                }
                return station; 
            });

            console.log(stations);

            newState = { ...state, stations }
            break
        case SET_SONG:
            newState = { ...state, currentSong: action.song }
            break
        case SET_CURRENT_TIME:
            newState = { ...state, currentTime: action.currentTime }
            break
        case SET_SONG_DURATION:
            newState = { ...state, songDuration: action.songDuration }
            break
        case SET_VOLUME:
            newState = {
                ...state,
                prevVolume: state.volume,
                volume: action.volume,
            }
            break
        case SET_IS_PLAYING:
            newState = { ...state, isPlaying: action.isPlaying }
            break
        case SET_BG_COLOR:
            newState = { ...state, bgColor: action.bgColor }
            break
        case SET_SEARCHED_SONGS:
            newState = { ...state, searchedSongs: action.searchedSongs }
            break
        case REMOVE_SONG:
            newState = { ...state, stations: [...state.stations, action.station] }
            break
        case SET_CURRENT_ARTIST:
            newState = { ...state, currentArtist: action.currentArtist }
            break
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const station1 = { _id: 'b101', name: 'station ' + parseInt(Math.random() * 10) }
    const station2 = { _id: 'b102', name: 'station ' + parseInt(Math.random() * 10) }

    state = stationReducer(state, { type: SET_STATIONS, stations: [station1] })
    console.log('After SET_STATIONS:', state)

    state = stationReducer(state, { type: ADD_STATION, station: station2 })
    console.log('After ADD_STATION:', state)

    state = stationReducer(state, { type: UPDATE_STATION, station: { ...station2, name: 'Updated Station' } })
    console.log('After UPDATE_STATION:', state)

    state = stationReducer(state, { type: REMOVE_STATION, stationId: station2._id })
    console.log('After REMOVE_STATION:', state)
}
