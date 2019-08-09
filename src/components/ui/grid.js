import React from 'react'

import style from '../../scss/ui.module.scss'

const GridContainer = ({ children }) => (
  <div className={style.gridContainer}>{children}</div>
)

const GridItem = ({ children }) => (
  <div className={style.gridItem}>{children}</div>
)

export { GridContainer, GridItem }
