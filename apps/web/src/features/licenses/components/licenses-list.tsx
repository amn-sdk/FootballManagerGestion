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
import { License } from "../lib/licenses-api"

interface LicensesListProps {
    licenses: License[]
}

export function LicensesList({ licenses }: LicensesListProps) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Saison</TableHead>
                        <TableHead>Numéro</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Commentaire</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {licenses.map((license) => (
                        <TableRow key={license.id}>
                            <TableCell>{license.season}</TableCell>
                            <TableCell>{license.license_number || "-"}</TableCell>
                            <TableCell>
                                <Badge variant={
                                    license.status === "VALIDATED" ? "default" :
                                        license.status === "REJECTED" ? "destructive" : "secondary"
                                }>
                                    {license.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{license.comment || "-"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
