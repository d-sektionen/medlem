import React from 'react'

import style from '../../scss/ui.module.scss'

const GridContainer = ({ children }) => (
  <div className={style.gridContainer}>{children}</div>
)

const GridItem = ({ children, fullWidth, backgroundTest }) => (
  <div
    style={{ backgroundColor: backgroundTest }}
    className={`${style.gridItem} ${fullWidth ? style.gridFullWidth : ''}`}
  >
    {children}
  </div>
)

GridItem.defaultProps = {
  fullWidth: false,
  backgroundTest: style.gridItem.backgroundColor,
}
// style={{marginRight: spacing + 'em'}}
export { GridContainer, GridItem }
