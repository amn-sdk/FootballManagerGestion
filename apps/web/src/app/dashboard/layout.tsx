import { Sidebar } from "@/components/layout/sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <div className="w-full flex-none md:w-64 border-r bg-muted/40">
                <Sidebar />
            </div>
            <div className="flex-1 p-6 md:p-12">
                {children}
            </div>
        </div>
    )
}
