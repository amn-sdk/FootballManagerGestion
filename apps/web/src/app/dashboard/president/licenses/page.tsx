"use client"

import { Button } from "@/components/ui/button"
import { LicensesList } from "@/features/licenses/components/licenses-list"
import { Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { licensesApi, License } from "@/features/licenses/lib/licenses-api"

export default function LicensesPage() {
    // In real app, fetch all licenses for club players
    // For now, we'll just mock fetching for a specific player or list empty
    const [licenses, setLicenses] = useState<License[]>([])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Gestion des Licences</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter une licence
                </Button>
            </div>

            <div className="space-y-4">
                <LicensesList licenses={licenses} />
            </div>
        </div>
    )
}
