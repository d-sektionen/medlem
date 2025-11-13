import React from 'react'
import { Button } from '../ui/buttons'
import { post, del } from '../request'

const MeetingInfoPanel = ({ currentMeeting, revalidate }) => (
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
              await del(`/voting/attend/?meeting_id=${currentMeeting.id}`)
              revalidate()
            }}
          >
            Lämna röstlängden
          </Button>
        ) : (
          <Button
            onClick={async () => {
              await post('/voting/attend/', { meeting_id: currentMeeting.id })
              revalidate()
            }}
          >
            Gå med i röstlängden
          </Button>
        )}
      </p>
    )}
  </div>
)

export default MeetingInfoPanel
