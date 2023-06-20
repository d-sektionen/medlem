import React from 'react'
import { Link } from 'gatsby'

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

const Button = ({ onClick, to, href, target, children, type }) => {
  if (to)
    return (
      <Link className={style.button} to={to} onClick={onClick}>
        {children}
      </Link>
    )

  if (href)
    return (
      <a className={style.button} href={href} target={target} onClick={onClick}>
        {children}
      </a>
    )

  return (
    <button className={style.button} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

const ButtonGroup = ({ children }) => (
  <div className={style.buttonGroup}>{children}</div>
)

Button.defaultProps = {
  type: 'button',
}

export { IconButton, Button, ButtonGroup }
