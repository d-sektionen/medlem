import React, { useContext, useState } from 'react'
import useSWR from 'swr'

import Vote from '.'
import BigPixels from '../layout/bigPixels'
import { GridContainer, GridItem } from '../ui/grid'
import TitleChooser from '../ui/titleChooser'
import SpeakerPanel from './speakerPanel'

const VotePage = () => {
  const [currentMeeting, setCurrentMeeting] = useState(null)
  const { data: meetings } = useSWR('/voting/meetings/')

  return (
    <BigPixels>
      <GridContainer>
        <GridItem fullWidth>
          <TitleChooser
            title="D-cide"
            choice={currentMeeting}
            setChoice={setCurrentMeeting}
            choices={meetings}
            label="name"
          />
        </GridItem>
        {currentMeeting && (
          <>
            <GridItem>
              <Vote />
            </GridItem>
            {currentMeeting.enable_speaker_requests && (
              <GridItem>
                <SpeakerPanel meeting={currentMeeting} />
              </GridItem>
            )}
          </>
        )}
      </GridContainer>
    </BigPixels>
  )
}
export default VotePage
