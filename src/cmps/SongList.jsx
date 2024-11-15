import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { loadSong, setIsPlaying } from '../store/actions/station.actions.js'
import { Box, Typography, IconButton } from '@mui/material'
import { PlayArrow, Pause } from '@mui/icons-material'
import playingGif from '../../public/assets/playing.gif'

export function SongList({ station }) {
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const [activeIndex, setActiveIndex] = useState(null)
    const [playingIndex, setPlayingIndex] = useState(null)
    const [songs, setSongs] = useState(station.songs)

    useEffect(() => {
        setSongs(station.songs) // Update songs whenever station changes
    }, [station.songs])

    function handlePlayClick(songId, index) {
        loadSong(songId)
        setIsPlaying(true)
        setActiveIndex(index)
        setPlayingIndex(index)
    }

    function handlePauseClick() {
        setIsPlaying(false)
        setPlayingIndex(null)
    }

    function handleDragEnd(result) {
        if (!result.destination) return
        const reorderedSongs = Array.from(songs)
        const [movedSong] = reorderedSongs.splice(result.source.index, 1)
        reorderedSongs.splice(result.destination.index, 0, movedSong)
        setSongs(reorderedSongs)
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <section style={{ padding: '15px', borderRadius: '8px', marginLeft: 25, marginRight: 40 }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateRows: 'auto 1fr',
                        gridTemplateAreas: "'nav' 'songs'",
                        padding: 0,
                    }}
                >
                    {/* Header row */}
                    <Box
                        sx={{
                            gridArea: 'nav',
                            display: 'grid',
                            gridTemplateColumns: 'auto 7fr 7.3fr 0.2fr',
                            gridGap: 1,
                            paddingTop: 3,
                            '@media (max-width: 768px)': {
                                gridTemplateColumns: 'auto 1fr',
                                gridTemplateRows: 'auto auto auto',
                                textAlign: 'center',
                            },
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{ paddingRight: '1em', paddingLeft: '1.4em', opacity: 0.6, color: 'white' }}
                        >
                            #
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ paddingLeft: '1em', margin: 0, opacity: 0.6, color: 'white' }}
                        >
                            Title
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ opacity: 0.6, color: 'white', '@media (max-width: 768px)': { marginLeft: 0 } }}
                        >
                            Album
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ opacity: 0.6, color: 'white', '@media (max-width: 768px)': { marginLeft: 0 } }}
                        >
                            Duration
                        </Typography>
                    </Box>

                    {/* Song list */}
                    <Droppable droppableId="songs">
                        {provided => (
                            <Box
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                sx={{ gridArea: 'songs', marginTop: 0 }}
                            >
                                <hr style={{ opacity: 0.2 }} />
                                {songs.map((song, idx) => (
                                    <Draggable key={song.id} draggableId={song.id} index={idx}>
                                        {(provided, snapshot) => (
                                            <Box
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    borderRadius: 1,
                                                    padding: '8px 12px',
                                                    marginBottom: 1,
                                                    cursor: 'pointer',
                                                    width: '100%',
                                                    backgroundColor:
                                                        activeIndex === idx
                                                            ? 'rgba(144, 144, 144, 0.6)'
                                                            : snapshot.isDragging
                                                            ? 'rgba(144, 144, 144, 0.3)'
                                                            : 'inherit',
                                                    '&:hover': { backgroundColor: 'rgba(144, 144, 144, 0.2)' },
                                                }}
                                                onMouseEnter={() => setHoveredIndex(idx)}
                                                onMouseLeave={() => setHoveredIndex(null)}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: '40px',
                                                        marginLeft: '-1.5em',
                                                    }}
                                                >
                                                    {activeIndex === idx &&
                                                    playingIndex === idx &&
                                                    hoveredIndex === idx ? (
                                                        <IconButton
                                                            onClick={handlePauseClick}
                                                            sx={{ marginLeft: 4, color: 'white' }}
                                                            title="pause"
                                                        >
                                                            <Pause />
                                                        </IconButton>
                                                    ) : activeIndex === idx && playingIndex === idx ? (
                                                        <img
                                                            src={playingGif}
                                                            alt="Playing"
                                                            className="playing-gif"
                                                            style={{ width: '14px', height: '14px' }}
                                                        />
                                                    ) : hoveredIndex === idx ? (
                                                        <IconButton
                                                            onClick={() => handlePlayClick(song.id, idx)}
                                                            sx={{
                                                                marginLeft: 4,
                                                                width: '14px',
                                                                height: '14px',
                                                                color: 'white',
                                                            }}
                                                            title={`Play ${song.title} by ${song.artist}`}
                                                        >
                                                            <PlayArrow />
                                                        </IconButton>
                                                    ) : (
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                marginLeft: 4,
                                                                color: 'white',
                                                                opacity: 0.7,
                                                                color: activeIndex === idx ? '#1ed760' : 'white',
                                                            }}
                                                        >
                                                            {idx + 1}
                                                        </Typography>
                                                    )}
                                                </Box>

                                                {/* Song details */}
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
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            marginLeft: 1.5,
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="body1"
                                                            sx={{
                                                                fontWeight: 600,
                                                                cursor: 'pointer',
                                                                color: activeIndex === idx ? '#1ed760' : 'white',
                                                                '&:hover': {
                                                                    textDecoration: 'underline',
                                                                },
                                                            }}
                                                            title={` ${song.title}`}
                                                        >
                                                            {song.title}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                cursor: 'pointer',
                                                                color: 'rgba(255, 255, 255, 0.7)',
                                                                '&:hover': {
                                                                    color: 'white',
                                                                    textDecoration: 'underline',
                                                                },
                                                            }}
                                                            title={` ${song.artist}`}
                                                        >
                                                            {song.artist}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                {/* Album and Duration columns */}
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        marginLeft: 'auto',
                                                        width: '50%',
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            textAlign: 'left',
                                                            color: 'rgba(255, 255, 255, 0.6)',
                                                            marginRight: 10,
                                                            marginLeft: -3,
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                textDecoration: 'underline',
                                                            },
                                                        }}
                                                        title={` ${song.album}`}
                                                    >
                                                        {song.album}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ color: 'rgba(255, 255, 255, 0.6)', marginLeft: -3 }}
                                                    >
                                                        {song.duration}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Box>
                        )}
                    </Droppable>
                </Box>
            </section>
        </DragDropContext>
    )
}
