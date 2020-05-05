import React from 'react'

import ImageHeader from '../ui/imageHeader'

const EventPanel = ({ event }) => {
  const tags = {
    L: 'Lunch Föreläsning',
    P: 'Pub',
    S: 'Sittning',
    A: 'Annat',
  }
  return (
    <div>
      <ImageHeader
        title={event.name}
        image={event.image ? event.image : null}
        TitleTag="h2"
      />
      <p> {event.description} </p>
      <h4> {tags[event.tags]} </h4>
    </div>
  )
}

export default EventPanel
