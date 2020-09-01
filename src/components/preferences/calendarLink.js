import React from 'react'
import { Button } from '../ui/buttons'

import style from '../../scss/preferences.module.scss'

const CalendarLink = ({ url }) => (
  <>
    <p>
      Denna webbadress kan importeras i ditt kalenderprogram. Länken kommer
      automatiskt hållas uppdaterad med nya händelser.
    </p>
    <div className={style.calendarSubNotice}>
      <input value={url} readOnly />
      <Button
        onClick={() => {
          // TODO: Error handling???
          navigator.clipboard.writeText(url)
        }}
      >
        Kopiera
      </Button>
    </div>
  </>
)

export default CalendarLink
