import React from 'react'
import { ButtonGroup, Button } from '../ui/buttons'
import { patch } from '../request'

const MeetingPanel = ({ currentMeeting, updatePatch }) => (
  <div>
    <h2>Mötesinfo</h2>
    <h3>{currentMeeting.name}</h3>
    {currentMeeting.description && (
      <p style={{ whiteSpace: 'pre-line' }}>{currentMeeting.description}</p>
    )}
    <h3>Detaljer</h3>
    <ul>
      <li>
        {currentMeeting.enable_speaker_requests
          ? 'Talarlista aktiverad'
          : 'Talarlista inaktiverad'}
      </li>
      <li>
        {currentMeeting.open_attendance
          ? 'Öppen incheckning'
          : 'Stängd incheckning'}
      </li>
      <li>{`Mötesdata rensas: ${currentMeeting.clear_data}`}</li>
    </ul>
    <ButtonGroup>
      <Button
        onClick={() =>
          updatePatch({
            enable_speaker_requests: !currentMeeting.enable_speaker_requests,
          })
        }
      >
        {currentMeeting.enable_speaker_requests
          ? 'Inaktivera talarlista'
          : 'Aktivera talarlista'}
      </Button>
      <Button
        onClick={() =>
          updatePatch({
            open_attendance: !currentMeeting.open_attendance,
          })
        }
      >
        {currentMeeting.open_attendance
          ? 'Stäng självincheckning'
          : 'Öppna självincheckning'}
      </Button>
    </ButtonGroup>
  </div>
)

export default MeetingPanel
