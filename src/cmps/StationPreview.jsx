
export function StationPreview({station}) {

    const { name, imgURL } = station
    return (
        <section className="station-preview">
            <img src={imgURL} alt={name} />
            <h3>{name}</h3>
        </section>
    )

}