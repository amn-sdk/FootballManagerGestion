"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Euro, Package, FileText } from "lucide-react"
import { FinanceDashboard } from "@/features/finance/components/finance-dashboard"

export default function PresidentDashboardPage() {
    // Mock club ID for now, in real app would come from auth context
    const clubId = "club-123"

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Espace Président</h1>
                <div className="flex gap-2">
                    <Button asChild variant="outline">
                        <Link href="/dashboard/president/finance">
                            <Euro className="mr-2 h-4 w-4" />
                            Finance
                        </Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/dashboard/president/licenses">
                            <FileText className="mr-2 h-4 w-4" />
                            Licences
                        </Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/dashboard/president/inventory">
                            <Package className="mr-2 h-4 w-4" />
                            Matériel
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Licences à valider</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">
                            +2 depuis hier
                        </p>
                    </CardContent>
                </Card>
                {/* Add more summary cards here */}
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Aperçu Financier</h2>
                <FinanceDashboard clubId={clubId} />
            </div>
        </div>
    )
}
