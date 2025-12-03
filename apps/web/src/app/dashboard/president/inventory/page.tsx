"use client"

import { Button } from "@/components/ui/button"
import { InventoryList } from "@/features/inventory/components/inventory-list"
import { Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { inventoryApi, InventoryItem } from "@/features/inventory/lib/inventory-api"

export default function InventoryPage() {
    const clubId = "club-123"
    const [items, setItems] = useState<InventoryItem[]>([])

    useEffect(() => {
        inventoryApi.getItems(clubId).then(setItems)
    }, [clubId])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Gestion du Matériel</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nouvel Article
                </Button>
            </div>

            <div className="space-y-4">
                <InventoryList items={items} />
            </div>
        </div>
    )
}
