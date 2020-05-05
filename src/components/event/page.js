import React, { useState } from 'react'
import useSWR from 'swr'

import BigPixels from '../layout/bigPixels'
import { GridContainer, GridItem } from '../ui/grid'
import EventList from './eventList'
import EventPanel from './eventPanel'

const EventPage = () => {
  const { data: events } = useSWR('/event/events')
  const [event, setEvent] = useState(null)

  return (
    <BigPixels>
      <GridContainer>
        <GridItem>
          <EventList events={events} setEvent={setEvent} />
        </GridItem>
        {event && (
          <GridItem>
            <EventPanel event={event} />
          </GridItem>
        )}
      </GridContainer>
    </BigPixels>
  )
}

export default EventPage
