import { stationLocalService } from './station.service.local'
import { stationRemoteService } from './station.service.remote'

const { DEV, VITE_LOCAL } = import.meta.env
const service = VITE_LOCAL === 'true' ? stationLocalService : stationRemoteService

export const stationService = service

// Expose stationService for easy debugging in development
if (DEV) window.stationService = stationService
