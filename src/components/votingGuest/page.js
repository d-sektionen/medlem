import React, { useContext, useState, useEffect } from 'react'
import useSWR from 'swr'

import BigPixels from '../layout/bigPixels'
import { GridContainer, GridItem } from '../ui/grid'
import TitleChooser from '../ui/titleChooser'
import SpeakerPanel from './speakerPanel'
import MeetingInfoPanel from './meetingInfoPanel'
import VotePanel from './votePanel'

//import { get } from '../request'

const VotePage = ({ pageContext: { title } }) => {
  const [currentMeeting, setCurrentMeeting] = useState(null)
  const { data: meetings, revalidate } = useSWR('/voting/meetings/')

  // sync currentMeeting with updated meetings
  useEffect(
    () => {
      if (currentMeeting)
        setCurrentMeeting(meetings.find(m => m.id === currentMeeting.id))
    },
    [meetings]
  )

  /*
  const checkMembership = () => {
    ;(async () => {
      try {
        const { data } = await get('/account/me/');
        const user = data;
        console.log("SUCCESS");
        console.log(user.privileges.member);
        console.log(user.privileges.voting_guest);

      } catch (err) {
        console.log("FAIL")
        
        if (!err.response)
        {
          //setError(
          //  <>
          //    <p>Kommunikation med servern kunde inte etableras.</p>
          //    <Button onClick={() => window.location.reload()}>
          //      Ladda om sidan
          //    </Button>
          //  </>
          //)
        }
        else if (err.response.status === 401) {
          window.localStorage.removeItem('token')
        }
        
      }
    })()
  }

  checkMembership();

  */

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
                revalidate={revalidate}
              />
            </GridItem>

            {/* {currentMeeting.enable_speaker_requests && ( */}
            <GridItem>
              <SpeakerPanel meeting={currentMeeting} />
            </GridItem>
            {/* )} */}
          </>
        )}
      </GridContainer>
    </BigPixels>
  )
}
export default VotePage
