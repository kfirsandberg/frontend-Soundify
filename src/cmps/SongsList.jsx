import { useState } from 'react';


export function SongList({ station }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  function handlePlayClick(songId){
    console.log(songId);
    

  }
  return (
    <section>
      <ul>
        {station.songs.map((song, idx) => (
          <li
            key={song.id}
            className="song-item"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <button className="song-index"
             onClick={() => handlePlayClick(song.id)} >
              {hoveredIndex === idx ? (
                <span className="play-icon">▶</span>
              ) : (
                <span>{idx + 1}</span>
              )}
            </button>
            <img src={song.imgURL} alt={`${song.title} cover`} className="song-image" />
            <div className="song-details">
              <span className="song-title">{song.title}</span>
              <a href={song.URL} target="_blank" rel="noopener noreferrer" className="play-link">Play</a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}