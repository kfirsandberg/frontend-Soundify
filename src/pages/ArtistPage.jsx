import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { artistService } from '../services/artist/artistService.js';
import loaderIcon from '/assets/loader.svg';

import { ArtistHeader } from '../cmps/ArtistHeader.jsx';
import { SongList } from '../cmps/SongList.jsx';



export function ArtistPage() {
    const { artistId } = useParams();  // Get artistId from URL parameters
    const [artist, setArtist] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // console.log('Fetching artist with ID:', artistId);  
        fetchArtistData();
    }, [artistId]);

    async function fetchArtistData() {
        setIsLoading(true);
        setError(null);
        try {
            const data = await artistService.getArtistById(artistId)
            setArtist(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

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
            <ArtistHeader station={artist.artist} />
            <SongList station={{ tracks: artist.tracks }} />
        </section>
    );

}
