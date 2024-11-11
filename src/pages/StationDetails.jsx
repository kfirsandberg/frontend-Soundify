import { StationHeader } from '../cmps/StationHeader.jsx'
import { SongList } from '../cmps/SongsList.jsx'
import { useSelector } from 'react-redux'
import loaderIcon from '../../public/assets/loader.svg'

export function StationDetails() {
    const station = useSelector(state => state.stationModule.station)

    if (!station) {
        return (
                <img src={loaderIcon} alt="Loading..." className="loader-icon"/>
        )
    }

    return (
        <section className="station-details-main">
            <StationHeader station={station} />
            <SongList station={station} />
        </section>
    )
}
