import { StationHeader } from '../cmps/StationHeader.jsx'
import { SongList } from '../cmps/SongList.jsx'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import loaderIcon from '../../public/assets/loader.svg'

export function StationDetails() {
    const station = useSelector(state => state.stationModule.station)
    const [showFindMoreSection, setShowFindMoreSection] = useState(false)

    function onFindMore() {
        setShowFindMoreSection(prevState => !prevState)
    }

    const renderStationImage = () => {
        if (!station.songs || station.songs.length === 0 || showFindMoreSection) {
            return (
                <section>
                    <hr />
                    <div className="add-station-container">
                        <div className="station-content">
                            <p>Let's find something for your playlist</p>
                            <div className="search-bar">
                                <input type="text" placeholder="Search for songs or episodes" />
                                <button className="close-btn">✕</button>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
        return <button className='find-more-btn' onClick={onFindMore}>Find more</button>
    }

    if (!station) {
        return <img src={loaderIcon} alt="Loading..." className="loader-icon" />
    }
    return (
        <section className="station-details-main">
            <StationHeader station={station} />
            <SongList station={station} />
            {renderStationImage()}
        </section>
    )
}
