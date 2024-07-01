import React, { useState } from 'react'
import { FiLock, FiUnlock} from 'react-icons/fi'
import { FaBatteryHalf, FaBatteryQuarter, FaBatteryThreeQuarters, FaBatteryFull} from 'react-icons/fa'
import bettan from '../images/bettan.png'
import configura from '../images/configura-white.png'

import { success, error, logoContainer, buttons, roomTitle, batteryContainer, lockItemClass } from '../scss/lock.module.scss'
import { post } from './request'
import BigPixels from './layout/bigPixels'
import { IconButton } from './ui/buttons'
import { GridContainer, GridItem } from './ui/grid'
import useSWR from 'swr'

const STATUS_REFRESH_INTERVAL = 180 * 1000 // 3 minutes
const CRITICAL_BATTERY_LEVEL = 15;

const BatteryIcon = ({batteryLevel}) => {
  if (batteryLevel > 75) return <FaBatteryFull />;
  if (batteryLevel > 50) return <FaBatteryThreeQuarters />;
  if (batteryLevel > 25) return <FaBatteryHalf />;
  if (batteryLevel > 0) return <FaBatteryQuarter />;

  return <FaBatteryEmpty />;
}

const LockItem = ({logo, lockName}) => {
  const [text, setText] = useState(`Här kan du låsa upp sektionsrummet ${lockName}.`)
  const [textClass, setTextClass] = useState('')

  const lock_base_url = `/locks/${lockName.toLowerCase()}`

  const request = async (command, setText, setTextClass) => {
    try {
      const { data } = await post(`${lock_base_url}/${command}/`)
      setText(data.detail)
      setTextClass(success)
    } catch (err) {
      setTextClass(error)
      if (err.response?.data)
        setText(err.response.data.detail)
      else
        setText('Kunde inte kommunicera med servern.')
    }
  }

  const { data: lockStatus } = useSWR(`${lock_base_url}/`, {
    refreshInterval: STATUS_REFRESH_INTERVAL
  })

  return (
    <GridItem>
      <div className={logoContainer}>
        <img src={logo} alt={`${lockName} logo`} />
      </div>
      <h2 className={roomTitle}>{lockName}</h2>
      {lockStatus && (
        <div className={batteryContainer}>
          <BatteryIcon batteryLevel={lockStatus.battery_percentage} />
          <p
            className={(lockStatus.battery_percentage < CRITICAL_BATTERY_LEVEL) ? error : ''}
          >
            {`${Math.round(lockStatus.battery_percentage)}%`}
          </p>
        </div>
      )}
      <p className={textClass}>{text}</p>
      <div className={buttons}>
        <IconButton
          iconComponent={FiLock}
          text="Lås"
          onClick={() => request(lockName, 'lock', setText, setTextClass)}
        />
        <IconButton
          iconComponent={FiUnlock}
          text="Lås upp"
          onClick={() => request(lockName, 'unlock', setText, setTextClass)}
        />
      </div>
    </GridItem>
  )
}

const BettanPage = () => {
  return (
    <BigPixels>
      <GridContainer>
        <LockItem className={lockItemClass}
          logo={bettan}
          lockName="Bettan"
        ></LockItem>
        <LockItem className={lockItemClass}
          logo={configura}
          lockName="Configura"
        ></LockItem>
      </GridContainer>
    </BigPixels>
  )
}

export default BettanPage
