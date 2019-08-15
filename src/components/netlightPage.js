import React, { useState } from 'react'
import { FiLock, FiUnlock } from 'react-icons/fi'
import netlight from '../images/netlight.svg'

import style from '../scss/netlight.module.scss'
import { post } from './request'
import BigPixels from './layout/bigPixels'
import { IconButton } from './ui/buttons'
import { GridContainer, GridItem } from './ui/grid'

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
    <BigPixels>
      <GridContainer>
        <GridItem>
          <img className={style.logo} src={netlight} alt="Netlight logo" />
          <p className={textClass}>{text}</p>
          <div className={style.buttons}>
            <IconButton
              iconComponent={FiLock}
              text="Lås"
              onClick={() => request('lock')}
            />
            <IconButton
              iconComponent={FiUnlock}
              text="Lås upp"
              onClick={() => request('unlock')}
            />
          </div>
        </GridItem>
      </GridContainer>
    </BigPixels>
  )
}

export default NetlightPage
