import { stationLocalService } from './station.service.local'
import { stationServiceRemote } from './station.service.remote'

const { DEV, VITE_LOCAL } = import.meta.env
const service = VITE_LOCAL === 'true' ? stationLocalService : stationServiceRemote

function calculateTotalDuration(songs) {
    let totalSeconds = 0
if(!songs)return 
    songs.forEach(song => {
        if (song.duration) {
            const parts = song.duration.split(':')
            const minutes = parseInt(parts[0], 10)
            const seconds = parseInt(parts[1], 10)
            totalSeconds += minutes * 60 + seconds
        }
    });

    const days = Math.floor(totalSeconds / (24 * 3600))
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const result = [];
    if (days > 0) result.push(`${days} day${days > 1 ? 's' : ''}`)
    if (hours > 0) result.push(`${hours} hour${hours > 1 ? 's' : ''}`)
    if (minutes > 0) result.push(`${minutes} min`)
    if (seconds > 0) result.push(`${seconds} sec`)
    return result.join(' ')
}

export const stationService = {calculateTotalDuration , ...service}

// Expose stationService for easy debugging in development
if (DEV) window.stationService = stationService


