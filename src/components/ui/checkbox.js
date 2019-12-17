import React, { useState } from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'

import style from '../../scss/ui.module.scss'

const Checkbox = ({ text, value, click, defaultChecked }) => (
  <div className={style.checkbox}>
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

const Switch = ({ off, on, click, defaultToggled }) => {
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
    <div className={[style.switch, toggled ? style.on : style.off].join(' ')}>
      <Slider
        className={style.slider}
        pose={toggled ? 'on' : 'off'}
        onClick={() => {
          setToggled(!toggled)
          click(!toggled)
        }}
      >
        <Blob className={style.blob} pose={toggled ? 'on' : 'off'} />
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

Switch.defaultProps = {
  click: () => null,
  defaultToggled: false,
}

export { Checkbox, Switch }
