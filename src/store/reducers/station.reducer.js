export const SET_STATIONS = 'SET_STATIONS'
export const SET_STATION = 'SET_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'
export const ADD_STATION_MSG = 'ADD_STATION_MSG'

// Player
export const SET_SONG = 'SET_SONG'
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME'
export const SET_SONG_DURATION = 'SET_SONG_DURATION'
export const SET_VOLUME = 'SET_VOLUME'

const initialState = {
    stations: [],
    station: null,
    currentSong: null,
    currentTime: 0,
    songDuration: 293,
    volume: 50,
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
            const lastRemovedCar = state.stations.find(car => car._id === action.carId)
            stations = state.stations.filter(car => car._id !== action.carId)
            newState = { ...state, stations, lastRemovedCar }
            break
        case ADD_STATION:
            newState = { ...state, stations: [...state.stations, action.station] }
            break
        case UPDATE_STATION:
            stations = state.stations.map(station => (station._id === action.station._id ? action.station : station))
            newState = { ...state, stations }
            break
        case ADD_STATION_MSG:
            newState = { ...state, station: { ...state.station, msgs: [...(state.station.msgs || []), action.msg] } }
            break
        case SET_SONG:
            newState = { ...state, currentSong: action.song }
            break
        case SET_CURRENT_TIME:
            return { ...state, currentTime: action.currentTime }
        case SET_SONG_DURATION:
            return { ...state, songDuration: action.songDuration }
        case SET_VOLUME:
            return { ...state, volume: action.volume }
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
