import React from "react";
import { CalendarEvent } from "./calendarEvent";
import { set } from 'date-fns';
import { useMediaQuery } from "../ui/useMediaQuery";

export const CalendarColumn = ({ events, onEventClick, day }) => {
    const isNarrow = useMediaQuery('(max-width: 600px)');

    const styles = {
        heigth: '100%',
        width: `calc((100% - ${isNarrow ? '1.5rem' : '4.5rem'}) / 7)`,
        position: 'relative',
        borderRight: '1px solid rgb(51, 53, 55)',
        zIndex: 2,
    }

    return (
        <>
        <div style={styles}>
            {events?.map(event => (
                <CalendarEvent onEventClick={()=>onEventClick(event)} key={event.id} {...event} />
            ))}
        </div>
        </>
    )
}