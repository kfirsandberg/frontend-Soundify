export const SET_STATIONS = 'SET_STATIONS'
export const SET_STATION = 'SET_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'

// Player
export const SET_SONG = 'SET_SONG'
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME'
export const SET_SONG_DURATION = 'SET_SONG_DURATION'
export const SET_VOLUME = 'SET_VOLUME'
export const SET_IS_PLAYING = 'SET_IS_PLAYING'

const initialState = {
    stations: [],
    station: null,
    currentSong: null,
    currentTime: 0,
    songDuration: 0,
    volume: 5,
    prevVolume: 5,
    isPlaying: false,

}

export function stationReducer(state = initialState, action) {
    var newState = state
    var stations
    switch (action.type) {
        case SET_STATIONS:
            newState = { ...state, stations: action.stations }
            break
        case SET_STATION:
            newState = { ...state, station: action.station }
            break
        case REMOVE_STATION:
            stations = state.stations.filter(station => station._id !== action.stationId)
            newState = { ...state, stations }
            break
        case ADD_STATION:
            newState = { ...state, stations: [...state.stations, action.station] }
            break
        case UPDATE_STATION:
            stations = state.stations.map(station => (station._id === action.station._id ? action.station : station))
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
