import React, { useState } from 'react'
import { LoadingContext } from '../components/layout'
import { FiLock, FiUnlock } from 'react-icons/fi'
import netlight from '../images/netlight.svg'

import style from '../scss/netlight.module.scss'
import { post } from '../components/request'
import Content from '../components/content'

const request = mode => {
  post(`/tools/netlight?mode=${mode}`)
}

const NetlightPage = () => {
  const [text, setText] = useState(
    'Här kan du låsa upp sektionsrummet Netlight.'
  )
  const [textClass, setTextClass] = useState('')

  const request = mode => {
    post(`/tools/netlight?mode=${mode}`)
      .then(res => {
        setText(res.data.detail)
        setTextClass(style.success)
      })
      .catch(err => {
        console.log(err.response)

        if (err.response != undefined && err.response.data)
          setText(err.response.data.detail)
        else setText('Kunde inte kommunicera med servern.')
        setTextClass(style.error)
      })
  }

  return (
    <Content>
      <img className={style.logo} src={netlight} alt="Netlight logo" />
      <p className={textClass}>{text}</p>
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
  )
}

export default NetlightPage
