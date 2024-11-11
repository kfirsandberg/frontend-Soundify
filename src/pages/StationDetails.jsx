import { StationHeader } from "../cmps/StationHeader.jsx"
import { SongList } from "../cmps/SongsList.jsx"
import { useSelector } from 'react-redux'
import { useState } from 'react'

export function StationDetails() {
  const station = useSelector(state => state.stationModule.station)
  const [showFindMoreSection, setShowFindMoreSection] = useState(false)

  if (!station) {
    return <div>No station ID provided</div>
  }


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
    return <button onClick={onFindMore}>Find more</button>

  }
  return (
    <section className="station-details-main">
      <StationHeader station={station} />
      <SongList station={station} />
      {renderStationImage()}
    </section>
  )
}