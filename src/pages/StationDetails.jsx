import { StationHeader } from "../cmps/StationHeader"
import { SongsList } from "../cmps/SongsList"
export function StationDetails() {

  return (
    <section className="station-container">
      <StationHeader />
      <SongsList />
    </section>
  )
}