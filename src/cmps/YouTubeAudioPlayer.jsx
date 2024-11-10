import React, { useState, useEffect, useRef } from 'react'
import YouTube from 'react-youtube'
import { useSelector } from 'react-redux'
import { setIsPlaying } from '../store/actions/station.actions'

export function YouTubeAudioPlayer({}) {
    const [play, setPlay] = useState(null)
    const [songID, setSongID] = useState(null)
    const currentSong = useSelector(state => state.stationModule.currentSong)
    const isPlaying = useSelector(state => state.stationModule.isPlaying)
    const [isReady, setIsReady] = useState(false)
    const playerRef = useRef(null)

    useEffect(() => {
        if (currentSong) {
            setIsPlaying(false)
            setSongID(currentSong.videoId)
            setIsPlaying(true)
        }
    }, [currentSong])

    useEffect(() => {
        console.log('isPlaying updated:', isPlaying)
    }, [isPlaying])

    useEffect(() => {
        if (isReady && play) {
            if (isPlaying) {
                playerRef.current.playVideo().playVideo()
            } else {
                playerRef.current.pauseVideo().pauseVideo()
            }
        }
    }, [isPlaying, isReady, play, songID])

    function onPlayerReady(event) {
        playerRef.current = event.target
        setIsReady(true)
        if (isPlaying) {
            event.target.playVideo()
        }
    }
    function playAudio() {
        // if (play) play.playVideo()
        setIsPlaying(true)
    }

    function pauseAudio() {
        // if (play) play.pauseVideo()
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
