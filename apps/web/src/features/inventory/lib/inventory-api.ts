import { api } from '@/lib/api'

export interface InventoryItem {
    id: string
    club_id: string
    name: string
    description?: string
    total_quantity: number
    unit: string
    created_at: string
}

export interface InventoryMovement {
    id: string
    inventory_item_id: string
    team_id?: string
    type: 'ADD' | 'REMOVE' | 'LOSS' | 'BROKEN'
    quantity: number
    reason?: string
    created_at: string
}

export const inventoryApi = {
    getItems: async (clubId: string) => {
        const response = await api.get<InventoryItem[]>(`/inventory/items/club/${clubId}`)
        return response.data
    },

    createItem: async (data: Partial<InventoryItem>) => {
        const response = await api.post<InventoryItem>('/inventory/items', data)
        return response.data
    },

    createMovement: async (data: Partial<InventoryMovement>) => {
        const response = await api.post<InventoryMovement>('/inventory/movements', data)
        return response.data
    }
}
