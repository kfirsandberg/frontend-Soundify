export const SET_STATIONS = 'SET_STATIONS'
export const SET_STATION = 'SET_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'
export const ADD_STATION_MSG = 'ADD_STATION_MSG'

const initialState = {
    cars: [],
    car: null
}

export function stationReducer(state = initialState, action) {
    var newState = state
    var station
    switch (action.type) {
        case SET_STATIONS:
            newState = { ...state, cars: action.cars }
            break
        case SET_STATION:
            newState = { ...state, car: action.car }
            break
        case REMOVE_STATION:
            const lastRemovedCar = state.cars.find(car => car._id === action.carId)
            cars = state.cars.filter(car => car._id !== action.carId)
            newState = { ...state, cars, lastRemovedCar }
            break
        case ADD_STATION:
            newState = { ...state, cars: [...state.cars, action.car] }
            break
        case UPDATE_STATION:
            cars = state.cars.map(car => (car._id === action.car._id) ? action.car : car)
            newState = { ...state, cars }
            break
        case ADD_STATION_MSG:
            newState = { ...state, car: { ...state.car, msgs: [...state.car.msgs || [], action.msg] } }
            break
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const car1 = { _id: 'b101', vendor: 'Car ' + parseInt(Math.random() * 10), msgs: [] }
    const car2 = { _id: 'b102', vendor: 'Car ' + parseInt(Math.random() * 10), msgs: [] }

    state = carReducer(state, { type: SET_CARS, cars: [car1] })
    console.log('After SET_CARS:', state)

    state = carReducer(state, { type: ADD_CAR, car: car2 })
    console.log('After ADD_CAR:', state)

    state = carReducer(state, { type: UPDATE_CAR, car: { ...car2, vendor: 'Good' } })
    console.log('After UPDATE_CAR:', state)

    state = carReducer(state, { type: REMOVE_CAR, carId: car2._id })
    console.log('After REMOVE_CAR:', state)

    const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    state = carReducer(state, { type: ADD_CAR_MSG, carId: car1._id, msg })
    console.log('After ADD_CAR_MSG:', state)

    state = carReducer(state, { type: REMOVE_CAR, carId: car1._id })
    console.log('After REMOVE_CAR:', state)
}

