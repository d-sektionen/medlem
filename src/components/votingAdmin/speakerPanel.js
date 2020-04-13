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

  return (
    <div>
      <h2>Talarlista</h2>
      <List>
        {speakers &&
          speakers.map(s => (
            <ListItem
              title={s.user.pretty_name}
              subtitle={s.prioritized ? 'Replik' : null}
              key={s.id}
              buttons={[
                <ListButton
                  onClick={async () => {
                    await del(`/voting/speakers/${s.id}`)
                    mutate(speakers.filter(x => x.id !== s.id))
                  }}
                  iconComponent={FiTrash2}
                  text="Ta bort från talarlista"
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
