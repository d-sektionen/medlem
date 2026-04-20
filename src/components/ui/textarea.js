import { textarea } from '../../scss/textarea.module.scss'

import React from 'react'

const TextArea = ({ value, onChange }) => {
  return (
    <textarea
      className={textarea}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default TextArea
