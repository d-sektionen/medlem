import React, { useState } from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'

import {
  checkbox,
  switchy,
  on,
  blob,
  off,
  slider,
} from '../../scss/ui.module.scss'

const Checkbox = ({ text, value, click, defaultChecked }) => (
  <div className={checkbox}>
    <label>
      <input
        type="checkbox"
        onClick={e => click(e)}
        value={value}
        defaultChecked={defaultChecked}
      />
      {text}
    </label>
  </div>
)

Checkbox.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool,
  click: PropTypes.func,
}

Checkbox.defaultProps = {
  text: '',
  defaultChecked: false,
  click: () => null,
}

const Switch = ({ _off, _on, click, defaultToggled }) => {
  const [toggled, setToggled] = useState(defaultToggled)

  const Slider = posed.div({
    _on: { background: 'blue' },
    _off: { background: 'lightgray' },
    transition: { duration: 4000 },
  })

  const Blob = posed.div({
    _on: { x: '90%' },
    _off: { x: '0%' },
    transition: { duration: 1000 },
  })

  return (
    <div className={[switchy, toggled ? on : off].join(' ')}>
      <Slider
        className={slider}
        pose={toggled ? 'on' : 'off'}
        onClick={() => {
          setToggled(!toggled)
          click(!toggled)
        }}
      >
        <Blob className={blob} pose={toggled ? 'on' : 'off'} />
      </Slider>
      <p>{toggled ? _on : _off}</p>
    </div>
  )
}

Switch.propTypes = {
  _off: PropTypes.string.isRequired,
  _on: PropTypes.string.isRequired,
  click: PropTypes.func,
  defaultToggled: PropTypes.bool,
}

Switch.defaultProps = {
  click: () => null,
  defaultToggled: false,
}

export { Checkbox, Switch }
