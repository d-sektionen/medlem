import React, { useContext } from 'react'
import style from '../scss/layout.module.scss'
import { LoadingContext } from './layout'
import Pixels from './pixels'

const BigPixels = ({ children }) => {
  const loading = useContext(LoadingContext)

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

export default BigPixels
