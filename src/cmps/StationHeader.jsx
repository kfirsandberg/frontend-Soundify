import { useEffect, useState } from 'react'
import { Box, Typography, IconButton, Modal, useMediaQuery } from '@mui/material'
import { setIsPlaying, loadSong } from '../store/actions/station.actions.js'
import EditIcon from '@mui/icons-material/Edit'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled'
import { MoreHoriz } from '@mui/icons-material'
import HamburgerIcon from '../../public/assets/hamburger.svg'
import { StationEdit } from './StationEdit'
import { useSelector, useDispatch } from 'react-redux'
import { stationService } from '../services/station/'

export function StationHeader() {
    const station = useSelector(storeState => storeState.stationModule.currentStation)
    const isPlaying = useSelector((storeState) => storeState.stationModule?.isPlaying || false)
    const [currentSong, setCurrentSong] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [setUpdatedImgURL] = useState(station?.images?.[0]?.url)
    const [openFileUpload, setOpenFileUpload] = useState(false)
    const totalDuration = stationService.calculateTotalDuration(station.tracks)


    const isMobile = useMediaQuery('(max-width: 400px)')
    const isFlexScreen = useMediaQuery('(max-width: 900px)')



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

    function truncateText(text, maxLength) {
        return text
    }



    function handlePlayPause() {
        if (isPlaying) {

            console.log("Pausing song:", currentSong?.track?.id || 'No song playing')
            new Promise((resolve) => {
                dispatch(setIsPlaying(false))
                resolve()
            }).then(() => {
                console.log("Playback paused.")
            });
        } else {


            new Promise((resolve) => {
                if (!currentSong && station?.tracks?.length > 0) {
                    const firstSong = station.tracks[0];
                    console.log("Loading first song with ID:", firstSong.track.id)
                    dispatch(loadSong(firstSong))
                    setCurrentSong(firstSong)
                }
                resolve()
            }).then(() => {
                dispatch(setIsPlaying(true))
                console.log("Playback started.")
            })
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
            <Box className='station-header' sx={{ display: 'flex', gap: 2 }}>
                {/* Station Image with Edit Icon */}
                <Box
                    className='station-img'
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
                        <EditIcon
                            sx={{
                                fontSize: {
                                    xs: 40, // Small screens
                                    sm: 50, // Medium screens
                                    md: 40, // Larger screens
                                    lg: 70, // Largest screens
                                },
                            }}
                        />
                    </IconButton>

                    {/* Choose Photo Text */}
                    <Box
                        className="choose-photo-text"
                        sx={{
                            width: 120,
                            position: 'absolute',
                            top: '70%',
                            left: {
                                xs: '65%',  // For xs (small screens), set left to 60%
                                sm: '60%', 
                                md: '50%' // For sm and larger, set left to 50%
                            },
                            transform: 'translateX(-50%)',
                            color: 'white',
                            fontSize: {
                                xs: '12px', // Small screens
                                sm: '14px', // Medium screens
                                md: '12px', // Larger screens
                                lg: '18px', // Largest screens
                            },
                            opacity: 0, // Initially hidden
                        }}
                    >
                        Choose photo
                    </Box>
                </Box>

                {/* Playlist Info */}
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginBottom: '10px' }}>
                    <Typography className='playlist-tag' variant="subtitle2" color="white">
                        Playlist
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: 'SpotifyMix-Extrabold, Ariel, sans-serif',
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

                        {isMobile
                            ? truncateText(station.name, 14) // Truncate to 8 letters on mobile
                            : isFlexScreen
                                ? truncateText(station.name, 14) // Truncate to 14 letters on flex screen
                                : truncateText(station.name, 22)}
                    </Typography>

                    {station.description && (
                        <Typography
                            className='station-description'
                            variant="body1"
                            sx={{

                                fontSize: '0.9rem',
                                fontFamily: 'SpotifyMix',
                                fontWeight: '400',
                                color: '#ffffffa3',
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
                            {isMobile
                                ? truncateText(station.description, 30) // Truncate to 8 letters on mobile
                                : isFlexScreen
                                    ? truncateText(station.description, 40) // Truncate to 14 letters on flex screen
                                    : truncateText(station.description, 70)}
                        </Typography>
                    )}

                    <Box sx={{
                        display: 'flex', alignItems: 'center', gap: 1,
                        '@media (max-width: 768px)': {
                            alignItems: 'baseline',
                            flexDirection: 'column'
                        }
                    }}>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                            {station.owner.display_name || 'User'}
                        </Typography>

                        <Typography
                        className='playlist-durations'
                            variant="body2"
                            sx={{
                                fontSize: '0.875rem',
                                fontFamily: 'SpotifyMix',
                                fontWeight: '400',
                                color: '#b3b3b3',
                            }}
                        >
                            • {station.tracks?.length || 0}{' '}
                            {station.tracks?.length === 1 ? 'song' : 'songs'}
                            {totalDuration ? `, ${isMobile
                                ? truncateText(totalDuration, 15)
                                : isFlexScreen
                                    ? truncateText(totalDuration, 40)
                                    : truncateText(totalDuration, 70)}`
                                : ''}
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
                    onClick={handlePlayPause} // Toggle play/pause
                >
                    {isPlaying ? (
                        <PauseCircleFilledIcon style={{ fontSize: '66px' }} />
                    ) : (
                        <PlayCircleFilledIcon style={{ fontSize: '66px' }} />
                    )}
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
