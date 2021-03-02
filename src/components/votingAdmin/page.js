import React, { useState, useEffect } from 'react'
import useSWR from 'swr'

import MeetingPanel from './meetingPanel'
import DoorkeeperPanel from '../checkin/doorkeeperPanel'
import VotePanel from './votePanel'
import AttendantPanel from './attendantPanel'
import { GridContainer, GridItem } from '../ui/grid'
import SpeakerPanel from './speakerPanel'
import TitleChooser from '../ui/titleChooser'
import AddMeeting from './addMeeting'
import useModal, { useCloseModal } from '../modal/useModal'
import { post, patch } from '../request'
import BigPixels from '../layout/bigPixels'
import GuestPanel from './guestPanel'

const VotingAdminPage = ({ pageContext: { title } }) => {
  const [currentMeeting, setCurrentMeeting] = useState(null)
  const { data: unorderedMeetings, mutate } = useSWR('/voting/admin-meetings/')
  const [openCreateModal] = useModal(AddMeeting)
  const closeModal = useCloseModal()

  const create = async data => {
    const { data: newMeeting } = await post('/voting/admin-meetings/', data)
    mutate([...unorderedMeetings, newMeeting])
  }

  const updatePatch = async data => {
    const { data: updatedMeeting } = await patch(
      `/voting/admin-meetings/${currentMeeting.id}/`,
      data
    )
    mutate([
      ...unorderedMeetings.filter(meeting => meeting.id !== currentMeeting.id),
      updatedMeeting,
    ])
  }

  const meetings = unorderedMeetings ? [...unorderedMeetings].reverse() : null

  // sync currentMeeting with updated meetings
  useEffect(
    () => {
      if (currentMeeting)
        setCurrentMeeting(meetings.find(m => m.id === currentMeeting.id))
    },
    [meetings]
  )

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
            action={() => {
              openCreateModal('Nytt möte', {
                create: async data => {
                  await create(data)
                  closeModal()
                },
              })
            }}
            actionLabel="Nytt möte"
            noChoicesLabel="Det finns inga möten just nu."
          />
        </GridItem>
        {currentMeeting && (
          <>
            <GridItem>
              <MeetingPanel
                currentMeeting={currentMeeting}
                updatePatch={updatePatch}
              />
            </GridItem>
            <GridItem>
              <VotePanel currentMeeting={currentMeeting} />
            </GridItem>
            <GridItem>
              <DoorkeeperPanel event={currentMeeting} />
            </GridItem>
            <GridItem>
              <AttendantPanel currentMeeting={currentMeeting} />
            </GridItem>
            <GridItem>
              <GuestPanel currentMeeting={currentMeeting} />
            </GridItem>
            <GridItem>
              <SpeakerPanel meeting={currentMeeting} />
            </GridItem>
          </>
        )}
      </GridContainer>
    </BigPixels>
  )
}

export default VotingAdminPage
