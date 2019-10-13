import React, { useState, useRef, useEffect } from 'react'
import { FiVideo } from 'react-icons/fi'

import { TextField, CompatibilityTextField } from './textField'
import style from '../../scss/checkin.module.scss'
import useFeedback from './useFeedback'
import registerUser from './registerUser'
import useModal from '../modal/useModal'
import QrScanner from './qrScanner'
import { IconButton } from '../ui/buttons'
import useLocalStorage from '../useLocalStorage'
import useKeyPress from '../useKeyPress'

const Checkin = ({ events }) => {
  const [currentEvent, setCurrentEvent] = useState(events[0])
  const [currentAction, setCurrentAction] = useState(0)
  const [feedback, setFeedback] = useFeedback()
  const [compatibilityMode, setCompatibilityMode] = useLocalStorage(
    'checkin-compatibility-mode',
    false
  )
  const shift = useKeyPress('Shift')

  // shift feature only available in non compatibility mode.
  const shiftDown = compatibilityMode ? false : shift

  const action = shiftDown
    ? (currentAction + 1) % currentEvent.actions.length
    : currentAction

  const textFieldOnSubmit = ({ text }) => {
    registerUser(setFeedback, currentEvent.id, text, action)
  }

  const [openModal] = useModal(QrScanner)

  if (!currentEvent) {
    return 'Du är inte dörrvakt på något evenemang.'
  }

  return (
    <div className={`${style.container} ${feedback && feedback.class}`}>
      <h1>Bleep Bloop</h1>
      <label>
        <input
          type="checkbox"
          checked={compatibilityMode}
          onChange={() => setCompatibilityMode(prev => !prev)}
        />
        Kompatibilitetsläge
      </label>
      <IconButton
        iconComponent={FiVideo}
        text="QR"
        onClick={() =>
          openModal(
            'QR-registrering',
            { onSubmit: textFieldOnSubmit },
            { noPadding: true }
          )
        }
      />
      <div className={style.controlContainer}>
        <select
          onChange={e => {
            setCurrentEvent(
              events.filter(event => `${event.id}` === e.target.value)[0]
            )
          }}
          value={currentEvent.id}
        >
          {events.map(event => (
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
            onChange={e => {
              setCurrentAction(parseInt(e.target.value, 10))
            }}
            value={action}
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

      {currentEvent.actions.length > 1 && !compatibilityMode && (
        <p>Håll ner shift för att temporärt byta funktion.</p>
      )}

      <div className={style.feedback}>
        {feedback && feedback.icon}
        <p>{feedback && feedback.text}</p>
      </div>
    </div>
  )
}

export default Checkin
