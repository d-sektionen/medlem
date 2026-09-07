import React from 'react'

import {gridContainer, gridItem, gridFullWidth} from '../../scss/ui.module.scss'

const GridContainer = ({ children }) => (
  <div className={gridContainer}>{children}</div>
)

const GridItem = ({ children, fullWidth = false }) => (
  <div className={`${gridItem} ${fullWidth ? gridFullWidth : ''}`}>
    {children}
  </div>
)

export { GridContainer, GridItem }
