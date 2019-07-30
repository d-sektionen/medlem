import React from 'react'
import { FiCheck, FiX } from 'react-icons/fi'
import { post } from '../request'
import style from '../../scss/blipp.module.scss'
import iconMap from '../iconMap'

export default (setFeedback, eventId, identifier, action) => {
  const setFeedbackExtended = (text, icon, error) => {
    const defaultIcon = error ? <FiX /> : <FiCheck />
    const defaultText = error
      ? 'Okänt fel.'
      : 'Allt gick väl, men det är oklart vad som faktiskt hände.'

    const Icon = iconMap[icon]

    setFeedback({
      text: text || defaultText,
      icon: Icon ? <Icon /> : defaultIcon,
      class: error ? style.fail : style.success,
    })
  }

  post('/checkin/register/', {
    event: eventId,
    identifier,
    action,
  })
    .then(res => {
      let detail
      let icon

      if (res.data) ({ detail, icon } = res.data)

      setFeedbackExtended(detail, icon, false)
    })
    .catch(err => {
      let detail
      let icon

      if (err.response && err.response.data)
        ({ detail, icon } = err.response.data)

      setFeedbackExtended(detail, icon, true)
    })
}
