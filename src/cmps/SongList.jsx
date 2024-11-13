import React, { useState } from 'react'
import { loadSong, setIsPlaying } from '../store/actions/station.actions.js'
import { Box, Typography, IconButton } from '@mui/material'
import { PlayArrow } from '@mui/icons-material'



export function SongList({ station }) {
    const [hoveredIndex, setHoveredIndex] = useState(null)

    function handlePlayClick(songId) {
        loadSong(songId)
        setIsPlaying(true)
    }

    return (
        <section style={{ padding: '15px', borderRadius: '8px', marginLeft: 25, marginRight: 40 }}>
            <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr', gridTemplateAreas: "'nav' 'songs'", padding: 0 }}>
                <Box
                    sx={{
                        gridArea: 'nav',
                        display: 'grid',
                        gridTemplateColumns: 'auto 7fr 7.3fr 0.2fr',
                        gridGap: 1,
                        paddingTop: 3,
                        '@media (max-width: 768px)': {
                            gridTemplateColumns: 'auto 1fr', // On small screens, stack columns
                            gridTemplateRows: 'auto auto auto', // Ensure each element stays on its own line
                            textAlign: 'center', // Optionally center text on smaller screens
                        },
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            paddingRight: '1em',
                            paddingLeft: '1.4em',
                            opacity: 0.6,
                            color: 'white',
                        }}
                    >
                        #
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            paddingLeft: '1em',
                            margin: 0,
                            opacity: 0.6,
                            color: 'white',
                        }}
                    >
                        Title
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            opacity: 0.6,
                            color: 'white',
                            '@media (max-width: 768px)': {
                                marginLeft: 0, // Remove gap on smaller screens
                            },
                        }}
                    >
                        Album
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            opacity: 0.6,
                            color: 'white',
                            '@media (max-width: 768px)': {
                                marginLeft: 0, // Remove gap on smaller screens
                            },
                        }}
                    >
                        Duration
                    </Typography>
                </Box>

                {/* Song list */}
                <Box sx={{ gridArea: 'songs', marginTop: 0 }}>
                    <hr style={{ opacity: 0.2 }} />
                    {station.songs.map((song, idx) => (
                        <Box
                            key={song.id}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: 1,
                                padding: '8px 12px',
                                marginBottom: 1,
                                cursor: 'pointer',
                                width: '100%', // Default width
                                '&:hover': {
                                    backgroundColor: 'rgba(144, 144, 144, 0.2)',
                                },
                            }}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Left column with index and play icon */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '40px',
                                    marginLeft: '-1.5em',
                                }}
                            >
                                {hoveredIndex === idx ? (
                                    <IconButton
                                        onClick={() => handlePlayClick(song.id)}
                                        sx={{ marginLeft: 4, color: 'white' }}
                                    >
                                        <PlayArrow />
                                    </IconButton>
                                ) : (
                                    <Typography variant="body2" sx={{ marginLeft: 4, color: 'white', opacity: 0.7 }}>
                                        {idx + 1}
                                    </Typography>
                                )}
                            </Box>

                            {/* Song details (image, title, artist) */}
                            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 4 }}>
                                <Box
                                    component="img"
                                    src={song.imgURL}
                                    alt={`${song.title} cover`}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 1,
                                        objectFit: 'cover',
                                    }}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 1.5 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'white' }}>
                                        {song.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                        {song.artist}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Album and Duration columns */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', width: '50%' }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        textAlign: 'left',
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        marginRight: 10,
                                        marginLeft: -3, // Move album more to the left
                                    }}
                                >
                                    {song.album}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        marginLeft: -3, // Move duration more to the left
                                    }}
                                >
                                    {song.duration}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </section>
    )
}
