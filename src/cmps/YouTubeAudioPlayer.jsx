import React, { useState, useEffect, useRef } from 'react'
import YouTube from 'react-youtube'
import { useSelector } from 'react-redux'
import { setIsPlaying } from '../store/actions/station.actions'

export function YouTubeAudioPlayer({}) {
    const [songID, setSongID] = useState(null)
    const currentSong = useSelector(state => state.stationModule.currentSong)
    const isPlaying = useSelector(state => state.stationModule.isPlaying)
    const [isReady, setIsReady] = useState(false)
    const playerRef = useRef(null)
    const volume = useSelector(state => state.stationModule.volume)

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

    function onPlayerReady(event) {
        playerRef.current = event.target
        setIsReady(true)
        if (isPlaying) {
            event.target.playVideo()
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
            />
            <button onClick={playAudio}>play</button>
            <button onClick={pauseAudio}>pause</button>
        </div>
    )
}
