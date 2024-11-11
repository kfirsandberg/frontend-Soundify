import { StationHeader } from "../cmps/StationHeader.jsx"
import { SongList } from "../cmps/SongsList.jsx"
import { useSelector } from 'react-redux'

export function StationDetails() {
  const station = useSelector(state => state.stationModule.station)

  if (!station) {
    return <div>No station ID provided</div>
  }
  
  return (
    <section className="station-details-main">
       <StationHeader station={station} />
       <SongList station={station} />
    </section>
  )
}