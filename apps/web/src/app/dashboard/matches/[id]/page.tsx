import { MatchSheet } from "@/features/matches/components/match-sheet"

export default function MatchPage({ params }: { params: { id: string } }) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Match Details</h2>
                <p className="text-muted-foreground">Manage lineup and match events.</p>
            </div>
            <MatchSheet />
        </div>
    )
}
