"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { aiApi, LineupSuggestion } from "../lib/ai-api"
import { Sparkles, Loader2 } from "lucide-react"

export function SmartLineup() {
    const [loading, setLoading] = useState(false)
    const [suggestion, setSuggestion] = useState<LineupSuggestion | null>(null)

    const handleSuggest = async () => {
        setLoading(true)
        try {
            const result = await aiApi.suggestLineup()
            setSuggestion(result)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Suggestion de Compo</CardTitle>
                <Sparkles className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
                {!suggestion ? (
                    <div className="flex flex-col items-center justify-center py-6 space-y-4">
                        <p className="text-sm text-muted-foreground text-center">
                            Laissez l'IA analyser la forme et les stats pour proposer le meilleur 11.
                        </p>
                        <Button onClick={handleSuggest} disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Générer la compo
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            {suggestion.starters.map((p) => (
                                <div key={p.player_id} className="flex items-center justify-between p-2 bg-secondary rounded-md text-xs">
                                    <span className="font-medium">{p.player_name}</span>
                                    <span className="text-muted-foreground">{p.position}</span>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" onClick={() => setSuggestion(null)} className="w-full">
                            Réinitialiser
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
