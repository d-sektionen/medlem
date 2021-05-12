import React, { useContext, useState, useEffect } from 'react'
import useSWR from 'swr'
import { post } from '../request'

import BigPixels from '../layout/bigPixels'
import { GridContainer, GridItem } from '../ui/grid'
import { Checkbox, Switch } from '../ui/checkbox'
import style from '../../scss/carlogging.module.scss'
import { Button } from '../ui/buttons'

const CarLoggingPage = ({ pageContext: { title } }) => {
  const [driverLiuId, setDriverLiuId] = useState('')
  const [startStop, setStartStop] = useState('start')
  const [cleanCar, setCleanCar] = useState(false)
  const [distance, setDistance] = useState()
  const [purpose, setPurpose] = useState('department')
  const [message, setMessage] = useState('')
  const [carDays, setCarDays] = useState(1)
  const [usedTrailer, setUsedTrailer] = useState(false)
  const [trailerDays, setTrailerDays] = useState(1)
  const [activeMember, setActiveMember] = useState(true)

  const sendStartData = async () => {
    if (driverLiuId === '' || distance === undefined) {
      console.log('hej')
    } else {
      const logStartData = {
        start_km: distance,
        start_message: message,
        booking_liu_id: driverLiuId,
        start_car_cleaned: cleanCar,
      }

      post('/carlogging/starts/', logStartData)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          const errorMessage = error.response.data.error
          console.log(errorMessage)
        })

      /*
      await post('/carlogging/starts/', logStartData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err)
      })
      */

      /*
      try {
        const { data: logResponse } = await post('/carlogging/starts/', logStartData)
        console.log(logResponse);  
      } catch (error) {
        console.log(error)
      }
      */
    }
  }

  const sendStopData = async () => {
    if (driverLiuId === '' || distance === undefined) {
      // :(
    } else {
      const logData = {
        end_km: distance,
        end_message: message,
        end_car_cleaned: cleanCar,
        booking_liu_id: driverLiuId,
        trailer: usedTrailer,
        trailer_days: trailerDays,
        car_days: carDays,
        active_member: activeMember,
      }
      const { data: logResponse } = await post('/carlogging/entries/', logData)

      console.log(logResponse)
    }
  }

  const { data: userData } = useSWR(() => '/account/me/')

  useEffect(
    () => {
      if (userData) setDriverLiuId(userData.username)
    },
    [userData]
  )

  return (
    <BigPixels>
      <GridContainer>
        <GridItem>
          <h2>Ny billoggning</h2>
          <p>
            Här kan du logga bilkörning. Det gör du både när du börjar eller
            avslutar din bilkörning. Du kan göra det åt någon annan.
          </p>
          <hr />

          <label className={style.inputGroup}>
            <span>LiU-ID på den som bokat</span>
            <input
              value={driverLiuId}
              onChange={e => {
                setDriverLiuId(e.target.value)
              }}
            />
          </label>
          <div className={style.inputGroup}>
            <span>Ska du påbörja eller avsluta bilkörningen?</span>

            <label>
              <input
                type="radio"
                name="logtype"
                value="start"
                defaultChecked
                onChange={e => setStartStop(e.target.value)}
              />
              Start
            </label>

            <label>
              <input
                type="radio"
                name="logtype"
                value="stop"
                onChange={e => setStartStop(e.target.value)}
              />
              Stopp
            </label>
          </div>

          <Checkbox
            text={
              startStop === 'start'
                ? 'Är bilen städad? '
                : 'Har du städat bilen?'
            }
            value="cleancar"
            click={e => setCleanCar(e.target.checked)}
          />
          <label className={style.inputGroup}>
            <span>Miltal</span>
            {/* TODO: Lägg till senaste miltalet?*/}
            <input
              type="number"
              name="mileage"
              placeholder="t.ex. 79472"
              min="0"
              step="1"
              onChange={e => {
                setDistance(e.target.value)
              }}
            />
          </label>
          {startStop === 'stop' && (
            <>
              <label className={style.inputGroup}>
                <span>Bilkörningens syfte</span>

                <select
                  onChange={e => {
                    setPurpose(e.target.value)
                    if (e.target.value == 'department') {
                      setActiveMember(true)
                    } else if (e.target.value == 'other') {
                      setActiveMember(false)
                    } else if (e.target.value == 'personal') {
                      setActiveMember(false)
                    }
                  }}
                >
                  <option value="department">Utksott</option>
                  <option value="personal">Personligt</option>
                  <option value="other">Annan sektion/förening</option>
                </select>
              </label>

              {purpose == 'personal' && (
                <label className={style.inputGroup}>
                  <Checkbox
                    text={`Är ${driverLiuId} sektionsaktiv?`}
                    value=""
                    click={e => setActiveMember(e.target.checked)}
                  />
                </label>
              )}

              <label className={style.inputGroup}>
                <span>Antal dagar som bilen använts:</span>

                <input
                  type="number"
                  value={carDays}
                  min="1"
                  step="1"
                  onChange={e => {
                    setCarDays(e.target.value)
                  }}
                />
              </label>

              <Checkbox
                text={'Har släpet använts?'}
                value={'false'}
                click={e => setUsedTrailer(e.target.checked)}
              />

              {usedTrailer && (
                <>
                  <label className={style.inputGroup}>
                    <span>Antal dagar som släpet använts:</span>
                    <input
                      type="number"
                      value={trailerDays}
                      min="1"
                      step="1"
                      onChange={e => {
                        setTrailerDays(e.target.value)
                      }}
                    />
                  </label>
                </>
              )}
            </>
          )}

          <label className={style.inputGroup}>
            <span>Valfritt meddelande</span>

            <textarea
              onChange={e => {
                setMessage(e.target.value)
              }}
            />
          </label>

          <br />
          <br />
          <Button
            onClick={startStop === 'start' ? sendStartData : sendStopData}
          >
            {startStop === 'start'
              ? 'Påbörja bilkörning'
              : 'Avsluta bilkörning'}
          </Button>
          <br />
          {/*
          <br />
          {driverLiuId} | {startStop} | {cleanCar + ''} | {distance} | {purpose}{' '}
          | {message} | {usedTrailer + ''} | {carDays} | {trailerDays} | {"activemember: " + activeMember}
          */}
        </GridItem>

        <GridItem>
          <h2>Historik</h2>
          <hr />
        </GridItem>
      </GridContainer>
    </BigPixels>
  )
}
export default CarLoggingPage
