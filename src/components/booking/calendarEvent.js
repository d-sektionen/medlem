import React from "react";
import { format, differenceInMinutes } from 'date-fns';

export const CalendarEvent = ({ start, end, id, color, user, onEventClick }) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startHours = startDate.getHours() + startDate.getMinutes() / 60;
    const length = 100 * differenceInMinutes(endDate, startDate) / (24 * 60) + '%';
    const xOffset = 100 * startHours / 24 + '%';
    const styles = {
        position: 'absolute',
        top: xOffset,
        left: 0,
        height: length,
        width: 'calc(100% - 0.5rem)',
        backgroundColor: color.fill,
        border: `1px solid ${color.border}`,
        cursor: 'pointer',
        padding: '0.25rem',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        overflow: 'hidden',
    }
    return (
        <div className="booking" style={styles} onClick={onEventClick}>
            <p>{format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}</p>
            <p>{user.first_name}</p>
        </div>
    )
}