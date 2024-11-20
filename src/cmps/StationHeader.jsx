import { useEffect, useState } from 'react'
import { Box, Button, Typography, IconButton, Modal, TextField, Grid, Avatar } from '@mui/material'
import { setIsPlaying, loadSong } from '../store/actions/station.actions.js'
import EditIcon from '@mui/icons-material/Edit'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import userIcon from '../../public/assets/user.svg'
import { MoreHoriz } from '@mui/icons-material'
import HamburgerIcon from '../../public/assets/hamburger.svg'
import { StationEdit } from './StationEdit'
import { useSelector, useDispatch } from 'react-redux'
import { stationService } from '../services/station/'

export function StationHeader() {
    const station = useSelector(storeState => storeState.stationModule.currentStation)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [updatedImgURL, setUpdatedImgURL] = useState(station?.images?.[0]?.url)
    const [openFileUpload, setOpenFileUpload] = useState(false)
    const totalDuration = stationService.calculateTotalDuration(station.tracks)
    

    const dispatch = useDispatch()

    function onEditStation() {
        setOpenFileUpload(false)
        setIsModalOpen(true)
    }

    function onImageClick() {
        setOpenFileUpload(true)
        setIsModalOpen(true)
    }

    function onCloseModal() {
        setIsModalOpen(false)
    }

    function handleImageUpload(url) {
        setUpdatedImgURL(url)
    }


    function handlePlayFirstSong() {
        if (station.songs && station.songs.length > 0) {
            const firstSong = station.tracks[0];  // Assuming 'id' is the identifier for the song
            console.log("Playing first song with ID:", firstSongId);

            // Dispatch the action to load the song and set it as playing
            dispatch(loadSong(firstSong))  // Assuming loadSong triggers the appropriate Redux logic to load the song
            dispatch(setIsPlaying(true))  // Set the player as playing
        } else {
            console.log('No songs found in station')
        }
    }

    return (
        <Box
            className='header-station'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                color: '#fff',

            }}
        >
            {/* Station Details */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                {/* Station Image with Edit Icon */}
                <Box
                    sx={{
                        display: 'block',
                        position: 'relative',
                        width: { xs: 128, sm: 128, md: 128, lg: 180, xl: 232 },
                        height: { xs: 128, sm: 128, md: 128, lg: 180, xl: 232 },
                        minWidth: 128, // Prevents the image from becoming too small
                        minHeight: 128, // Prevents the image from becoming too small
                        maxWidth: 232,
                        maxHeight: 232,
                        '&:hover .overlay, &:hover .edit-icon-button, &:hover .choose-photo-text': {
                            opacity: 1, // Show overlay, icon, and text on hover
                        },
                    }}
                >
                    <Box
                        component="img"
                        src={station?.images[0]?.url}
                        onClick={onImageClick}
                        alt="Station"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 1,
                            transition: 'transform 0.3s ease', // Smooth hover transition for scaling
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                    />

                    {/* Overlay Background */}
                    <Box
                        className="overlay"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            borderRadius: 1,
                            opacity: 0, // Initially hidden
                            transition: 'opacity 0.3s ease',
                        }}
                    />

                    {/* Edit Icon */}
                    <IconButton
                        onClick={onEditStation}
                        className="edit-icon-button"
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'white',
                            opacity: 0, // Initially hidden
                            zIndex: 1, // Ensure the icon is above the overlay
                            transition: 'opacity 0.3s ease',
                        }}
                    >
                        <EditIcon sx={{ fontSize: 70 }} /> {/* Larger icon size */}
                    </IconButton>

                    {/* Choose Photo Text */}
                    <Box
                        className="choose-photo-text"
                        sx={{
                            position: 'absolute',
                            top: '70%', // Adjust based on where you want the text
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: 'white',
                            fontSize: '16px',
                            opacity: 0, // Initially hidden

                        }}
                    >
                        Choose photo
                    </Box>
                </Box>

                {/* Playlist Info */}
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginBottom: '10px' }}>
                    <Typography variant="subtitle2" color="white">
                        Playlist
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: 'SpotifyMix-Extrabold',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: { xs: '1.8rem', sm: '3rem', md: '4rem', lg: '6rem', xl: '6rem' },

                            letterSpacing: { xs: '-3px' },
                            textAlign: { xs: 'left', sm: 'left' },
                            whiteSpace: 'nowrap',
                             overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                        onClick={onEditStation}
                    >

                        {station.name}
                    </Typography>

                    {station.description && (
                        <Typography
                            variant="body1"
                            sx={{
                              
                                fontSize: '1.2rem',
                                fontFamily: 'SpotifyMix',
                                fontWeight: '400',
                                color: 'white',
                                textAlign: { xs: 'center', sm: 'left' },
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: 'inline-block',
                                '@media (max-width: 1100px)': {
                                    maxWidth: '90%',
    
                                    },
                                    '@media (max-width: 950px)': {
                                        maxWidth: '70%',
        
                                        },
                                        '@media (max-width: 800px)': {
                                            maxWidth: '60%',
            
                                            },
                                '@media (max-width: 600px)': {
                                maxWidth: '60%',

                                    fontSize: '1rem',
                                },
                                '@media (max-width: 400px)': {
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    fontSize: '0.9rem',
                                    WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
                                    maskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
                                },
                            }}
                        >
                            {station.description}
                        </Typography>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                            {station.owner.display_name || 'User'}
                        </Typography>

                        <Typography variant="body2"
                            sx={{
                                fontSize: '0.875rem',
                                fontFamily: 'SpotifyMix',
                                fontWeight: '400',
                                color: '#b3b3b3',

                            }}>
                            • {station.tracks?.length || 0} {station.tracks?.length === 1 ? 'song' : 'songs'}
                            {totalDuration ? `, ${totalDuration}` : ''}
                        </Typography>

                    </Box>
                </Box>
            </Box>

            {/* Playlist Actions */}
            <Box className="playlist-actions"
                sx={{ display: 'flex', gap: 3 }}>
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
                    onClick={handlePlayFirstSong} // Add the play logic to this button
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
                        display: 'flex', // Use flexbox inside the button
                        alignItems: 'center', // Vertically align items
                        padding: '5px 10px', // Add padding to the button
                        opacity: 0.6,
                        color: 'white',
                        fontSize: 16
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.fill = '#121212')}
                    onMouseOut={(e) => (e.currentTarget.style.fill = '')}
                >
                    <span style={{ marginRight: '10px' }}>List</span> {/* Text inside the button */}
                    <img
                        src={HamburgerIcon}
                        alt="Sort Icon"
                        style={{ width: '20px', height: '20px' }} // Adjust icon size
                    />
                </button>
            </Box>

            {/* Modal for Station Edit */}
            <Modal open={isModalOpen} onClose={onCloseModal}>
                <StationEdit
                    station={station}
                    onClose={onCloseModal}
                    onImageUpload={handleImageUpload}
                    openFileUpload={openFileUpload}
                />
            </Modal>
        </Box>
    )
}
