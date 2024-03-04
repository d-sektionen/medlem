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
          ? 'Du deltar på mötet som gäst.'
          : 'Du är inte registrerad på mötet.'}
      </strong>
    </p>
    {currentMeeting.description && (
      <p style={{ whiteSpace: 'pre-line' }}>{currentMeeting.description}</p>
    )}
  </div>
)

export default MeetingInfoPanel
