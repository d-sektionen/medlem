import React, { useContext, useState, useEffect } from 'react'
import useSWR from 'swr'

import BigPixels from '../layout/bigPixels'
import { GridContainer, GridItem } from '../ui/grid'
import TitleChooser from '../ui/titleChooser'
import SpeakerPanel from './speakerPanel'
import MeetingInfoPanel from './meetingInfoPanel'
import VotePanel from './votePanel'

export default function VotePage({ pageContext: { title } }) {
  const [currentMeeting, setCurrentMeeting] = useState(null)
  const { data: meetings } = useSWR('/voting/meetings/')

  useEffect(() => {
    if (currentMeeting)
      setCurrentMeeting(meetings.find((m) => m.id === currentMeeting.id))
  }, [meetings])

  return (
    <BigPixels>
      <GridContainer>
        <GridItem fullWidth>
          <TitleChooser
            title={title}
            choice={currentMeeting}
            setChoice={setCurrentMeeting}
            choices={meetings}
            label="name"
            noChoicesLabel="Det finns inga möten just nu."
          />
        </GridItem>
        {currentMeeting && (
          <>
            <GridItem>
              <MeetingInfoPanel
                currentMeeting={currentMeeting}
                setCurrentMeeting={setCurrentMeeting}
              />
            </GridItem>
            <GridItem>
              <SpeakerPanel meeting={currentMeeting} />
            </GridItem>
            <GridItem>
              <VotePanel meeting={currentMeeting} />
            </GridItem>
          </>
        )}
      </GridContainer>
    </BigPixels>
  )
}
