import React, { useEffect, useRef, useState } from "react";
import { FiVideo, FiX } from "react-icons/fi";
import {
  container,
  controlContainer,
  Feedback,
  qrRegistration,
} from "../../scss/checkin.module.scss";
import BigPixels from "../layout/bigPixels";
import { IconButton } from "../ui/buttons";
import { GridContainer, GridItem } from "../ui/grid";
import useLocalStorage from "../useLocalStorage";
import QrScanner from "./qrScanner";
import registerUser from "./registerUser";
import { CompatibilityTextField, TextField } from "./textField";
import useFeedback from "./useFeedback";

const Checkin = ({ events }) => {
  const [currentEvent, setCurrentEvent] = useState(events[0]);
  const [currentAction, setCurrentAction] = useState(0);
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [feedback, setFeedback] = useFeedback();
  const [_statusMessage, setStatusMessage] = useState("");
  const [compatibilityMode, setCompatibilityMode] = useLocalStorage(
    "checkin-compatibility-mode",
    false,
  );

  // TODO: event contains outdated data when switching back and forth between events
  useEffect(() => {
    if (currentEvent.status_message)
      setStatusMessage(currentEvent.status_message);
  }, [currentEvent]);

  const textFieldOnSubmit = ({ text }) => {
    registerUser(
      setFeedback,
      setStatusMessage,
      currentEvent.id,
      `auto:${text}`,
      currentAction,
    );
  };

  if (!currentEvent) {
    return "Du är inte dörrvakt på något evenemang.";
  }

  return (
    <div className={feedback && feedback.class}>
      <BigPixels>
        <GridContainer>
          <div className={container}>
            <h1>Bleep Bloop</h1>

            <label>
              <input
                type="checkbox"
                checked={compatibilityMode}
                onChange={() => setCompatibilityMode((prev) => !prev)}
              />
              Kompatibilitetsläge
            </label>

            <div>
              <GridItem>
                <p>{_statusMessage}</p>
              </GridItem>
            </div>

            <div className={controlContainer}>
              <select
                onChange={(e) => {
                  setCurrentEvent(
                    events.filter(
                      (event) => `${event.id}` === e.target.value,
                    )[0],
                  );
                }}
                value={currentEvent.id}
              >
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name}
                  </option>
                ))}
              </select>
              {compatibilityMode ? (
                <CompatibilityTextField onSubmit={textFieldOnSubmit} />
              ) : (
                <TextField onSubmit={textFieldOnSubmit} />
              )}
              {currentEvent.actions.length > 0 && (
                <select
                  onChange={(e) => {
                    setCurrentAction(parseInt(e.target.value, 10));
                  }}
                  value={currentAction}
                  disabled={currentEvent.actions.length < 2}
                >
                  {currentEvent.actions.map((a, i) => (
                    <option key={a} value={i}>
                      {a}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <GridItem>
            <div className={qrRegistration}>
              <header>
                <h2>QR Registrering</h2>
                {showQrScanner && (
                  <FiX
                    onClick={() => {
                      setShowQrScanner(false);
                    }}
                  />
                )}
              </header>

              {showQrScanner && (
                <QrScanner
                  onSubmit={textFieldOnSubmit}
                  refresh={currentAction}
                />
              )}
            </div>

            {!showQrScanner && (
              <div className={container}>
                <IconButton
                  iconComponent={FiVideo}
                  text="QR"
                  onClick={() => {
                    setShowQrScanner(true);
                  }}
                />
              </div>
            )}
          </GridItem>
        </GridContainer>

        <GridContainer>
          <div className={Feedback}>
            {feedback && feedback.icon && (
              <GridItem>
                <p>{feedback && feedback.text}</p>
              </GridItem>
            )}
          </div>
        </GridContainer>
      </BigPixels>
    </div>
  );
};

export default Checkin;
