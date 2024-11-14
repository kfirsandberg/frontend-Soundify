import React, { useState, useEffect, useRef } from 'react'
import YouTube from 'react-youtube'
import { useSelector } from 'react-redux'
import { setIsPlaying, updateSongDuration } from '../store/actions/station.actions'

export function YouTubeAudioPlayer({}) {
    const [songID, setSongID] = useState(null)
    const [isReady, setIsReady] = useState(false)

    const currentSong = useSelector(state => state.stationModule.currentSong)
    const isPlaying = useSelector(state => state.stationModule.isPlaying)
    const volume = useSelector(state => state.stationModule.volume)
    const currentTime = useSelector(state => state.stationModule.currentTime) || 0

    const playerRef = useRef(null)
    const lastSeekTimeRef = useRef(0)

    useEffect(() => {
        if (currentSong) {
            // setIsPlaying(false)
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
        if (isReady && playerRef.current) {
            const lastSeekTime = lastSeekTimeRef.current
            const timeDifference = Math.abs(currentTime - lastSeekTime)

            if (timeDifference > 60) {
                console.log(timeDifference)
                playerRef.current.seekTo(currentTime, true)
                lastSeekTimeRef.current = currentTime
            }
        }
    }, [currentTime, isReady])

    function onPlayerReady(event) {
        playerRef.current = event.target
        setIsReady(true)
        playerRef.current.setVolume(40)

        const duration = event.target.getDuration()

        if (duration) {
            updateSongDuration(duration)
        } else {
            console.error('Failed to get duration from YouTube player')
        }
        // if (isPlaying) {
        //     event.target.playVideo()
        // }
    }

    function onPlayerStateChange(event) {
        if (event.data === YouTube.PlayerState.PLAYING && !isReady) {
            const duration = event.target.getDuration()

            if (duration) {
                updateSongDuration(duration)
            }
            setIsReady(true)
        }
    }

    return (
        <div>
            <YouTube style={{display: 'none'}}
                videoId={songID}
                opts={{
                    height: '0',
                    width: '0',
                    playerVars: {
                        autoplay: 1,
                        controls: 0,
                        modestbranding: 1,
                        loop: 1,
                    },
                }}
                onReady={onPlayerReady}
                onStateChange={onPlayerStateChange}
            />
        </div>
    )
}
