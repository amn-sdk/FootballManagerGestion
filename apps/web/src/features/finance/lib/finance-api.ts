import { api } from '@/lib/api'

export interface PaymentProduct {
    id: string
    club_id: string
    name: string
    description?: string
    amount_cents: number
    currency: string
    is_active: boolean
}

export interface PlayerPaymentAssignment {
    id: string
    player_id: string
    product_id: string
    total_amount_cents: number
    due_date?: string
    created_at: string
}

export interface Payment {
    id: string
    assignment_id: string
    amount_cents: number
    payment_date: string
    method: 'CASH' | 'CARD' | 'BANK_TRANSFER' | 'OTHER'
    note?: string
}

export interface FinanceDashboardStats {
    total_expected_cents: number
    total_collected_cents: number
    total_due_cents: number
}

export const financeApi = {
    getProducts: async (clubId: string) => {
        const response = await api.get<PaymentProduct[]>(`/finance/products/club/${clubId}`)
        return response.data
    },

    createProduct: async (data: Partial<PaymentProduct>) => {
        const response = await api.post<PaymentProduct>('/finance/products', data)
        return response.data
    },

    getAssignments: async (clubId: string) => {
        const response = await api.get<PlayerPaymentAssignment[]>(`/finance/assignments/club/${clubId}`)
        return response.data
    },

    assignPayment: async (data: Partial<PlayerPaymentAssignment>) => {
        const response = await api.post<PlayerPaymentAssignment>('/finance/assignments', data)
        return response.data
    },

    createPayment: async (data: Partial<Payment>) => {
        const response = await api.post<Payment>('/finance/payments', data)
        return response.data
    },

    getDashboardStats: async (clubId: string) => {
        const response = await api.get<FinanceDashboardStats>(`/finance/dashboard/${clubId}`)
        return response.data
    }
}
