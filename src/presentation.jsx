const fac = new FastAverageColor()

export function StationDetails() {
    useEffect(() => {
        setBgColorDetails(station)
    }, [stationId])

    async function setBgColorDetails(station) {
        if (station && station.images[0].url) {
            try {
                const color = await fac.getColorAsync(station.images[0].url)
                setBgColor(color.hex)
            } catch (error) {
                console.error('Error fetching average color:', error)
            }
        }
    }
}

export function RootCmp() {
    const bgColor = useSelector(storeState => storeState.stationModule.bgColor)
    return (
        <main
            className="station-index-route"
            style={{backgroundColor: `${bgColor}`}}>
            <div className="main-bg-color">
                <Routes>
                    <Route path="/" element={<StationIndex />} />
                    <Route path="/browse" element={<BrowseIndex />} />
                    <Route path="/search" element={<SearchDetails />} />
                    <Route path="/playlist/:stationId" element={<StationDetails />} />
                </Routes>
            </div>
        </main>
    )
}

.main-bg-color{
    background: `linear-gradient(to top, #121212 80%,  rgba(18, 18, 18, 0) 100%)`;
}



