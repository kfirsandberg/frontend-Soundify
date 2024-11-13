import { useState } from 'react'
import { Box, Button, Typography, IconButton, Modal, TextField, Grid, Avatar } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import userIcon from '../../public/assets/user.svg'
import { MoreHoriz } from '@mui/icons-material'

import HamburgerIcon from '../../public/assets/hamburger.svg'

export function StationHeader({ station }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editedStation, setEditedStation] = useState({
        ...station,
    })

    const onEditStation = () => setIsModalOpen(true)
    const onCloseModal = () => setIsModalOpen(false)

    const handleInputChange = event => {
        const { name, value } = event.target
        setEditedStation(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSave = () => setIsModalOpen(false)

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                color: '#fff',
                padding: 5,
                marginBottom: -5,
            }}
        >
            {/* Station Details */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                {/* Station Image with Edit Icon */}
                <Box
                    sx={{
                        display: 'block',
                        position: 'relative',
                        width: { xs: 128, sm: 128, md: 128, lg: 232, xl: 232 },
                        height: { xs: 128, sm: 128, md: 128, lg: 232, xl: 232 },
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
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '5rem', xl: '6rem' },
                            // lineHeight: { xs: '2.5rem', sm: '3.5rem', md: '5rem' },
                            letterSpacing: { xs: '0.5px', sm: '1px', md: '1.5px' },
                            textAlign: { xs: 'center', sm: 'left' },
                            whiteSpace: 'nowrap', // Prevents the text from wrapping
                            marginTop: '5px',

                            marginBottom: '20px',

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
            <Box sx={{ display: 'flex', gap: 0, marginTop: 5 }}>
                <IconButton sx={{ color: '#1ed760', fontSize: '3rem' }}>
                    <PlayCircleFilledIcon sx={{ fontSize: 70, marginRight: 3 }} />
                </IconButton>
                <IconButton sx={{ color: 'white' }}>
                    <MoreHoriz />
                </IconButton>
                <Button
                    variant="contained"
                    color="inherit"
                    sx={{
                        backgroundColor: 'inherit',
                        marginLeft: 'auto',
                        border: 'none',
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: 'none',
                            fill: '#121212',
                        },
                        '&:active': {
                            boxShadow: 'none',
                        },
                    }}
                >
                    <Box component="img" src={HamburgerIcon} alt="Sort Icon" sx={{ width: 20, height: 20 }} />
                </Button>
            </Box>
        </Box>
    )
}
