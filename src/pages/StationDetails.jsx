import { StationHeader } from "../cmps/StationHeader.jsx"
import { SongList } from "../cmps/SongsList.jsx"
export function StationDetails() {

  return (
    <section className="station-container">
      <StationHeader />
      <SongList />
    </section>
  )
}