import React from 'react'

import style from '../../scss/ui.module.scss'

const List = ({ children }) => <ul className={style.list}>{children}</ul>

const ListItem = ({ title, subtitle, buttons }) => (
  <li>
    <div className={style.listText}>
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
    <div className={style.listButtons}>{buttons}</div>
  </li>
)

const ListButton = ({ onClick, iconComponent: Icon, text }) => (
  <button type="button" onClick={onClick} title={text}>
    <Icon />
  </button>
)

export { List, ListItem, ListButton }
