import React from 'react'

import style from '../../scss/ui.module.scss'

const IconButton = ({ onClick, iconComponent: Icon, text }) => {
  // TODO: add anchor tag mode.
  return (
    <button type="button" className={style.iconButton} onClick={onClick}>
      <Icon />
      <div>{text}</div>
    </button>
  )
}

export { IconButton }
