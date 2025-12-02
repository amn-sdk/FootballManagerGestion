import { CalendarView } from "@/features/events/components/calendar-view"
import { Button } from "@/components/ui/button"

export default function CalendarPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
                    <p className="text-muted-foreground">Schedule trainings and matches.</p>
                </div>
                <Button>New Event</Button>
            </div>
            <CalendarView />
        </div>
    )
}
