import React, { useState, useEffect, useContext } from 'react'
import useSWR from 'swr'

import { FiTrash2 } from 'react-icons/fi'
import { List, ListButton, ListItem } from '../ui/list'
import { Button } from '../ui/buttons'
import { UserContext } from '../layout/layout'
import { post, del } from '../request'

const SpeakerPanel = ({ meeting }) => {
  const { data: speakers, mutate } = useSWR(
    () => meeting && `/voting/speakers/?meeting_id=${meeting.id}`
  )

  const [user] = useContext(UserContext)

  return (
    <div>
      <h2>Talarlista</h2>
      <Button
        onClick={async () => {
          const { data: newSpeaker } = await post('/voting/speakers/', {
            meeting_id: meeting.id,
          })
          mutate([...speakers, newSpeaker])
        }}
      >
        Jag vill tala!
      </Button>
      <Button
        onClick={async () => {
          const { data: newSpeaker } = await post('/voting/speakers/', {
            meeting_id: meeting.id,
            prioritized: true,
          })
          mutate([...speakers, newSpeaker])
        }}
      >
        Replik!
      </Button>
      <List>
        {speakers &&
          speakers.map(s => (
            <ListItem
              title={s.user.pretty_name}
              subtitle={s.prioritized ? 'Replik' : null}
              key={s.id}
              buttons={[
                <ListButton
                  shown={user.id === s.user.id}
                  onClick={async () => {
                    const prioQS = s.prioritized ? '&prioritized' : ''
                    await del(
                      `/voting/speakers/?meeting_id=${meeting.id}${prioQS}`
                    )
                    mutate(speakers.filter(x => x.id !== s.id))
                  }}
                  iconComponent={FiTrash2}
                  text="Lämna talarlista"
                  key="remove"
                />,
              ]}
            />
          ))}
      </List>
    </div>
  )
}

export default SpeakerPanel
