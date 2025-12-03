"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { PlayerPaymentAssignment } from "../lib/finance-api"

interface PlayerPaymentsTableProps {
    assignments: PlayerPaymentAssignment[]
}

export function PlayerPaymentsTable({ assignments }: PlayerPaymentsTableProps) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Joueur</TableHead>
                        <TableHead>Produit</TableHead>
                        <TableHead>Montant Total</TableHead>
                        <TableHead>Payé</TableHead>
                        <TableHead>Reste</TableHead>
                        <TableHead>Statut</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {assignments.map((assignment) => {
                        // Mock calculation for now, real logic needs joined data
                        const paid = 0
                        const remaining = assignment.total_amount_cents - paid
                        const status = remaining === 0 ? "PAYÉ" : remaining < assignment.total_amount_cents ? "PARTIEL" : "À PAYER"

                        return (
                            <TableRow key={assignment.id}>
                                <TableCell className="font-medium">
                                    {/* Need player name here, API should return it or we fetch separately */}
                                    Joueur #{assignment.player_id.slice(0, 4)}
                                </TableCell>
                                <TableCell>
                                    {/* Need product name here */}
                                    Produit #{assignment.product_id.slice(0, 4)}
                                </TableCell>
                                <TableCell>{formatCurrency(assignment.total_amount_cents)}</TableCell>
                                <TableCell>{formatCurrency(paid)}</TableCell>
                                <TableCell>{formatCurrency(remaining)}</TableCell>
                                <TableCell>
                                    <Badge variant={status === "PAYÉ" ? "default" : status === "PARTIEL" ? "secondary" : "destructive"}>
                                        {status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}
