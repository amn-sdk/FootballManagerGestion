"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { InventoryItem } from "../lib/inventory-api"

interface InventoryListProps {
    items: InventoryItem[]
}

export function InventoryList({ items }: InventoryListProps) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Quantité Totale</TableHead>
                        <TableHead>Unité</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.description || "-"}</TableCell>
                            <TableCell>{item.total_quantity}</TableCell>
                            <TableCell>{item.unit}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
