import React from "react";
import { format, differenceInMinutes } from 'date-fns';
import { wrapper, text } from './calendarEvent.module.scss'

export const CalendarEvent = ({ start, end, id, color, user, onEventClick, isDraft, restricted_timeslot }) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startHours = startDate.getHours() + startDate.getMinutes() / 60;
    const length = 100 * differenceInMinutes(endDate, startDate) / (24 * 60) + '%';
    const xOffset = 100 * startHours / 24 + '%';
    const styles = {
        position: 'absolute',
        top: restricted_timeslot ? `calc(${xOffset} - 32px)` : xOffset,
        left: 0,
        height: restricted_timeslot ? `calc(${length} + 32px)` : length,
        width: restricted_timeslot ? 'calc(100% + 2px)' : 'calc(100% - 0.5rem)',
        backgroundColor: restricted_timeslot ? `rgb(${color.fill})` : color.fill,
        border: restricted_timeslot ? `1px solid rgb(${color.border})` : `1px solid ${color.border}`,
        cursor: 'pointer',
        padding: '0.25rem',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        overflow: 'hidden',
        pointerEvents: isDraft ? 'none' : 'auto',
    }
    if (restricted_timeslot) {
        return (
        <div className="wrapper" style={styles} onClick={onEventClick}>
            <p style={{color: '#B77C0D', marginTop: '32px'}}>Begränsad period</p>
        </div>
        )} else {
    return (
        <div className="booking" style={styles} onClick={onEventClick}>
            <p>{format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}</p>
            <p>{user.first_name}</p>
        </div>
    )}
}