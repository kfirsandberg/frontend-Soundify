import { useEffect } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import userIcon from '../../public/assets/user.svg';
import { MoreHoriz } from '@mui/icons-material';
import HamburgerIcon from '../../public/assets/hamburger.svg';
import { useParams } from 'react-router-dom'

import { setArtistId } from '../store/actions/artist.actions.js'

export function ArtistHeader() {
    
    const { artistId } = useParams()
    console.log(artistId)
    
    const dispatch = useDispatch()

    useEffect(() => {
        if (artistId) {
            dispatch(setArtistId(artistId))
        }
    }, [artistId, dispatch])



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
                    src={ userIcon}
                    alt={artistId.name || 'Artist'}
                    sx={{
                        width: { xs: 128, sm: 128, md: 128, lg: 180, xl: 232 },
                        height: { xs: 128, sm: 128, md: 128, lg: 180, xl: 232 },
                    }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginLeft: '10px' }}>
                    <Typography variant="h2" sx={{ fontSize: '3rem', fontWeight: 'bold' }}>
                        {artistId.name || 'Unknown Artist'}
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                        {artistId.genre || 'Unknown Genre'}
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
