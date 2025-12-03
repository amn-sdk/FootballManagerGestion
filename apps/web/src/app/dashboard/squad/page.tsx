import { PlayersTable } from "@/features/players/components/players-table"
import { Button } from "@/components/ui/button"
import { SmartLineup } from "@/features/ai/components/smart-lineup"
import { RiskDashboard } from "@/features/ai/components/risk-dashboard"
import { CopilotChat } from "@/features/ai/components/copilot-chat"

export default function SquadPage() {
    const teamId = "team-123" // Mock ID

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Effectif & Stratégie</h2>
                    <p className="text-muted-foreground">Gérez votre équipe et optimisez vos performances avec l'IA.</p>
                </div>
                <Button>Ajouter un joueur</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 space-y-4">
                    <PlayersTable />
                </div>
                <div className="col-span-3 space-y-4">
                    <SmartLineup />
                    <RiskDashboard teamId={teamId} />
                    <CopilotChat />
                </div>
            </div>
        </div>
    )
}
