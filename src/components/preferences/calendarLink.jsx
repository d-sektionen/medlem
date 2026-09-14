import React from "react";
import { calendarSubNotice } from "../../scss/preferences.module.scss";
import { Button } from "../ui/buttons";

const CalendarLink = ({ url }) => (
  <>
    <p>
      Denna webbadress kan importeras i ditt kalenderprogram. Länken kommer
      automatiskt hållas uppdaterad med nya händelser.
    </p>
    <div className={calendarSubNotice}>
      <input value={url} readOnly />
      <Button
        onClick={() => {
          // TODO: Error handling???
          navigator.clipboard.writeText(url);
        }}
      >
        Kopiera
      </Button>
    </div>
  </>
);

export default CalendarLink;
