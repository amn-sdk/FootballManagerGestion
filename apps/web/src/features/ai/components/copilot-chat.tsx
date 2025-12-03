"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { aiApi } from "../lib/ai-api"
import { Bot, Send } from "lucide-react"

export function CopilotChat() {
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
        { role: 'bot', text: "Bonjour Coach ! Je suis votre assistant. Une question sur l'effectif ?" }
    ])
    const [loading, setLoading] = useState(false)

    const handleSend = async () => {
        if (!input.trim()) return

        const userMsg = input
        setInput("")
        setMessages(prev => [...prev, { role: 'user', text: userMsg }])
        setLoading(true)

        try {
            const response = await aiApi.chat(userMsg)
            setMessages(prev => [...prev, { role: 'bot', text: response.reply }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="h-[400px] flex flex-col">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2 border-b">
                <Bot className="mr-2 h-4 w-4 text-blue-500" />
                <CardTitle className="text-sm font-medium">Coach Copilot</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${msg.role === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-muted rounded-lg px-3 py-2 text-sm text-muted-foreground">
                                ...
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-3 border-t flex gap-2">
                    <Input
                        placeholder="Posez une question..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                    />
                    <Button size="icon" onClick={handleSend} disabled={loading}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
