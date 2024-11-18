import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { loadSong, setIsPlaying, updateStation} from '../store/actions/station.actions.js'
import { Box, Typography, IconButton } from '@mui/material'
import { PlayArrow, Pause } from '@mui/icons-material'
import playingGif from '../../public/assets/playing.gif'
import { useSelector } from 'react-redux'
import { addSong, removeSong, getSongById } from "../store/actions/likedSongs.actions.js";

export function SongList() {
    const currentStation = useSelector(state => state.stationModule.station);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [playingIndex, setPlayingIndex] = useState(null);
    const [currStation, setCurrStation] = useState(currentStation);
    const [songs, setSongs] = useState(currentStation.songs);

    useEffect(() => {
        setSongs(currentStation.songs);
        setCurrStation(currentStation);
    }, [currentStation._id]);

    useEffect(() => {
        setSongs(currStation.songs);
    }, [currStation.songs]);

    function handlePlayClick(songId, index) {
        loadSong(songId);
        setIsPlaying(true);
        setActiveIndex(index);
        setPlayingIndex(index);
    }

    function handlePauseClick() {
        setIsPlaying(false);
        setPlayingIndex(null);
    }

    async function toggleLike(song) {
        const stationName = currentStation.name;
        try {
            const existingSong = await getSongById(song);
            if (existingSong) {
                await removeSong(song, stationName);
                currentStation.songs = currentStation.songs.filter(s => s.id !== song.id);
            } else {
                await addSong(song, stationName);
                currentStation.songs.push(song);
            }

            await updateStation(currentStation);
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    }

    async function handleDragEnd(result) {
        if (!result.destination) return;
        const reorderedSongs = songs.slice();
        const [movedSong] = reorderedSongs.splice(result.source.index, 1);
        reorderedSongs.splice(result.destination.index, 0, movedSong);
        setSongs(reorderedSongs);
        const updatedStation = { ...currStation, songs: reorderedSongs };
        await updateStation(updatedStation);
        setCurrStation(updatedStation);
    }



    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <section className="song-list" style={{ borderRadius: '8px', marginRight: 40 }}>
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
                            sx={{ paddingLeft: '0.4em', margin: 0, opacity: 0.6, color: 'white' }}
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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                data-encore-id="icon"
                                role="img"
                                aria-hidden="true"
                                viewBox="0 0 16 16"
                                className="duration-icon Svg-sc-ytk21e-0 dYnaPI"
                            >
                                <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                                <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z" />
                            </svg>
                        </Typography>
                    </Box>

                    {/* Song list */}
                    <Droppable droppableId="songs">
                        {provided => {
                            return (
                                <Box
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    sx={{ gridArea: 'songs', marginTop: 0 }}
                                >
                                    <hr style={{ opacity: 0.2 }} />
                                    {currentStation.songs.map((song, idx) => (
                                        <Draggable key={song.id} draggableId={song.id} index={idx}>
                                            {(provided, snapshot) => (
                                                <Box
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="song-item"
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        borderRadius: 1,
                                                        padding: '3px 12px',
                                                        marginTop: '15px',
                                                        marginBottom: 1,
                                                        cursor: 'pointer',
                                                        width: '100%',
                                                        backgroundColor: activeIndex === idx
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
                                                                style={{ width: '14px', height: '14px' }} />
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
                                                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                                                        <Box
                                                            component="img"
                                                            src={song.imgURL}
                                                            alt={`${song.title} cover`}
                                                            sx={{
                                                                width: 40,
                                                                height: 40,
                                                                borderRadius: 1,
                                                                objectFit: 'cover',
                                                            }} />
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                marginLeft: '20px',
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

                                                    {/* Album, Like Button, and Duration columns */}
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
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
                                                                cursor: 'pointer',
                                                                '&:hover': {
                                                                    textDecoration: 'underline',
                                                                },
                                                            }}
                                                            title={` ${song.album}`}
                                                        >
                                                            {song.album}
                                                        </Typography>
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '10px', 
                                                            }}
                                                        >
                                                            <button
                                                                onClick={() => toggleLike(song)}
                                                                title={song.liked ? 'Remove from liked songs' : 'Add to liked songs'}
                                                                className="liked-songs-btn"
                                                            >
                                                                {song.liked ? (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" viewBox="0 0 16 16" className="liked-icon">
                                                                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z" />
                                                                    </svg>
                                                                ) : (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" viewBox="0 0 24 24" className="not-liked-icon">
                                                                        <path d="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z" />
                                                                        <path d="M17.999 12a1 1 0 0 1-1 1h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0v4h4a1 1 0 0 1 1 1z" />
                                                                    </svg>
                                                                )}
                                                            </button>
                                                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                                                {song.duration}
                                                            </Typography>
                                                        </Box>
                                                    </Box>

                                                </Box>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </Box>
                            )
                        }}
                    </Droppable>
                </Box>
            </section>
        </DragDropContext>
    )
}
