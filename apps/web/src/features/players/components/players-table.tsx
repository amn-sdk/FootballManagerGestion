"use client"

import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"

interface Player {
    id: string
    first_name: string
    last_name: string
    position_main: string
    shirt_number: number
}

export function PlayersTable() {
    const [players, setPlayers] = useState<Player[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // TODO: Get team ID dynamically
        const teamId = "TODO_TEAM_ID"
        // For MVP demo, we might need to fetch user's team first or mock it
        // api.get(\`/players/team/\${teamId}\`).then(...)
        setLoading(false)
        // Mock data for now until we have full auth flow with team context
        setPlayers([
            { id: "1", first_name: "Kylian", last_name: "Mbappé", position_main: "FW", shirt_number: 9 },
            { id: "2", first_name: "Zinedine", last_name: "Zidane", position_main: "MF", shirt_number: 10 },
        ])
    }, [])

    if (loading) return <div>Loading...</div>

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No.</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {players.map((player) => (
                        <TableRow key={player.id}>
                            <TableCell>{player.shirt_number}</TableCell>
                            <TableCell className="font-medium">
                                {player.first_name} {player.last_name}
                            </TableCell>
                            <TableCell>{player.position_main}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm">Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
