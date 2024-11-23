import { useEffect, useState } from 'react'
import loaderIcon from '/assets/loader.svg'
import { ArtistHeader } from '../cmps/ArtistHeader.jsx'
import { ArtistSongList } from '../cmps/ArtistSongList.jsx'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getArtist } from '../store/actions/station.actions.js'

export function ArtistPage() {
    const artist = useSelector(storeState => storeState.stationModule.currentArtist)
    const isSearch = useSelector(storeState => storeState.stationModule.isSearch)
    const { artistId } = useParams(null)
    console.log(artist);
    
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchArtistResults = async () => {
            if (!artist) {
                await getArtist(artistId);
            }
        }
        fetchArtistResults();
    }, [artist, artistId])

    async function onArtistClick(song) {
        const artistId = song.track.artists[0].id
        await getArtist(artistId)
        navigate(`/artist/${artistId}`)
    }

    useEffect(() => {
        if (artist) {
            setIsLoading(false)
        }
    }, [artist])

    if (isLoading) {
        return <img src={loaderIcon} alt="Loading..." className="loader-icon" />;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }
    if (!artist) {
        return <div>No artist found.</div>;
    }
    if (isSearch) {
        return <img src={loaderIcon} alt="Loading..." className="loader-icon" />
    }
    return (
        <section className="artist-details-main">
            <ArtistHeader />
            {/* <ArtistSongList station={{ tracks: artist.tracks }} /> */}
            <ArtistSongList artist={artist} />
        </section>
    );
}
