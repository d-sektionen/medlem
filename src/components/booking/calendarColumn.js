import React from "react";
import { CalendarEvent } from "./calendarEvent";

export const CalendarColumn = ({ events, onEventClick }) => {
    const styles = {
        heigth: '100%',
        width: 'calc((100% - 4.5rem) / 7)',
        position: 'relative',
        borderRight: '1px solid rgb(51, 53, 55)',
        zIndex: 2,
    }
    console.log('events in calendarColumn:',events)
    return (
        <div style={styles}>
            {events?.map(event => (
                <CalendarEvent onEventClick={()=>onEventClick(event)} key={event.id} {...event} />
            ))}
        </div>
    )
}