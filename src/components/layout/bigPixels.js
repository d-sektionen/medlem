import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { LoadingContext } from './layout'
import Pixels from './pixels'
import { pixels, container, content } from '../../scss/layout.module.scss'

const BigPixels = ({ children = undefined }) => {
  const [loading] = useContext(LoadingContext)

  return (
    <>
      <div className={pixels}>
        <Pixels loading={loading.status} />
      </div>
      {children}
      {/* <div className={container}>
        <div className={content}>{children}</div>
      </div> */}
    </>
  )
}

BigPixels.propTypes = {
  children: PropTypes.node,
}

export default BigPixels
