import React from "react";
import { del, post } from "../request";
import { Button } from "../ui/buttons";

const MeetingInfoPanel = ({ currentMeeting }) => (
  <div>
    <h2>Mötesinfo</h2>
    <h3>{currentMeeting.name}</h3>
    <p>
      <strong>
        {currentMeeting.attending
          ? "Du deltar på mötet som gäst."
          : "Du är inte registrerad på mötet."}
      </strong>
    </p>
    {currentMeeting.description && (
      <p style={{ whiteSpace: "pre-line" }}>{currentMeeting.description}</p>
    )}
  </div>
);

export default MeetingInfoPanel;
