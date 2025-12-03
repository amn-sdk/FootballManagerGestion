"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"

export default function RegisterPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        club_name: "",
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async () => {
        setLoading(true)
        setError("")
        try {
            const res = await api.post("/auth/register", formData)
            // Store token
            localStorage.setItem("token", res.data.access_token)
            // Redirect
            router.push("/dashboard")
        } catch (err: any) {
            console.error(err)
            setError(err.response?.data?.detail || "Une erreur est survenue")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Créer un compte Club</CardTitle>
                    <CardDescription>Gérez votre équipe comme un pro.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                            {error}
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first_name">Prénom</Label>
                            <Input id="first_name" value={formData.first_name} onChange={handleChange} placeholder="Zinedine" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last_name">Nom</Label>
                            <Input id="last_name" value={formData.last_name} onChange={handleChange} placeholder="Zidane" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="club_name">Nom du Club</Label>
                        <Input id="club_name" value={formData.club_name} onChange={handleChange} placeholder="Real Madrid" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="m@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <Button className="w-full" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Création..." : "Créer le compte"}
                    </Button>
                    <div className="text-sm text-center text-muted-foreground">
                        Déjà un compte ? <Link href="/login" className="underline">Se connecter</Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
