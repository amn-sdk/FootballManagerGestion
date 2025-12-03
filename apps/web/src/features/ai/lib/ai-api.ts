import { api } from '@/lib/api'

export interface PlayerRecommendation {
    player_id: string
    player_name: string
    position: string
    score: number
    reason: string
}

export interface LineupSuggestion {
    formation: string
    starters: PlayerRecommendation[]
    substitutes: PlayerRecommendation[]
}

export interface RiskAssessment {
    player_id: string
    player_name: string
    risk_score: number
    risk_level: 'LOW' | 'MEDIUM' | 'HIGH'
    factors: string[]
}

export interface ChatResponse {
    reply: string
    actions: string[]
}

export const aiApi = {
    suggestLineup: async (formation: string = "4-3-3") => {
        const response = await api.post<LineupSuggestion>('/ai/suggest-lineup', { formation })
        return response.data
    },

    getRiskAssessment: async (teamId: string) => {
        const response = await api.get<RiskAssessment[]>(`/ai/risk-assessment/${teamId}`)
        return response.data
    },

    chat: async (message: string, context?: string) => {
        const response = await api.post<ChatResponse>('/ai/copilot/chat', { message, context })
        return response.data
    }
}
