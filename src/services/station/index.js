import { stationLocalService } from './station.service.local'
import { stationServiceRemote } from './station.service.remote'

const { DEV, VITE_LOCAL } = import.meta.env
const service = VITE_LOCAL === 'true' ? stationLocalService : stationServiceRemote

function calculateTotalDuration(songs) {
    let totalSeconds = 0
    if (!songs) return 

    songs.forEach(song => {
        if (song.track && song.track.duration_ms) {
            totalSeconds += Math.floor(song.track.duration_ms / 1000)
        }
    })

    const days = Math.floor(totalSeconds / (24 * 3600))
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const result = []
    if (days > 0) result.push(`${days} day${days > 1 ? 's' : ''}`)
    if (hours > 0) result.push(`${hours} hour${hours > 1 ? 's' : ''}`)
    if (minutes > 0) result.push(`${minutes} min`)
    if (seconds > 0) result.push(`${seconds} sec`)
    return result.join(' ')
}


function formatSongDuration(durationMs) {
    const totalSeconds = Math.floor(durationMs / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function isSongOnStation(song,station) {
    
    
    if (!station || !station.tracks) return false 
    
    // return station.tracks.some(s => console.log(s));
    return station.tracks.some(s => s.track.id === song.id);
}


export const stationService = { calculateTotalDuration, formatSongDuration, isSongOnStation,...service }

// Expose stationService for easy debugging in development
if (DEV) window.stationService = stationService


