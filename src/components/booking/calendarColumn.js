import React from "react";
import { CalendarEvent } from "./calendarEvent";
import { set } from 'date-fns';
import { useMediaQuery } from "../ui/useMediaQuery";

const CalendarCell = ({ onMouseUp, onMouseDown, onMouseEnter, hour}) => {
    const buttonStyles = {
        position: 'absolute',
        top: 100/24 * hour + '%',
        left: 0,
        //backgroundColor: 'blue',
        //border: '1px red solid',
        backgroundColor: 'transparent',
        border: 'none',
        height: 100/24 + '%',
        width: '100%',
        color: 'transparent',
    }

    return (
        <button onMouseEnter={()=>onMouseEnter(hour)} onMouseDown={()=>onMouseDown(hour)} onMouseUp={()=>onMouseUp(hour)} style={buttonStyles}>{`${hour.toString().padStart(2, '0')}:00`}</button>
    )
}
export const CalendarColumn = ({ events, onEventClick, day }) => {
    const [mouseDownValue, setMouseDownValue] = React.useState(null);
    const [isMouseDown, setIsMouseDown] = React.useState(false);
    const [mouseEnterValue, setMouseEnterValue] = React.useState(null);
    const isNarrow = useMediaQuery('(max-width: 600px)');

    const styles = {
        heigth: '100%',
        width: `calc((100% - ${isNarrow ? '1.5rem' : '4.5rem'}) / 7)`,
        position: 'relative',
        borderRight: '1px solid rgb(51, 53, 55)',
        zIndex: 2,
    }
    console.log('events in calendarColumn:',events)
    const hours = Array.from({ length: 24 }, (_, i) => i);

    /* Create a new event from click and drag */    
    const constructEvent = {
        start: set(new Date(day), {hours: mouseDownValue, minutes: 0, seconds: 0}),
        end: set(new Date(day), {hours: mouseEnterValue + 1, minutes: 0, seconds: 0}),
        id: 10101010101,
        color: {fill: 'red', border: 'black'},
        user: {first_name: 'Temp'}
    }
    
    const handleMouseDown = (hour) => {
        setIsMouseDown(true);
        setMouseDownValue(hour);
        setMouseEnterValue(hour)
    }
    const handleMouseUp = (hour) => {
        setIsMouseDown(false);
        alert(`You selected from ${mouseDownValue} to ${hour}`);
    }
    const handleMouseEnter = (hour) => {
        if (isMouseDown) {
            setMouseEnterValue(hour);
        }
    }

    return (
        <>
        <div style={styles}>
            {hours.map(hour => (
                <CalendarCell onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseEnter={handleMouseEnter} hour={hour}/>
            ))}
            {events?.map(event => (
                <CalendarEvent onEventClick={()=>onEventClick(event)} key={event.id} {...event} />
            ))}
            {mouseDownValue && mouseEnterValue && <CalendarEvent {...constructEvent} isDraft />}
        </div>
        </>
    )
}