import React from 'react'

import {gridContainer, gridItem, photoGridContainer, gridFullWidth} from '../../scss/ui.module.scss'

const GridContainer = ({ children }) => (
  <div className={gridContainer}>{children}</div>
)

const GridItem = ({ children, fullWidth }) => (
  <div className={`${gridItem} ${fullWidth ? gridFullWidth : ''}`}>
    {children}
  </div>
)

const PhotoGridContainer = ({ children }) => (
  <div className={photoGridContainer}>{children}</div>
)

GridItem.defaultProps = {
  fullWidth: false,
}

export { GridContainer, GridItem, PhotoGridContainer }
