import { useState } from 'react'
import { Box, Button, Typography, IconButton, Modal, TextField, Grid, Avatar } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import userIcon from '../../public/assets/user.svg'
import { MoreHoriz } from '@mui/icons-material'
import HamburgerIcon from '../../public/assets/hamburger.svg'
import { StationEdit } from './StationEdit'

export function StationHeader({ station }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [updatedImgURL, setUpdatedImgURL] = useState(station.imgURL)
    const [openFileUpload, setOpenFileUpload] = useState(false)

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

                        '&:hover .overlay, &:hover .edit-icon-button': {
                            opacity: 1, // Show overlay and icon button on hover
                        },
                    }}
                >
                    <Box
                        component="img"
                        src={station.imgURL || userIcon}
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
                            opacity: 0,
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
                        }}
                    >
                        <EditIcon sx={{ fontSize: 70 }} /> {/* Larger icon size */}
                    </IconButton>
                </Box>

                {/* Playlist Info */}
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginLeft: '10px' }}>
                    <Typography variant="subtitle2" color="white">
                        Playlist
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: 'SpotifyMix-Extrabold', // Add this line to specify the font
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '6rem', xl: '6rem' },
                            // lineHeight: { xs: '2.5rem', sm: '3.5rem', md: '5rem' },
                            letterSpacing: { xs: '-3px' },
                            textAlign: { xs: 'center', sm: 'left' },
                            whiteSpace: 'nowrap', // Prevents the text from wrapping


                            overflow: 'hidden', // Optional: Hides text overflow if the text exceeds the container width
                            textOverflow: 'ellipsis', // Optional: Adds ellipsis if the text is cut off
                        }}
                        onClick={onEditStation}
                    >
                        {station.name}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar src={station.creatorImgURL || userIcon} alt="Creator" sx={{ width: 24, height: 24 }} />
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                            {station.creatorName || 'User'}
                        </Typography>

                        <Typography variant="body2">
                            • {station.songs?.length || 0} {station.songs?.length === 1 ? 'song' : 'songs'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {station.totalDuration}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Playlist Actions */}
            <Box className="playlist-actions"
                sx={{ display: 'flex', gap: 5 }}>
                <button
                    style={{
                        color: '#1ed760',
                        fontSize: '3rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        marginLeft:10
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
                    }}
                >
                    <MoreHoriz />
                </button>
                <button
                    style={{
                        backgroundColor: 'inherit',
                        marginLeft: 'auto',
                        border: 'none',
                        boxShadow: 'none',
                        cursor: 'pointer',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.fill = '#121212')}
                    onMouseOut={(e) => (e.currentTarget.style.fill = '')}
                >
                    <img src={HamburgerIcon} alt="Sort Icon" style={{ width: '20px', height: '20px', marginRight: 20 }} />
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
