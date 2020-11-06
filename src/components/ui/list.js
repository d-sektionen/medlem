import React from 'react'

import style from '../../scss/ui.module.scss'

const List = ({ children }) => <ul className={style.list}>{children}</ul>

const ListItem = ({ title, subtitle, buttons, color }) => (
  <li
    className={color ? style.listItemColor : ''}
    style={{ borderColor: color }}
  >
    <div className={style.listText}>
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
    <div className={style.listButtons}>{buttons}</div>
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
          className={style.listButton}
          href={href}
          onClick={onClick}
          title={text}
        >
          <Icon />
        </a>
      ) : (
        <button
          className={style.listButton}
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
