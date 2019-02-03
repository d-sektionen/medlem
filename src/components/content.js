import React, { Component } from 'react'
import style from '../scss/layout.module.scss'
import { LoadingContext } from './layout'
import Pixels from './pixels'

class Content extends Component {
  render() {
    return (
      <LoadingContext.Consumer>
        {loading => (
          <>
            <div className={style.pixels}>
              <Pixels loading={loading.status} />
            </div>
            <div className={style.container}>
              <div className={style.content}>{this.props.children}</div>
            </div>
          </>
        )}
      </LoadingContext.Consumer>
    )
  }
}

export default Content
