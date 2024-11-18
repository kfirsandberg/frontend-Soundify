import { stationLocalService } from './station.service.local'
import { stationServiceRemote } from './station.service.remote'

const { DEV, VITE_LOCAL } = import.meta.env
const service = VITE_LOCAL === 'true' ? stationLocalService : stationServiceRemote

export const stationService = service
console.log('service:', VITE_LOCAL)

// Expose stationService for easy debugging in development
if (DEV) window.stationService = stationService


