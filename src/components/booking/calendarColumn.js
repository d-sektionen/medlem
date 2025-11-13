import React from 'react'
import { CalendarEvent } from './calendarEvent'
import { useMediaQuery } from '../ui/useMediaQuery'

/**
 *  calenderColumn
 *
 * @param {} events -
 * @param {} onEventClick -
 *
 * @description
 * This component
 */

export const CalendarColumn = ({ events, onEventClick, showCount }) => {
  const isNarrow = useMediaQuery('(max-width: 600px)')

  const styles = {
    height: '100%',
    width: `calc((100% - ${isNarrow ? '1.5rem' : '4.5rem'}) / 7)`,
    position: 'relative',
    borderRight: '1px solid rgb(51, 53, 55)',
    zIndex: 2,
  }

  return (
    <div style={styles}>
      {events?.map((event, i) => (
        <CalendarEvent
          onEventClick={() => onEventClick(event)}
          key={event.id}
          {...event}
          index={i}
          showCount={showCount}
        />
      ))}
    </div>
  )
}
