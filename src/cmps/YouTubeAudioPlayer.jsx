import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { useSelector } from 'react-redux';

export function YouTubeAudioPlayer({ }) {
    const [play, setPlay] = useState(null)
    const [songID, setSongID] = useState(null)
    const currentSong = useSelector(state => state.stationModule.currentSong)
    const isPlaying = useSelector(state => state.stationModule.isPlaying)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        console.log("play", play)
        if (currentSong) {
            setSongID(currentSong.videoId)
        }
        if (isPlaying && play.videoTitle) {
            console.log(isPlaying);
            playAudio()
        }
        if (!isPlaying) {
            pauseAudio()
        }
    }, [currentSong, isPlaying, play]);

    useEffect(()=>{
        if(isReady && isPlaying){
            playAudio()
        }
    },[isReady])

    function onPlayerReady(event) {
        setIsReady(true)
        setPlay(event.target);
    }
    function playAudio() {
        if (play) play.playVideo();
    }

    function pauseAudio() {
        if (play) play.pauseVideo();
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
            
        </div>

    );
}
