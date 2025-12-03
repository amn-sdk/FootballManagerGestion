"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { useEffect, useState } from "react"
import { financeApi, FinanceDashboardStats } from "../lib/finance-api"
import { Euro, TrendingUp, AlertCircle } from "lucide-react"

export function FinanceDashboard({ clubId }: { clubId: string }) {
    const [stats, setStats] = useState<FinanceDashboardStats | null>(null)

    useEffect(() => {
        financeApi.getDashboardStats(clubId).then(setStats)
    }, [clubId])

    if (!stats) return <div>Loading stats...</div>

    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Attendu</CardTitle>
                    <Euro className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(stats.total_expected_cents)}</div>
                    <p className="text-xs text-muted-foreground">
                        Sur la saison en cours
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Encaissé</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.total_collected_cents)}</div>
                    <p className="text-xs text-muted-foreground">
                        +12% par rapport au mois dernier
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Reste à percevoir</CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-600">{formatCurrency(stats.total_due_cents)}</div>
                    <p className="text-xs text-muted-foreground">
                        Dont 3 retards majeurs
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
