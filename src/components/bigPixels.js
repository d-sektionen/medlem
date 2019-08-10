import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { LoadingContext } from './layout'
import Pixels from './pixels'
import style from '../scss/layout.module.scss'

const BigPixels = ({ children }) => {
  const [loading] = useContext(LoadingContext)

  return (
    <>
      <div className={style.pixels}>
        <Pixels loading={loading.status} />
      </div>
      {children}
      {/* <div className={style.container}>
        <div className={style.content}>{children}</div>
      </div> */}
    </>
  )
}

BigPixels.defaultProps = {
  children: undefined,
}

BigPixels.propTypes = {
  children: PropTypes.node,
}

export default BigPixels
