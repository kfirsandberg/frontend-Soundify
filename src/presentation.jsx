
import { FastAverageColor } from 'fast-average-color'
import { setBgColor } from './store/actions/station.actions.js'

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
            style={{
                backgroundColor: `${bgColor}`,


            }}
        >
            <div
                style={{
                    background: `linear-gradient(to top, #121212 80%,  rgba(18, 18, 18, 0) 100%)`,

                }}
            >
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





