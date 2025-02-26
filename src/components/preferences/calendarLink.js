import React from 'react'
import { Button } from '../ui/buttons'

import { calendarSubNotice } from '../../scss/preferences.module.scss'

const CalendarLink = ({ url }) => (
  <>
    <p>
      Denna webbadress kan importeras i ditt kalenderprogram. Länken kommer
      automatiskt hållas uppdaterad med nya händelser.
    </p>
    <div className={calendarSubNotice}>
      <input value={url + ".ics"} readOnly />
      <Button
        onClick={() => {
          // TODO: Error handling???
          navigator.clipboard.writeText(url + ".ics")
        }}
      >
        Kopiera
      </Button>
    </div>
  </>
)

export default CalendarLink
