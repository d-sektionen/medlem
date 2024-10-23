import React, { useState } from 'react'
import { FiLock, FiUnlock, FiWifi, FiWifiOff } from 'react-icons/fi'
import {
  FaBatteryHalf,
  FaBatteryQuarter,
  FaBatteryThreeQuarters,
  FaBatteryFull,
  FaBatteryEmpty,
} from 'react-icons/fa'
import bettan from '../images/bettan.png'
import configura from '../images/configura-white.png'

import {
  success,
  error,
  logoContainer,
  buttons,
  roomTitle,
  batteryContainer,
  lockItemClass,
} from '../scss/lock.module.scss'
import { post, get } from './request'
import BigPixels from './layout/bigPixels'
import { IconButton } from './ui/buttons'
import { GridContainer, GridItem } from './ui/grid'
import useSWR from 'swr'

const STATUS_REFRESH_INTERVAL = 120 * 1000 // 2 min
const CRITICAL_BATTERY_LEVEL = 15 // percentage

const LockStatus = ({ batteryPercentage, lockOnline }) => {
  const BatteryIcon = () => {
    if (batteryPercentage > 75) return <FaBatteryFull />
    if (batteryPercentage > 50) return <FaBatteryThreeQuarters />
    if (batteryPercentage > 25) return <FaBatteryHalf />
    if (batteryPercentage > 0) return <FaBatteryQuarter />

    return <FaBatteryEmpty />
  }

  const OnlineIcon = () => {
    if (lockOnline) return <FiWifi />

    return <FiWifiOff />
  }

  return (
    <div className={batteryContainer}>
      <BatteryIcon />
      <p className={batteryPercentage < CRITICAL_BATTERY_LEVEL ? error : ''}>
        {`${Math.round(batteryPercentage)}%`}
      </p>
      <p className={lockOnline ? success : error}>
        {lockOnline ? 'Online' : 'Offline'}
      </p>
      <OnlineIcon />
    </div>
  )
}

const LockItem = ({ logo, lockName }) => {
  const [lockData, setLockData] = useState({
    message: '',
    battery_percentage: 100,
    online: true,
  })

  const [messageClass, setMessageClass] = useState(success)
  const lock_base_url = `/locks/${lockName.toLowerCase()}`

  // Requests a lock/unlock request at backend.
  const request = async (command) => {
    try {
      const { data } = await post(`${lock_base_url}/${command}/`)
      setLockData(data)
      setMessageClass(data.online ? success : error)
    } catch (err) {
      setMessageClass(error)

      if (err.response?.data) {
        setLockData(err.response.data)
      } else {
        setLockData({
          message: 'Kunde inte kommunicera med servern.',
          battery_percentage: 0,
          online: false,
        })
      }
    }
  }

  // SWR to regularly update lock data variable and upon mount.
  useSWR(
    `${lock_base_url}/`,
    async (url) => {
      const { data } = await get(url)
      return data
    },
    {
      onSuccess: (data) => {
        setLockData(data)
        setMessageClass(success)
      },
      onError: (data) => {
        setLockData(data)
        setMessageClass(error)
      },
      refreshInterval: STATUS_REFRESH_INTERVAL,
    }
  )

  return (
    <GridItem>
      <div className={logoContainer}>
        <img src={logo} alt={`${lockName} logo`} />
      </div>
      <h2 className={roomTitle}>{lockName}</h2>
      <LockStatus
        batteryPercentage={lockData.battery_percentage}
        lockOnline={lockData.online}
      />
      <p className={messageClass}>{lockData.message}</p>
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
    </GridItem>
  )
}

const BettanPage = () => {
  return (
    <BigPixels>
      <GridContainer>
        <h2 className={roomTitle}>Lås till sektionsrum</h2>
        <LockItem
          className={lockItemClass}
          logo={bettan}
          lockName="Bettan"
        ></LockItem>
        <LockItem
          className={lockItemClass}
          logo={configura}
          lockName="Configura"
        ></LockItem>
      </GridContainer>
    </BigPixels>
  )
}

export default BettanPage
