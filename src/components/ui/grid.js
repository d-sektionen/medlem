import React from 'react'

import style from '../../scss/ui.module.scss'

const GridContainer = ({ children }) => (
  <div className={style.gridContainer}>{children}</div>
)

const GridItem = ({ children, fullWidth }) => (
  <div className={`${style.gridItem} ${fullWidth ? style.gridFullWidth : ''}`}>
    {children}
  </div>
)

GridItem.defaultProps = {
  fullWidth: false,
}

export { GridContainer, GridItem }
