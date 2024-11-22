import { useEffect, useState } from 'react'

import { artistService } from '../services/artist/artistService.js'
import loaderIcon from '/assets/loader.svg'

import { ArtistHeader } from '../cmps/ArtistHeader.jsx'
import { SongList } from '../cmps/SongList.jsx'
import { ArtistSongList } from '../cmps/ArtistSongList.jsx'
import { useSelector } from 'react-redux'

export function ArtistPage() {
    const artist = useSelector(storeState => storeState.stationModule.currentArtist)
    console.log(artist);
    
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)


    async function onArtistClick(song) {

        const artistId = song.track.artists[0].id
        await getArtist(artistId)
        console.log(artist);

        navigate(`/artist/${artistId}`)
    }

    useEffect(() => {
        if (artist) {
            setIsLoading(false)
        } else {
            
            onArtistClick()
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
            {/* <ArtistSongList station={{ tracks: artist.tracks }} /> */}
            <ArtistSongList artist={artist} />
        </section>
    );
}
