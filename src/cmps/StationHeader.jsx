
export function StationHeader({station}) {
    console.log(station);
    
    return (
        <section className="station-details">
            <p>playlist</p>
            <img src={station.imgURL} alt="" />
            <h2>{station.name}</h2>
            <p>playlist description</p>
            <button>user name</button>
            <p>playlist info</p>
        </section>
    )
}