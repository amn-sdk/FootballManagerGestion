import { api } from '@/lib/api'

export type LicenseStatus = 'TO_DO' | 'IN_PROGRESS' | 'VALIDATED' | 'REJECTED'

export interface License {
    id: string
    player_id: string
    season: string
    license_number?: string
    status: LicenseStatus
    comment?: string
    updated_at: string
}

export const licensesApi = {
    createLicense: async (data: Partial<License>) => {
        const response = await api.post<License>('/licenses', data)
        return response.data
    },

    getPlayerLicenses: async (playerId: string) => {
        const response = await api.get<License[]>(`/licenses/player/${playerId}`)
        return response.data
    },

    updateStatus: async (licenseId: string, status: LicenseStatus) => {
        const response = await api.patch<License>(`/licenses/${licenseId}/status`, null, {
            params: { status }
        })
        return response.data
    }
}
