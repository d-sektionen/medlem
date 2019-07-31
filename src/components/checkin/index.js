import React, { useState } from 'react'

import TextField from './textField'
import style from '../../scss/checkin.module.scss'
import useFeedback from './useFeedback'
import registerUser from './registerUser'

const Checkin = ({ events, shiftDown }) => {
  const [currentEvent, setCurrentEvent] = useState(events[0])
  const [currentAction, setCurrentAction] = useState(0)
  const [feedback, setFeedback] = useFeedback()

  const action = shiftDown
    ? (currentAction + 1) % currentEvent.actions.length
    : currentAction

  const textFieldOnSubmit = ({ text }) => {
    registerUser(setFeedback, currentEvent.id, text, action)
  }

  if (!currentEvent) {
    return 'Du är inte dörrvakt på något evenemang.'
  }

  return (
    <div className={`${style.container} ${feedback && feedback.class}`}>
      <h1>Bleep Bloop</h1>
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
        <TextField onSubmit={textFieldOnSubmit} />
        {currentEvent.actions.length > 0 && (
          <select
            onChange={e => {
              setCurrentAction(e.target.value)
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

      {currentEvent.actions.length > 1 && (
        <p>Håll ner shift för att temporärt byta funktion.</p>
      )}

      <div className={style.feedback}>
        {feedback.icon}
        <p>{feedback.text}</p>
      </div>
    </div>
  )
}

export default Checkin
