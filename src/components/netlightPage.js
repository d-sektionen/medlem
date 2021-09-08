import React, { useState } from 'react'
import { FiLock, FiUnlock } from 'react-icons/fi'
import netlight from '../images/netlight.svg'

import style from '../scss/netlight.module.scss'
import { post } from './request'
import BigPixels from './layout/bigPixels'
import { IconButton } from './ui/buttons'
import { GridContainer, GridItem } from './ui/grid'
import useSWR from 'swr'

const NetlightPage = () => {
  const [text, setText] = useState(
    'Här kan du låsa upp sektionsrummet Netlight.'
  )
  const [textClass, setTextClass] = useState('')

  const { data: lockStatus } = useSWR('/tools/netlight/', {
    refreshInterval: 180 * 1000, // 3 minutes
  })

  const request = async command => {
    try {
      const { data } = await post(`/tools/netlight/${command}/`)
      setText(data.detail)
      setTextClass(style.success)
    } catch (err) {
      if (err.response !== undefined && err.response.data)
        setText(err.response.data.detail)
      else setText('Kunde inte kommunicera med servern.')
      setTextClass(style.error)
    }
  }

  return (
    <BigPixels>
      <GridContainer>
        <GridItem>
          <img className={style.logo} src={netlight} alt="Netlight logo" />

          <p className={textClass}>
            Tyvärr behöver vi pga nya restriktioner med anledning av COVID-19
            hålla sektionsrummet Netlight stängt. Därför går det inte för
            medlemmar att låsa upp det, tills vidare.
          </p>
          
          {/*

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
          {lockStatus && (
            <p
              style={{ margin: 0, marginTop: '1rem' }}
            >{`Batterinivå: ${Math.round(lockStatus.battery_percentage)}%`}</p>
          )}

          */}
        </GridItem>
      </GridContainer>
    </BigPixels>
  )
}

export default NetlightPage
