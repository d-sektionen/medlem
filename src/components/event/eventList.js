import React, { useContext } from 'react'
import moment from 'moment'
import 'moment/locale/sv'

import { FiChevronRight } from 'react-icons/fi'

import { UserContext } from '../layout/layout'
import { List, ListItem, ListButton } from '../ui/list'

moment.locale('sv')

const EventList = ({ events, setEvent }) => {
  const [user] = useContext(UserContext)

  return (
    <List>
      {events &&
        events.map(event => (
          <ListItem
            title={event.name}
            subtitle={`${event.location} | ${moment(
              new Date(event.start)
            ).format('HH:mm YYYY-MM-DD')}`}
            buttons={[
              <ListButton
                onClick={() => setEvent(event)}
                iconComponent={FiChevronRight}
                text="Välj"
                key="choose"
              />,
            ]}
          />
        ))}
    </List>
  )
}

export default EventList
