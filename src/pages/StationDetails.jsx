import { StationHeader } from '../cmps/StationHeader.jsx'
import { SongList } from '../cmps/SongList.jsx'

import { useEffect, useState  } from 'react'
import loaderIcon from '/assets/loader.svg'
import { useNavigate, useParams } from 'react-router'
import { loadStation, setBgColor } from '../store/actions/station.actions.js'
import { FastAverageColor } from 'fast-average-color'
import { useDispatch ,useSelector} from 'react-redux'

const fac = new FastAverageColor()

export function StationDetails() {
    const [showFindMoreSection, setShowFindMoreSection] = useState(false)
    const station = useSelector(storeState => storeState.stationModule.currentStation)

    const { stationId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        setBgColorDetails(station)
    }, [station])

    async function setBgColorDetails(station) {

        if (station && station.images[0].url) {
            try {
                const color = await fac.getColorAsync(station.images[0].url)
                dispatch(setBgColor(color.rgb)) // Dispatch color to update background
            } catch (error) {
                // console.error('Error fetching average color:', error)
            }
        }
    }


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
            <StationHeader />
            <SongList  />
            {/* {renderStationImage()} */}
        </section>
    )
}
