import React from 'react'

import {listItemColor, listText, listButtons, list, listButton} from '../../scss/ui.module.scss'

const List = ({ children }) => <ul className={list}>{children}</ul>

const ListItem = ({ title, subtitle, buttons, color }) => (
  <li
    className={color ? listItemColor : ''}
    style={{ borderColor: color }}
  >
    <div className={listText}>
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
    <div className={listButtons}>{buttons}</div>
  </li>
)

ListItem.defaultProps = {
  color: null,
}

const ListButton = ({ href, onClick, iconComponent: Icon, text, shown }) =>
  shown ? (
    <>
      {href ? (
        <a
          className={listButton}
          href={href}
          onClick={onClick}
          title={text}
        >
          <Icon />
        </a>
      ) : (
        <button
          className={listButton}
          type="button"
          onClick={onClick}
          title={text}
        >
          <Icon />
        </button>
      )}
    </>
  ) : (
    <></>
  )

ListButton.defaultProps = {
  shown: true,
}

export { List, ListItem, ListButton }
