import React, { useState } from 'react'
import { useMemo } from 'react'
import { calendarHeader, vertLine, rightOverflow, calendarContainer, calendarContainerContainer, extraLines, gridLines, line, arrowButton, weekButton, column, timeColumn, timeContainer, mediaNarrow, mediaWide } from './bookingCalendar2.module.scss'
import { CalendarColumn } from './calendarColumn'
import { areIntervalsOverlapping, getWeek, eachDayOfInterval, startOfDay, endOfDay, startOfWeek, endOfWeek, addDays, addWeeks } from 'date-fns'
import ViewBooking from './viewBooking'
import useModal from '../modal/useModal'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import {useMediaQuery} from '../ui/useMediaQuery'

const splitMultiDayEvents = (event) => {
    const start = new Date(event.start);
    const end = new Date(event.end);

    // Generate a list of all days within the interval
    const days = eachDayOfInterval({
        start: startOfDay(start),
        end: startOfDay(end),
    });

    // Map each day to a single-day event
    return days.map((day) => {
        const isFirstDay = day.getTime() === startOfDay(start).getTime();
        const isLastDay = day.getTime() === startOfDay(end).getTime();

        return {
            ...event,
            start: isFirstDay ? start : day,
            end: isLastDay ? end : endOfDay(day),
        };
    });
}

// Colors generated for different users
const colors = [
    { fill: '#7C2070', border: '#CB34B7' },
    { fill: '#20407C', border: '#3469CB' },
    { fill: '#207C3F', border: '#34CB66' },
    { fill: '#596885', border: '#8593AD' },
    { fill: '#AF7848', border: '#D2B093' },
]

// Add different color if the booking isn't confirmed
const unconfirmedColor = { fill: '183 124 13 / 20%', border: '183 124 13 / 20%' };

export const BookingCalendar2 = ({ bookings }) => {
    /* Vars and state */
    
    const [openViewBooking] = useModal(ViewBooking)
    const [selectedDateInterval, setSelectedDateInterval] = useState({
        start: startOfWeek(new Date(), { weekStartsOn: 1 }),
        end: endOfWeek(new Date(), { weekStartsOn: 1 })
    });
    const isNarrow = useMediaQuery("(max-width: 600px)")
    console.log('selectedDateInterval:', selectedDateInterval)
    console.log("BOOKINGS", bookings);

    /* Input processing */
    
    // Filter events that are within the current week
    const eventsThisWeek = useMemo(() =>
        bookings?.filter(event =>
            areIntervalsOverlapping(selectedDateInterval, event)
        ),
        [bookings, selectedDateInterval]
    );

    // Split multi-day events into single-day events
    const processedEvents = useMemo(() =>
        eventsThisWeek?.flatMap(event => {
            const eventStart = new Date(event.start);
            const eventEnd = new Date(event.end);
            return startOfDay(eventStart).getTime() === startOfDay(eventEnd).getTime()
                ? [event]
                : splitMultiDayEvents(event);
        }) || [],
        [eventsThisWeek]
    );

    // Add colors and convert dates to Date objects
    const uniqueUsers = [...new Set(processedEvents?.map(event => event.user.id))]

    const getColorForUser = (userId) => {
        const index = uniqueUsers.indexOf(userId) % colors.length
        return colors.at(index)
    }

    // change background if restricted period is set

    const colorizedEvents = processedEvents.map(event => {
        return {
            ...event,
            color: !event.restricted_timeslot ? getColorForUser(event.user.id) : unconfirmedColor,
            start: new Date(event.start),
            end: new Date(event.end),
        }
    }
    );

    // Get the start of the week and weekdays
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(selectedDateInterval.start, i));
    const hoursOfDay = Array.from({ length: 25 }, (_, i) => i);

    // Group events by day
    const eventsByDay = weekDays.map(day => {
        const dayStart = startOfDay(day);
        const dayEnd = endOfDay(day);
        return colorizedEvents.filter(event => {
            const eventStart = new Date(event.start);
            return eventStart >= dayStart && eventStart < dayEnd;
        });
    });
    console.log('eventsByDay:', eventsByDay)
    
    /* Event handlers */

    const handleChangeWeek = (direction) => {
        setSelectedDateInterval({
            start: addWeeks(selectedDateInterval.start, direction),
            end: addWeeks(selectedDateInterval.end, direction),
        });
    }

    const handleEventClick = (booking) => {
        console.log('event/booking:', event)
        openViewBooking('Bokningsinformation', { booking });
    }

    return (
        <>
            <div className={calendarHeader}>
                <button className={arrowButton} onClick={() => handleChangeWeek(-1)}>
                    <FaAngleLeft />
                </button>
                <button className={weekButton} onClick={()=>setSelectedDateInterval({
                    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
                    end: endOfWeek(new Date(), { weekStartsOn: 1 })
                })}>
                    <p>{`Vecka ${getWeek(selectedDateInterval.start)}`}</p>
                </button>
                <button className={arrowButton} onClick={() => handleChangeWeek(1)}>
                    <FaAngleRight />
                </button>
            </div>
            <div className={calendarContainerContainer}>
                <div className={extraLines}>
                    {weekDays.map((day) => (
                        <p>{day.toLocaleDateString('sv-SE', {weekday: 'short', day: 'numeric'})}</p>
                    ))}
                </div>
                <div className={calendarContainer}>
                    <div className={column}>
                        {hoursOfDay.map(hour => (
                            <div key={hour} className={line}>
                                <p className={`${timeColumn} ${mediaWide}`}>{`${hour.toString().padStart(2, '0')}:00`}</p>
                                <p className={`${timeColumn} ${mediaNarrow}`}>{`${hour.toString().padStart(2, '0')}`}</p>
                            </div>
                        ))}
                    </div>
                    {weekDays.map((day, index) => (
                        <CalendarColumn key={day} day={day} events={eventsByDay[index]} onEventClick={(event) => handleEventClick(event)} />
                    ))}
                    <div className={rightOverflow}></div>
                    <div className={gridLines}>
                        {hoursOfDay.map(hour => (
                            <div key={hour} className={line}></div>
                        ))}
                    </div>
                </div>
                <div className={extraLines}>
                    {weekDays.map((day) => (
                        <div key={day} className={vertLine}></div>
                    ))}
                </div>
            </div>
        </>
    )
}