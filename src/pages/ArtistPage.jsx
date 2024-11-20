import { useEffect, useState } from 'react'

import { artistService } from '../services/artist/artistService.js'
import loaderIcon from '/assets/loader.svg'

import { ArtistHeader } from '../cmps/ArtistHeader.jsx'
import { SongList } from '../cmps/SongList.jsx'
import { ArtistSongList } from '../cmps/ArtistSongList.jsx'
import { useSelector } from 'react-redux'

export function ArtistPage() {
    const artist = useSelector(storeState => storeState.stationModule.currentArtist)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (artist) {
            setIsLoading(false)
        } else {
            
            artistService.getArtistDetails()
                .then(data => {
           
                    setIsLoading(false)
                })
                .catch(err => {
                    setError('Failed to load artist details.');
                    setIsLoading(false)
                })
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

    return (
        <section className="artist-details-main">
            <ArtistHeader />
            <ArtistSongList station={{ tracks: artist.tracks }} />
        </section>
    );
}
