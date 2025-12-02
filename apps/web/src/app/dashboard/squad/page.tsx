import { PlayersTable } from "@/features/players/components/players-table"
import { Button } from "@/components/ui/button"

export default function SquadPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Squad</h2>
                    <p className="text-muted-foreground">Manage your team roster.</p>
                </div>
                <Button>Add Player</Button>
            </div>
            <PlayersTable />
        </div>
    )
}
