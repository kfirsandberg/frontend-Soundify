
export function StationHeader({ station }) {

    return (
        <section className="station-details">
            <img src={station.imgURL} alt="" />
            <section className="playlist-details">
                <p>playlist</p>
                <h2>{station.name}</h2>
                <p>playlist description</p>
                <button>user name</button>
                <p>playlist info</p>

            </section>
        </section>
    )
}