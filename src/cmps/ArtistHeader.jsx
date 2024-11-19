import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import userIcon from '../../public/assets/user.svg';



export function ArtistHeader() {
    const artist = useSelector(storeState => storeState.stationModule.currentArtist);

    // console.log(artist)

    return (
        <Box
            className="header-station"
            sx={{
                position: 'relative',  // Enable absolute positioning for child elements
                color: '#fff',
                height: 350,
                backgroundImage: `url(${artist.images[0]?.url || userIcon})`,  // Dynamic image URL or fallback
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 4,
                margin: 0,
            }}
        >
            {/* Artist Details - Bottom Left */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: {
                            xs: '4rem',
                            sm: '5rem',
                        },
                        fontWeight: 'bold',
                        fontFamily: '"SpotifyMix", sans-serif',
                    }}
                >
                    {artist.name || 'Unknown Artist'}
                </Typography>

                <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                    Followers: {artist.followers.total?.toLocaleString() || 'Unknown Followers'}
                </Typography>
            </Box>

            {/* Playlist Actions - Bottom Right */}
            <Box
                className="playlist-actions"
                sx={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    display: 'flex',
                    gap: 3,
                    alignItems: 'center',
                }}
            >
                <button
                    className="station-play-btn"
                    style={{
                        color: '#1ed760',
                        fontSize: '3rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                    }}
                >
                    <PlayCircleFilledIcon style={{ fontSize: '66px'  }} />
                </button>

            </Box>
        </Box>
    );
}
