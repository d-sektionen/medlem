import React, { useState, useEffect } from 'react'
import qs from 'querystring'
import { useEndpoint, post, del } from '../request'
import useKeyPress from '../useKeyPress'

import style from '../../scss/checkin.module.scss'

const useTextField = onEnter => {
  // State for keeping track of whether key is pressed
  const [text, setText] = useState('')
  const regex = RegExp('^[A-Za-z0-9]+$')

  // If pressed key is our target key then set to true
  const downHandler = e => {
    const keyChar = String.fromCharCode(e.keyCode)
    if (e.key === 'Enter') {
      setText(prev => {
        if (prev !== '') onEnter({ text: prev, shift: e.shiftKey })
        return ''
      })
      // Remove event listeners on cleanup
    } else if (e.key === 'Backspace') {
      setText(prev => prev.slice(0, -1))
    } else if (regex.test(keyChar)) {
      // console.log(keyCode + ' - ' + key + ' - ' + String.fromCharCode(keyCode))
      setText(prev => (prev.length > 16 ? prev : `${prev}${keyChar}`))
    }
  }

  // Add event listeners
  useEffect(
    () => {
      window.addEventListener('keydown', downHandler)
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener('keydown', downHandler)
      }
    },
    [onEnter]
  ) // Empty array ensures that effect is only run on mount and unmount

  return text
}

const TextField = ({ onSubmit }) => {
  const text = useTextField(onSubmit)

  return <div className={style.textField}>{text}</div>
}

export default TextField