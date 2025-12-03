"use client"

import { Button } from "@/components/ui/button"
import { PlayerPaymentsTable } from "@/features/finance/components/player-payments-table"
import { FinanceDashboard } from "@/features/finance/components/finance-dashboard"
import { Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { financeApi, PlayerPaymentAssignment } from "@/features/finance/lib/finance-api"

export default function FinancePage() {
    const clubId = "club-123"
    const [assignments, setAssignments] = useState<PlayerPaymentAssignment[]>([])

    useEffect(() => {
        financeApi.getAssignments(clubId).then(setAssignments)
    }, [clubId])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Gestion Financière</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nouveau Paiement
                </Button>
            </div>

            <FinanceDashboard clubId={clubId} />

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Suivi des paiements joueurs</h2>
                <PlayerPaymentsTable assignments={assignments} />
            </div>
        </div>
    )
}
