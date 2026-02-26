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

const STATUS_REFRESH_INTERVAL = 2 * 1000 // 2 sec
const CRITICAL_BATTERY_LEVEL = 15 // percentage

const LockStatus = ({ batteryPercentage, lockOnline, lockUnlocked }) => {
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

  const UnlockedIcon = () => {
    if (lockUnlocked) return <FiUnlock />

    return <FiLock />
  }

  return (
    <div className={batteryContainer}>
      <p className={batteryPercentage < CRITICAL_BATTERY_LEVEL ? error : ''}>
        {`${Math.round(batteryPercentage)}%`}
      </p>
      <BatteryIcon />
      <p>&#x2022;</p>
      <p className={lockOnline ? success : error}>
        {lockOnline ? 'Online' : 'Offline'}
      </p>
      <OnlineIcon />
      <p>&#x2022;</p>
      <p className={lockUnlocked ? success : error}>
        {lockUnlocked ? 'Upplåst' : 'Låst'}
      </p>
      <UnlockedIcon />
    </div>
  )
}

const LockItem = ({ logo, lockName }) => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [lockData, setLockData] = useState({
    message: '',
    battery_percentage: 100,
    online: true,
    unlocked: false,
  })

  const [messageClass, setMessageClass] = useState(success)
  const lock_base_url = `/locks/${lockName.toLowerCase()}`

  // Requests a lock/unlock request at backend.
  const request = async (command) => {
    try {
      const { data } = await post(`${lock_base_url}/${command}/`)

      if (data.message.length) setMessageClass(success)

      setLockData((prev) => {
        return {
          ...data,
          message: data.message.length ? data.message : prev.message,
        }
      })
    } catch (err) {
      setMessageClass(error)

      switch (err.response?.status) {
        case 429:
          const wait_until = err.response.headers.get('retry-after')

          setIsRateLimited(true)
          setTimeout(() => {
            setIsRateLimited(false)
          }, wait_until * 1000)

          return setLockData((prev) => {
            return {
              ...prev,
              message: `Du har försökt låsa/låsa upp för många gånger, vänta ${wait_until} sekunder`,
            }
          })
        default:
          if (err.response?.data) {
            setLockData(err.response.data)
          } else {
            setLockData({
              message: 'Kunde inte kommunicera med servern.',
              battery_percentage: 0,
              online: false,
              unlocked: false,
            })
          }
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
        setLockData(
          (prev) => {
            return {
              ...data,
              message: data.message.length ? data.message : prev.message,
            }
          }
        )
        if (data.message.length) setMessageClass(success)
      },
      onError: (error) => {
        const data = error.response?.data ? error.response.data : error
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
        lockUnlocked={lockData.unlocked}
      />
      <p className={messageClass}>{lockData.message}</p>
      <div className={buttons}>
        <IconButton
          iconComponent={FiLock}
          text="Lås"
          onClick={() => request('lock')}
          disabled={isRateLimited}
        />
        <IconButton
          iconComponent={FiUnlock}
          text="Lås upp"
          onClick={() => request('unlock')}
          disabled={isRateLimited}
        />
      </div>
    </GridItem>
  )
}

const BettanPage = () => {
  return (
    <BigPixels>
      <h2 className={roomTitle}>Lås till sektionsrummen</h2>
      <GridContainer>
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
