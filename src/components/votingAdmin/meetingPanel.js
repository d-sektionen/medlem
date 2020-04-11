import React from 'react'

const MeetingPanel = ({ currentMeeting }) => (
  <div>
    <h2>Mötesinfo</h2>
    <h3>{currentMeeting.name}</h3>
    {currentMeeting.description && (
      <p style={{ whiteSpace: 'pre-line' }}>{currentMeeting.description}</p>
    )}
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
  </div>
)

export default MeetingPanel
