import { StationHeader } from '../cmps/StationHeader.jsx'
import { SongList } from '../cmps/SongList.jsx'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import loaderIcon from '/assets/loader.svg'
import { useNavigate, useParams } from 'react-router'
import { loadStation, setBgColor ,setCurrentStation} from '../store/actions/station.actions.js'
import { FastAverageColor } from 'fast-average-color'
import { useDispatch } from 'react-redux'

const fac = new FastAverageColor()

export function StationDetails() {
    const [showFindMoreSection, setShowFindMoreSection] = useState(false)

    const [station, setStation] = useState(null)
    const { stationId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        setBgColorDetails(station)
    }, [station])

    async function setBgColorDetails(station) {
        if (station && station.imgURL) {
            try {
                const color = await fac.getColorAsync(station.imgURL)
                dispatch(setBgColor(color.rgb)) // Dispatch color to update background
            } catch (error) {
                // console.error('Error fetching average color:', error)
            }
        }
    }

    useEffect(() => {
        async function fetchStation() {
            try {
                const currStation = await loadStation(stationId)
                setCurrentStation(stationId)
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
            <SongList  />
            {renderStationImage()}
        </section>
    )
}
