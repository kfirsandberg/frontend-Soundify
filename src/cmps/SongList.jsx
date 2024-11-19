import React, { useState, useEffect, useRef } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { loadSong, setIsPlaying, updateStation, getArtist, addSong, removeSong } from '../store/actions/station.actions.js'
import { Box, Typography, IconButton } from '@mui/material'
import { PlayArrow, Pause } from '@mui/icons-material'
import playingGif from '../../public/assets/playing.gif'
import { stationService } from '../services/station'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
export function SongList({ }) {
    const station = useSelector(storeState => storeState.stationModule.currentStation)
    const stations = useSelector(storeState => storeState.stationModule.stations)

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [playingIndex, setPlayingIndex] = useState(null);
    const [currStation, setCurrStation] = useState(station);
    const [songs, setSongs] = useState(station.tracks);
    const [contextMenu, setContextMenu] = useState(null)
    const [currentSong, setCurrentSong] = useState(null);

    const artist = useSelector(storeState => storeState.stationModule.currentArtist)
    console.log(artist);
    

    const contextMenuRef = useRef(null)

    const navigate = useNavigate()


    const menuWidth = contextMenuRef.current?.offsetWidth || 150;
    const menuHeight = contextMenuRef.current?.offsetHeight || 100;

    useEffect(() => {
        setSongs(station.tracks);
        setCurrStation(station);
        if (!contextMenu) return
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };

    }, [station, contextMenu]);

    useEffect(() => {
        setSongs(currStation.tracks);
    }, [currStation.tracks]);


    async function onArtistClick(song) {
        const artistId = song.track.artists[0].id
       
        await getArtist(artistId)

        console.log('res' ,artist)
        
        
        navigate(`/artist/${artistId}`)
    }

    function handlePlayClick(song, index) {
        loadSong(song);
        setIsPlaying(true);
        setActiveIndex(index);
        setPlayingIndex(index);
    }

    function handlePauseClick() {
        setIsPlaying(false);
        setPlayingIndex(null);
    }

    async function toggleLike(ev, song) {
        ev.stopPropagation();

        const menuWidth = 290;
        const menuHeight = 390;

        let x = ev.pageX;
        let y = ev.pageY;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        if (x + menuWidth > screenWidth) {
            x = screenWidth - menuWidth;
        }

        if (y + menuHeight > screenHeight) {
            y = screenHeight - menuHeight;
        }
        setContextMenu({ x, y, song });
        setCurrentSong(song)
    }

    function handleOutsideClick(event) {
        if (!contextMenu || !contextMenuRef.current) return;
        if (!contextMenuRef.current.contains(event.target)) {
            closeContextMenu();
        }
    }

    function closeContextMenu() {
        setContextMenu(null)
    }

    function onStationClick() {
        onLikedSong(currentSong, station)
        closeContextMenu();
    }

    async function onLikedSong(song, station) {
        try {
            const stationIdToRemove = station._id
            const newStations = stations.filter(station => station._id !== stationIdToRemove);
            let songToCheck
            if (song.added_at) {
                songToCheck = song.track
            } else {
                songToCheck = song
            }
            const existingSong = await stationService.isSongOnStation(songToCheck, station);
            if (existingSong) {
                await removeSong(songToCheck, station, newStations);
            } else {
                await addSong(songToCheck, station, newStations);
            }

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
        const updatedStation = { ...currStation, tracks: reorderedSongs };
        await updateStation(updatedStation);
        setCurrStation(updatedStation);
    }
    async function onArtistClick(song) {
<<<<<<< HEAD
        const artistId = song.track.artists[0].id
        await getArtist(artistId)
        console.log(artist);
        navigate(`/artist/${artistId}`)
=======
        try {
            const artistId = song.track.artists[0].id
            await getArtist(artistId)
            console.log(artist);
        } catch (error) {
            console.error('Error toggling like:', error);
        }

        // navigate(`/artist/${artistId}`)
>>>>>>> 71e58f8c1c0004fecf44a7adfe08ccc6b00c13c9
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
                                gridTemplateColumns: 'auto 7fr 7.3fr 0.2fr',
                                gridTemplateRows: '7fr 7.3fr 0.2fr',
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
                            sx={{ opacity: 0.6, color: 'white', '@media (max-width: 768px)': { marginLeft: 0, display: 'none', } }}
                        >
                            Album
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                opacity: 0.6,
                                color: 'white',
                                '@media (max-width: 768px)': {
                                    marginLeft: 25,
                                    marginRight: 1

                                },
                            }}
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
                                    <hr style={{ opacity: 0.1 }} />
                                    {station?.tracks?.map((song, idx) => (
                                        <Draggable key={song.track.id} draggableId={song.track.id} index={idx}>
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
                                                                onClick={() => handlePlayClick(song, idx)}
                                                                sx={{
                                                                    marginLeft: 4,
                                                                    width: '14px',
                                                                    height: '14px',
                                                                    color: 'white',
                                                                }}
                                                                title={`Play ${song.track.name} by ${song.track.artists[0].name}`}
                                                            >
                                                                <PlayArrow />
                                                            </IconButton>
                                                        ) : (
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    marginLeft: 4,
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
                                                            src={song.track.album.images[0].url}
                                                            alt={`${song.track.name} cover`}
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

                                                                }}
                                                                title={` ${song.track.name}`}
                                                            >
                                                                {song.track.name}
                                                            </Typography>
                                                            <Typography
                                                                onClick={() => onArtistClick(song)}
                                                                variant="body2"
                                                                sx={{
                                                                    cursor: 'pointer',
                                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                                    '&:hover': {
                                                                        color: 'white',
                                                                        textDecoration: 'underline',
                                                                    },
                                                                }}
                                                                title={` ${song.track.artists[0].name}`}
                                                            >
                                                                {song.track.artists[0].name}
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
                                                                '@media (max-width: 768px)': {
                                                                    display: 'none',
                                                                },
                                                            }}
                                                        // title={` ${song.album}`}
                                                        >
                                                            {/* {song.album} */}
                                                        </Typography>
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '10px',
                                                            }}
                                                        >
                                                            <button
                                                                onClick={(event) => toggleLike(event, song)}
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
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    color: 'rgba(255, 255, 255, 0.6)',
                                                                    '@media (max-width: 768px)': {
                                                                        marginLeft: 25, // Hides the component under 768px
                                                                        marginRight: 10
                                                                    },
                                                                }}
                                                            >
                                                                {song.track.duration_ms
                                                                    ? stationService.formatSongDuration(song.track.duration_ms)
                                                                    : "0:00"}

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


                {contextMenu && (
                    <ul
                        className="add-stations-menu"
                        ref={contextMenuRef}
                        style={{
                            position: 'absolute',
                            top: `${contextMenu.y}px`,
                            left: `${contextMenu.x}px`,
                            zIndex: 100,
                        }}
                    >
                        <li
                            className='station-add-name' onClick={onStationClick}>
                            Delete
                        </li>
                    </ul>
                )}
            </section>
        </DragDropContext>
    )
}
