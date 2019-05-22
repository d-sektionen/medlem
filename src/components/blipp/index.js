import React, { useState } from 'react'
import qs from 'querystring'
import { post, del } from '../request'
import useKeyPress from './useKeyPress'
import TextField from './textField'
import style from '../../scss/blipp.module.scss'
import useFeedback from './useFeedback'
import { FiCheck, FiX, FiUserCheck, FiUserX } from 'react-icons/fi'

const regex = RegExp('^[0-9]+$')

const Blipp = ({ scanners, shiftDown }) => {
  const [currentMeeting, setCurrentMeeting] = useState(scanners[0])
  const [feedback, setFeedback] = useFeedback()

  const registerUser = (identifier, unregister = false) => {
    const identifierType = regex.test(identifier) ? 'card_id' : 'username'

    const request = unregister
      ? del(
          `/voting/attendants/?${qs.stringify({
            meeting: currentMeeting.meeting.id,
            [identifierType]: identifier,
          })}`
        )
      : post('/voting/attendants/', {
          meeting: currentMeeting.meeting.id,
          [identifierType]: identifier,
        })

    request
      .then(res => {
        let feedback = {}
        if (res.status === 200)
          feedback = { icon: <FiUserX />, text: `Användare borttagen.` }
        if (res.status === 201)
          feedback = {
            icon: <FiUserCheck />,
            text: `Användare ${res.data.user.username} tillagd.`,
          }

        feedback = { icon: <FiCheck />, class: style.success, ...feedback }
        setFeedback(feedback)
      })
      .catch(err => {
        let feedback = {}
        if (err.response && err.response.data && err.response.data.error)
          feedback = { text: err.response.data.error }
        else feedback = { text: 'Okänt fel.' }

        feedback = { icon: <FiX />, class: style.fail, ...feedback }
        setFeedback(feedback)
      })
  }

  const textFieldOnSubmit = ({ text, shift }) => {
    registerUser(text, shift)
  }

  return (
    <div className={`${style.container} ${feedback && feedback.class}`}>
      <h1>Bleep Bloop</h1>
      <div className={style.controlContainer}>
        <select
          onChange={e => {
            setCurrentMeeting(
              scanners.filter(
                scanner => scanner.meeting.id == e.target.value
              )[0]
            )
          }}
          value={currentMeeting.meeting.id}
        >
          {scanners.map(scanner => (
            <option key={scanner.meeting.id} value={scanner.meeting.id}>
              {scanner.meeting.name}
            </option>
          ))}
        </select>
        <TextField onSubmit={textFieldOnSubmit} shiftDown={shiftDown} />
      </div>
      <p>Håll ner shift för att ta bort en medlem</p>

      <div className={style.feedback}>
        {feedback.icon}
        <p>{feedback.text}</p>
      </div>
    </div>
  )
}

export default Blipp
