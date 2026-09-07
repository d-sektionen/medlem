import React, { useState } from 'react'
import PropTypes from 'prop-types'
// import posed from 'react-pose'

import styles from '../../scss/ui.module.scss'

const Checkbox = ({
  text = '',
  value,
  click = () => null,
  defaultChecked = false,
}) => (
  <div className={styles.checkbox}>
    <label>
      <input
        type="checkbox"
        onClick={(e) => click(e)}
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

// OBS! if switch is used again, it first needs to be changed to use framer-motion instead
const Switch = ({ off, on, click = () => null, defaultToggled = false }) => {
  const [toggled, setToggled] = useState(defaultToggled)

  const Slider = posed.div({
    on: { background: 'blue' },
    off: { background: 'lightgray' },
    transition: { duration: 4000 },
  })

  const Blob = posed.div({
    on: { x: '90%' },
    off: { x: '0%' },
    transition: { duration: 1000 },
  })

  return (
    <div className={[styles.switchy, toggled ? styles.On : styles.Off].join(' ')}>
      <Slider
        className={styles.slider}
        pose={toggled ? 'on' : 'off'}
        onClick={() => {
          setToggled(!toggled)
          click(!toggled)
        }}
      >
        <Blob className={styles.blob} pose={toggled ? 'on' : 'off'} />
      </Slider>
      <p>{toggled ? on : off}</p>
    </div>
  )
}

Switch.propTypes = {
  off: PropTypes.string.isRequired,
  on: PropTypes.string.isRequired,
  click: PropTypes.func,
  defaultToggled: PropTypes.bool,
}

export {
  Checkbox,
  // OBS! if switch is used again, it first needs to be changed to use framer-motion instead
  // , Switch
}
