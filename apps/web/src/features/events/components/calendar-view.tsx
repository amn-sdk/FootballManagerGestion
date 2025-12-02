"use client"

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from 'react'

const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

interface Event {
    id: string
    title: string
    start: Date
    end: Date
    type: 'TRAINING' | 'MATCH'
}

export function CalendarView() {
    const [events, setEvents] = useState<Event[]>([
        {
            id: '1',
            title: 'Training',
            start: new Date(2025, 11, 4, 18, 0), // Dec 4, 2025 18:00
            end: new Date(2025, 11, 4, 20, 0),
            type: 'TRAINING'
        },
        {
            id: '2',
            title: 'Match vs PSG',
            start: new Date(2025, 11, 7, 15, 0), // Dec 7, 2025 15:00
            end: new Date(2025, 11, 7, 17, 0),
            type: 'MATCH'
        }
    ])

    return (
        <div className="h-[600px] bg-white p-4 rounded-md border">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                views={['month', 'week', 'day']}
                defaultView='month'
            />
        </div>
    )
}
