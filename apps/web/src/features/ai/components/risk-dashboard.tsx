"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { aiApi, RiskAssessment } from "../lib/ai-api"
import { Activity } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function RiskDashboard({ teamId }: { teamId: string }) {
    const [assessments, setAssessments] = useState<RiskAssessment[]>([])

    useEffect(() => {
        aiApi.getRiskAssessment(teamId).then(setAssessments)
    }, [teamId])

    const highRisk = assessments.filter(a => a.risk_level === 'HIGH')

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risque Blessure</CardTitle>
                <Activity className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {highRisk.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Aucun joueur en zone rouge.</p>
                    ) : (
                        highRisk.map(player => (
                            <div key={player.player_id} className="flex items-center justify-between">
                                <span className="text-sm font-medium">{player.player_name}</span>
                                <Badge variant="destructive">{player.risk_score.toFixed(0)}%</Badge>
                            </div>
                        ))
                    )}
                    <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground">
                            Basé sur la charge (RPE x Minutes) des 7 derniers jours.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
