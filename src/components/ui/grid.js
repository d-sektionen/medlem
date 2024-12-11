import React from 'react'

import {gridContainer, gridItem, gridFullWidth} from '../../scss/ui.module.scss'

const GridContainer = ({ children }) => (
  <div className={gridContainer}>{children}</div>
)

const GridItem = ({ children, fullWidth }) => (
  <div className={`${gridItem} ${fullWidth ? gridFullWidth : ''}`}>
    {children}
  </div>
)

// GridItem.defaultProps = {
//   fullWidth: false,
// }

export { GridContainer, GridItem }

// import {gridContainer, gridItem, gridFullWidth} from '../../scss/booking/grid.scss'

// const Grid = ({ children }) => (
//   <div className={gridContainer}>{children}</div>
// )



// export { Grid }