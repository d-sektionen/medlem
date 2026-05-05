import React from 'react'
import { Button } from '../ui/buttons'
import { post, del } from '../request'
import { FiLogOut, FiLogIn } from 'react-icons/fi'

export default function MeetingInfoPanel({
  currentMeeting,
  setCurrentMeeting,
}) {
  return (
    <div>
      <h2>Mötesinfo</h2>
      <h3>{currentMeeting.name}</h3>
      <p>
        <strong>
          {currentMeeting.attending
            ? 'Du deltar på mötet.'
            : 'Du är inte registrerad på mötet.'}
        </strong>
      </p>
      {currentMeeting.description && (
        <p style={{ whiteSpace: 'pre-line' }}>{currentMeeting.description}</p>
      )}
      {currentMeeting.open_attendance && (
        <p>
          {currentMeeting.attending ? (
            <Button
              onClick={async () => {
                try {
                  await del(`/voting/attend/?meeting_id=${currentMeeting.id}`)
                  const copy = { ...currentMeeting, attending: false }
                  setCurrentMeeting(copy)
                } catch (error) {
                  console.error('Failed to leave meeting attendance', error)
                }
              }}
            >
              <FiLogOut />
              Lämna röstlängden
            </Button>
          ) : (
            <Button
              onClick={async () => {
                try {
                  const res = await post('/voting/attend/', {
                    meeting_id: currentMeeting.id,
                  })
                  setCurrentMeeting(res.data.meeting)
                } catch (error) {
                  console.error('Failed to join meeting attendance', error)
                }
              }}
            >
              <FiLogIn />
              Gå med i röstlängden
            </Button>
          )}
        </p>
      )}
    </div>
  )
}
