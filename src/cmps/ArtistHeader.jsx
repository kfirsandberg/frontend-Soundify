import { useEffect } from 'react';
import { Box, Typography, Avatar } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { fetchArtistById } from '../store/actions/artist.actions.js' // Correct import
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import userIcon from '../../public/assets/user.svg'
import { MoreHoriz } from '@mui/icons-material'
import HamburgerIcon from '../../public/assets/hamburger.svg'


export function ArtistHeader({ station, artistId }) {
    const dispatch = useDispatch()

    // Access artist data and loading/error state from Redux
    const { artist, loading, error } = useSelector((state) => state.artistModule)

    // Fetch artist data when the component mounts
    useEffect(() => {
        if (artistId) {
            console.log('Artist ID detected:', artistId); // Log the artist ID
            console.log('Dispatching fetchArtistById...')
            dispatch(fetchArtistById(artistId)); // Correct function name
        } else {
            console.log('No artist ID provided.')
        }
    }, [artistId, dispatch])

    function handlePlayFirstSong() {
        if (station?.songs?.length > 0) {
            const firstSong = station?.songs[0]
            console.log('Playing first song:', firstSong)
            
        } else {
            console.log('No songs found in station')
        }
    }

    if (loading) return <Typography>Loading artist...</Typography>;
    if (error) return <Typography>Error loading artist: {error}</Typography>;

    return (
        <Box
            className="header-station"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                color: '#fff',
            }}
        >
            {/* Artist Details */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                {/* Artist Image */}
                <Avatar
                    src={artist?.imageUrl || userIcon}
                    alt={artist?.name || 'Artist'}
                    sx={{
                        width: { xs: 128, sm: 128, md: 128, lg: 180, xl: 232 },
                        height: { xs: 128, sm: 128, md: 128, lg: 180, xl: 232 },
                    }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginLeft: '10px' }}>
                    <Typography variant="h2" sx={{ fontSize: '3rem', fontWeight: 'bold' }}>
                        {artist?.name || 'Unknown Artist'}
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                        {artist?.genre || 'Unknown Genre'}
                    </Typography>
                </Box>
            </Box>

            {/* Playlist Actions */}
            <Box className="playlist-actions" sx={{ display: 'flex', gap: 3 }}>
                <button
                    className="station-play-btn"
                    style={{
                        color: '#1ed760',
                        fontSize: '3rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        marginLeft: 5,
                    }}
                    onClick={handlePlayFirstSong}
                >
                    <PlayCircleFilledIcon style={{ fontSize: '66px' }} />
                </button>
                <button
                    style={{
                        color: 'white',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        opacity: 0.6,
                    }}
                >
                    <MoreHoriz style={{ fontSize: '30px' }} />
                </button>
                <button
                    style={{
                        backgroundColor: 'inherit',
                        marginLeft: 'auto',
                        border: 'none',
                        boxShadow: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '5px 10px',
                        opacity: 0.6,
                        color: 'white',
                        fontSize: 16,
                    }}
                >
                    <span style={{ marginRight: '10px' }}>List</span>
                    <img
                        src={HamburgerIcon}
                        alt="Sort Icon"
                        style={{ width: '20px', height: '20px' }}
                    />
                </button>
            </Box>
        </Box>
    );
}
