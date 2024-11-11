import { useState } from 'react';
import { loadSong, setIsPlaying } from '../store/actions/station.actions.js';

export function SongList({ station }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  function handlePlayClick(songId) {
    loadSong(songId);
    setIsPlaying(true);
  }

  return (
    <section className="contentSpacing">
      <div className="songs-nav">
        <section className='song-nav-header'>
          <span className='song-count'>#</span>
        </section>
        <section className="song-nav-header">
          <span className='song-title'>Title</span>
        </section>
        <section className="song-nav-duration">
          <span className='song-duration'>Duration</span>
        </section>
      </div>


      <ul className="song-list">
        <hr />
        {station.songs.map((song, idx) => (
          <li
            key={song.id}
            className="song-item"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <section className='song-idx'>
              {hoveredIndex === idx ? (
                <span className="play-icon song-num" onClick={() => handlePlayClick(song.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    data-encore-id="icon"
                    role="img"
                    aria-hidden="true"
                    className="Svg-sc-ytk21e-0 bneLcE zOsKPnD_9x3KJqQCSmAq"
                    viewBox="0 0 24 24"
                    width="24" height="24">
                    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
                      style={{ fill: 'white' }} />
                  </svg>
                </span>
              ) : (
                <span className="song-index song-num">{idx + 1}</span>
              )}
            </section>
              
            <section className='details'>
              <img src={song.imgURL} alt={`${song.title} cover`} className="song-image" />
              <p className="song-title ">{song.title}</p>
              <span className="song-artist">{song.artist}</span>
              <span className='add-btn'>
                <svg xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  width="24" height="24">
                  <path d="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z" />
                  <path d="M17.999 12a1 1 0 0 1-1 1h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0v4h4a1 1 0 0 1 1 1z" />
                </svg>
              </span>
            </section>
{/* 
            <section className='duration'>
                <span className="song-album">{song.album}</span>
                <span className="song-duration">{song.duration}</span>
           
            </section> */}


          </li>
        ))}
      </ul>
    </section>
  );
}
