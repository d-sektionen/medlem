import React from 'react'
import { Link } from 'gatsby'

import { iconButton, button, buttonGroup } from '../../scss/ui.module.scss'

const IconButton = ({ onClick, iconComponent: Icon, text, disabled }) => {
  // TODO: add anchor tag mode.
  return (
    <button type="button" className={iconButton} onClick={onClick} disabled={disabled}>
      <Icon />
      <div>{text}</div>
    </button>
  )
}

const Button = ({ onClick, to, href, target, children, type }) => {
  if (to)
    return (
      <Link className={button} to={to} onClick={onClick}>
        {children}
      </Link>
    )

  if (href)
    return (
      <a className={button} href={href} target={target} onClick={onClick}>
        {children}
      </a>
    )

  return (
    <button className={button} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

const ButtonGroup = ({ children }) => (
  <div className={buttonGroup}>{children}</div>
)

Button.defaultProps = {
  type: 'button',
}

export { IconButton, Button, ButtonGroup }
