import React from 'react'
import { LoadingContext } from '../components/layout'
import { FiLock, FiUnlock } from 'react-icons/fi'
import netlight from '../images/netlight.svg'

import style from '../scss/netlight.module.scss'
import { post } from '../components/request'
import Content from '../components/content'

const request = mode => {
  post(`/tools/netlight?mode=${mode}`)
}

const NetlightPage = () => (
  <LoadingContext.Consumer>
    {loading => (
      <Content>
        <img className={style.logo} src={netlight} alt="Netlight logo" />
        <p>Här kan du låsa upp sektionsrummet Netlight.</p>
        <div className={style.buttons}>
          <div onClick={() => request('lock')}>
            <FiLock />
            <div>Lås</div>
          </div>
          <div onClick={() => request('unlock')}>
            <FiUnlock />
            <div>Lås upp</div>
          </div>
        </div>
      </Content>
    )}
  </LoadingContext.Consumer>
)

export default NetlightPage
