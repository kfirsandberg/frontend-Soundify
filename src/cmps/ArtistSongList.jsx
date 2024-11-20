import React, { useState, useEffect, useRef } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { loadSong, setIsPlaying, updateStation, getArtist, addSong, removeSong } from '../store/actions/station.actions.js'
import { Box, Typography, IconButton } from '@mui/material'
import { PlayArrow, Pause } from '@mui/icons-material'
import playingGif from '../../public/assets/playing.gif'
import { stationService } from '../services/station'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import {setBgColor } from '../store/actions/station.actions.js'

import { FastAverageColor } from 'fast-average-color'

const fac = new FastAverageColor()


export function ArtistSongList({ }) {
    const station = useSelector(storeState => storeState.stationModule.currentStation)
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const dispatch = useDispatch()

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [playingIndex, setPlayingIndex] = useState(null);
    const [currStation, setCurrStation] = useState(station);
    const [songs, setSongs] = useState(station.tracks);
    const [contextMenu, setContextMenu] = useState(null)
    const [currentSong, setCurrentSong] = useState(null);

    const artist = useSelector(storeState => storeState.stationModule.currentArtist)
    // console.log(artist);


    const contextMenuRef = useRef(null)

    const navigate = useNavigate()



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


    useEffect(() => {
        setBgColorDetails(artist)
        
        
    }, [artist])

    async function setBgColorDetails(artist) {
        // console.log(artist);
        if (artist && artist.images[0]?.url) {
            try {
                const color = await fac.getColorAsync(artist.images[0]?.url)
                // console.log(color);
                
                setBgColor(artist, color.rgb)
            } catch (error) {
                
            }
        }
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

        const artistId = song.track.artists[0].id
        await getArtist(artistId)
        // console.log(artist);


        navigate(`/artist/${artistId}`)
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
                            gridTemplateColumns: 'auto  0.0100fr',
                            gridGap: 1,

                            '@media (max-width: 768px)': {
                                gridTemplateColumns: 'auto 7fr  0.2fr',
        
                                textAlign: 'center',
                            },
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{ paddingRight: '1em', color: 'white' , fontSize:25, fontFamily: '"SpotifyMix", sans-serif'}}
                        >
                            Popular
                        </Typography>
                
                    </Box>

                    {/* Song list */}
                    <Droppable droppableId="songs">
                        {(provided) => {
                            return (
                                <Box
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    sx={{ gridArea: 'songs', marginTop: 0 }}
                                >
                                    <hr style={{ opacity: 0.1 }} />
                                    {artist?.tracks?.map((track, idx) => (
                                        <Draggable key={track.id} draggableId={track.id} index={idx}>
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
                                                                title="Pause"
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
                                                                onClick={() => handlePlayClick(track, idx)}
                                                                sx={{
                                                                    marginLeft: 4,
                                                                    width: '14px',
                                                                    height: '14px',
                                                                    color: 'white',
                                                                    
                                                                }}
                                                                title={`Play ${track.name}`}
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
                                                            src={track.album?.images[0]?.url }
                                                            alt={`${track.name} cover`}
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
                                                                    fontFamily: '"SpotifyMix", sans-serif'
                                                                }}
                                                                title={track.name}
                                                            >
                                                                {track.name}
                                                            </Typography>
                                                        </Box>
                                                    </Box>

                                                    {/* Duration */}
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'end',
                                                            justifyContent: 'flex-end',
                                                            marginLeft: 'auto',
                                                            width: '50%',
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                color: 'rgba(255, 255, 255, 0.6)',
                                                             
                                                            }}
                                                        >
                                                            {stationService.formatSongDuration(track.duration_ms) || "0:00"}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </Box>
                            );
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
