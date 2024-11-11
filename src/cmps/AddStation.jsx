import { useState } from 'react'
import { stationLocalService } from '../services/station/station.service.local'

import defaultImgIcon from '../../public/assets/defaultImgIcon.svg'
import { Link } from 'react-router-dom'

export function AddStation({ onAddStation }) {
    const [stationName, setStationName] = useState('')
    const [stationDescription, setStationDescription] = useState('')

    const [stationToEdit, setStationToEdit] = useState(stationLocalService.getEmptyStation())

    function handleAddStation() {
        if (!stationName) return
        onAddStation(stationName)
        setStationName('')
        setStationDescription('')
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    return (
        <div className="add-station-container">
            <div className="station-header">
                <div className="station-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        data-testid="track"
                        viewBox="0 0 24 24"
                        class="Svg-sc-ytk21e-0 bneLcE"
                    >
                        <path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z" />
                    </svg>
                </div>
                <div className="station-info">
                    <Link to="/station/add/edit">
                        <h1>{stationName || 'New Playlist'}</h1>
                    </Link>
                    <p>Your Name •</p>
                </div>
            </div>
            <hr />
            <div className="station-content">
                <p>Let's find something for your playlist</p>
                <div className="search-bar">
                    <input type="text" placeholder="Search for songs or episodes" />
                    <button className="close-btn">✕</button>
                </div>
            </div>
        </div>
    )
}
