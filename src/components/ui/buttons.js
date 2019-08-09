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

const Button = ({ onClick, href, children }) => {
  if (href)
    return (
      <a className={style.button} href={href} onClick={onClick}>
        {children}
      </a>
    )

  return (
    <button className={style.button} type="button" onClick={onClick}>
      {children}
    </button>
  )
}

export { IconButton, Button }
