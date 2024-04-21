import React, { useState } from 'react'
import { FiLock, FiUnlock } from 'react-icons/fi'
import bettan from '../images/bettan.png'

import { success, error, logo, buttons, roomTitle } from '../scss/bettan.module.scss'
import { post } from './request'
import BigPixels from './layout/bigPixels'
import { IconButton } from './ui/buttons'
import { GridContainer, GridItem } from './ui/grid'
import useSWR from 'swr'

const BettanPage = () => {
  const [text, setText] = useState('Här kan du låsa upp sektionsrummet Bettan.')
  const [textClass, setTextClass] = useState('')

  const { data: lockStatus } = useSWR('/locks/bettan/', {
    refreshInterval: 180 * 1000, // 3 minutes
  })

  const request = async command => {
    try {
      const { data } = await post(`/locks/bettan/${command}/`)
      setText(data.detail)
      setTextClass(success)
    } catch (err) {
      if (err.response !== undefined && err.response.data)
        setText(err.response.data.detail)
      else setText('Kunde inte kommunicera med servern.')
      setTextClass(error)
    }
  }

  return (
    <BigPixels>
      <GridContainer>
        <GridItem>
          <img className={logo} src={bettan} alt="Bettan logo" />
          <h2 className={roomTitle}>Bettan</h2>
          {/*
            <p className={textClass}>
              Det går för tillfället inte att låsa/låsa upp Bettan genom denna
              sida, då sektionsrummet är utlånat till D-group nu under
              DÖMD-perioden.
            </p>
          */}
          <p className={textClass}>{text}</p>
          <div className={buttons}>
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
        </GridItem>
      </GridContainer>
    </BigPixels>
  )
}

export default BettanPage
