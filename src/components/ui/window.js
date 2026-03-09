import React from 'react'
import PropTypes from 'prop-types'

import {
  window,
  windowTitleBar,
  windowControls,
  windowControl,
  windowContent,
} from '../../scss/window.module.scss'

const Window = ({ title, children }) => {
  return (
    <div className={window}>
      <div className={windowTitleBar}>
        <div>{title}</div>
        <div className={windowControls}>
          <div className={windowControl}></div>
          <div className={windowControl}></div>
          <div className={windowControl}></div>
        </div>
      </div>
      <div className={windowContent}>{children}</div>
    </div>
  )
}

Window.defaultProps = {
  title: '',
}

Window.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Window
