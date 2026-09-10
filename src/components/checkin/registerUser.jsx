import React from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { fail, success } from "../../scss/checkin.module.scss";
import iconMap from "../iconMap";
import { post } from "../request";

export default (setFeedback, setStatusMessage, eventId, identifier, action) => {
  const setFeedbackExtended = (text, icon, error) => {
    const defaultIcon = error ? <FiX /> : <FiCheck />;
    const defaultText = error
      ? "Okänt fel."
      : "Allt gick väl, men det är oklart vad som faktiskt hände.";

    const Icon = iconMap[icon];

    setFeedback({
      text: text || defaultText,
      icon: Icon ? <Icon /> : defaultIcon,
      class: error ? fail : success,
    });
  };

  post("/checkin/register/", {
    event: eventId,
    user: identifier,
    action,
  })
    .then((res) => {
      let detail;
      let icon;
      let statusMessage;

      if (res.data)
        ({ detail, icon, status_message: statusMessage } = res.data);

      setFeedbackExtended(detail, icon, false);
      if (statusMessage) setStatusMessage(statusMessage);
    })
    .catch((err) => {
      let detail;
      let icon;
      let statusMessage;

      if (err.response && err.response.data)
        ({ detail, icon, status_message: statusMessage } = err.response.data);

      setFeedbackExtended(detail, icon, true);
      if (statusMessage) setStatusMessage(statusMessage);
    });
};
