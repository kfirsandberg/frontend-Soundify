import { StationHeader } from '../cmps/StationHeader.jsx'
import { SongList } from '../cmps/SongList.jsx'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import loaderIcon from '/assets/loader.svg'
import { useNavigate, useParams } from 'react-router'
import { loadStation } from '../store/actions/station.actions.js'

export function StationDetails() {
    const [showFindMoreSection, setShowFindMoreSection] = useState(false)

    const [station, setStation] = useState(null)
    const { stationId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchStation() {
            try {
                const currStation = await loadStation(stationId)
                setStation(currStation)
            } catch (err) {
                console.error('Failed to load station:', err)
            }
        }
        fetchStation()
    }, [station])

    function onFindMore() {
        setShowFindMoreSection(prevState => !prevState)
    }

    function renderStationImage() {
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
