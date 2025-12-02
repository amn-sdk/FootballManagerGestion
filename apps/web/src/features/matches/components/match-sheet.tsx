"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Player {
    id: string
    name: string
    position: string
}

export function MatchSheet() {
    const [homeScore, setHomeScore] = useState(0)
    const [awayScore, setAwayScore] = useState(0)

    // Mock lineup
    const starters: Player[] = [
        { id: '1', name: 'Kylian Mbappé', position: 'FW' },
        { id: '2', name: 'Zinedine Zidane', position: 'MF' },
    ]

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Score</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center space-x-4 text-4xl font-bold">
                        <div className="flex flex-col items-center space-y-2">
                            <span className="text-sm font-normal text-muted-foreground">Us</span>
                            <Input
                                type="number"
                                className="w-20 text-center text-2xl"
                                value={homeScore}
                                onChange={(e) => setHomeScore(parseInt(e.target.value))}
                            />
                        </div>
                        <span>-</span>
                        <div className="flex flex-col items-center space-y-2">
                            <span className="text-sm font-normal text-muted-foreground">Opponent</span>
                            <Input
                                type="number"
                                className="w-20 text-center text-2xl"
                                value={awayScore}
                                onChange={(e) => setAwayScore(parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <Button>Update Score</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Starting XI</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {starters.map((player) => (
                            <div key={player.id} className="flex items-center justify-between p-2 border rounded-md">
                                <span className="font-medium">{player.name}</span>
                                <span className="text-sm text-muted-foreground">{player.position}</span>
                            </div>
                        ))}
                        <Button variant="outline" className="w-full mt-2">+ Add Player</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
