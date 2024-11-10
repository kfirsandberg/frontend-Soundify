import React, { useState, useEffect, useRef } from 'react'
import YouTube from 'react-youtube'
import { useSelector } from 'react-redux'
import { setIsPlaying, updateSongDuration } from '../store/actions/station.actions'
export function YouTubeAudioPlayer({}) {
    const [songID, setSongID] = useState(null)
    const currentSong = useSelector(state => state.stationModule.currentSong)
    const isPlaying = useSelector(state => state.stationModule.isPlaying)
    const [isReady, setIsReady] = useState(false)
    const playerRef = useRef(null)
    const volume = useSelector(state => state.stationModule.volume)
    const currentTime = useSelector(state => state.stationModule.currentTime) || 0
    useEffect(() => {
        if (currentSong) {
            setIsPlaying(false)
            setSongID(currentSong.videoId)
            setIsPlaying(true)
        }
    }, [currentSong])
    useEffect(() => {
        if (isReady) {
            playerRef.current.setVolume(volume)
            if (isPlaying) {
                playerRef.current.playVideo()
            } else {
                playerRef.current.pauseVideo()
            }
        }
    }, [isPlaying, isReady, songID, volume])
    useEffect(() => {
        console.log('currentTime:', currentTime)
        if (isReady && playerRef.current) {
            playerRef.current.seekTo(currentTime, true)
        }
    }, [currentTime, isReady])
    function onPlayerReady(event) {
        console.log('Player is ready')
        playerRef.current = event.target
        setIsReady(true)
        const duration = event.target.getDuration()
        console.log('Duration:', duration)
        if (duration) {
            updateSongDuration(duration)
        } else {
            console.error('Failed to get duration from YouTube player')
        }
        if (isPlaying) {
            event.target.playVideo()
        }
    }
    function onPlayerStateChange(event) {
        if (event.data === YouTube.PlayerState.PLAYING && !isReady) {
            const duration = event.target.getDuration()
            console.log('Duration after playing starts:', duration)
            if (duration) {
                updateSongDuration(duration)
            }
            setIsReady(true)
        }
    }
    function playAudio() {
        if (playerRef.current) playerRef.current.playVideo()
        setIsPlaying(true)
    }
    function pauseAudio() {
        if (playerRef.current) playerRef.current.pauseVideo()
        setIsPlaying(false)
    }
    return (
        <div>
            <YouTube
                videoId={songID}
                opts={{
                    height: '0',
                    width: '0',
                    playerVars: {
                        autoplay: 0,
                        controls: 0,
                        modestbranding: 1,
                        loop: 1,
                    },
                }}
                onReady={onPlayerReady}
                onStateChange={onPlayerStateChange}
            />
            <button onClick={playAudio}>play</button>
            <button onClick={pauseAudio}>pause</button>
        </div>
    )
}