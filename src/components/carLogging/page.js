import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { post } from '../request'

import BigPixels from '../layout/bigPixels'
import { GridContainer, GridItem } from '../ui/grid'
import { Checkbox } from '../ui/checkbox'
import style from '../../scss/carlogging.module.scss'
import { Button } from '../ui/buttons'

import LoggingHistory from './loggingHistory'

const CarLoggingPage = ({ pageContext: { title } }) => {
  const [driverLiuId, setDriverLiuId] = useState('')
  const [startStop, setStartStop] = useState('start')
  const [cleanCar, setCleanCar] = useState(false)
  const [distance, setDistance] = useState()
  const [message, setMessage] = useState('')
  const [carDays, setCarDays] = useState(1)
  const [usedTrailer, setUsedTrailer] = useState(false)
  const [trailerDays, setTrailerDays] = useState(1)
  const [activeMember, setActiveMember] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [statusMessageStyle, setStatusMessageStyle] = useState(style.success)
  const DECIMAL_RADIX = 10

  const updateStatus = response => {
    if (response.status !== 200) {
      setStatusMessageStyle(style.error)
    } else {
      setStatusMessageStyle(style.success)
    }
    // show response.data.status_text
    if (response.data.hasOwnProperty('status_text')) {
      setStatusMessage(response.data.status_text)
    } else {
      console.log("the response didn't have status_text")
    }
  }

  const submitStartData = async () => {
    if (driverLiuId === '') {
      setStatusMessage('LiU-ID:t får inte vara tomt')
      setStatusMessageStyle(style.error)
    } else if (distance === undefined || distance === '') {
      setStatusMessage('Miltalet får inte vara tomt')
      setStatusMessageStyle(style.error)
    } else {
      const logStartData = {
        start_km: parseInt(distance, DECIMAL_RADIX),
        start_message: message,
        booking_liu_id: driverLiuId,
        start_car_cleaned: cleanCar,
      }

      post('/carlogging/starts/', logStartData)
        .then(response => {
          updateStatus(response)
        })
        .catch(error => {
          updateStatus(error.response)
        })
    }
  }

  const submitStopData = async () => {
    if (driverLiuId === '') {
      setStatusMessage('LiU-ID:t får inte vara tomt')
      setStatusMessageStyle(style.error)
    } else if (distance === undefined || distance === '') {
      setStatusMessage('Miltalet får inte vara tomt')
      setStatusMessageStyle(style.error)
    } else {
      const logData = {
        end_km: parseInt(distance, DECIMAL_RADIX),
        end_message: message,
        end_car_cleaned: cleanCar,
        booking_liu_id: driverLiuId,
        trailer: usedTrailer,
        trailer_days: parseInt(trailerDays, DECIMAL_RADIX),
        car_days: parseInt(carDays, DECIMAL_RADIX),
        active_member: activeMember,
      }

      post('/carlogging/entries/', logData)
        .then(response => {
          updateStatus(response)
        })
        .catch(error => {
          updateStatus(error.response)
        })
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

          <div className={style.inputGroup}>
            <span>LiU-ID på den som bokat bilen</span>
            <input
              value={driverLiuId}
              onChange={e => {
                setDriverLiuId(e.target.value)
              }}
            />
          </div>

          <div className={style.inputGroup}>
            <span>Ska du påbörja eller avsluta bilkörningen?</span>

            <label htmlFor="start-input">
              <input
                id="start-input"
                type="radio"
                name="logtype"
                value="start"
                defaultChecked
                onChange={e => {
                  setStartStop(e.target.value)
                  setActiveMember(false)
                  setUsedTrailer(false)
                  setTrailerDays(0)
                }}
              />
              Påbörja
            </label>

            <label htmlFor="stop-input">
              <input
                id="stop-input"
                type="radio"
                name="logtype"
                value="stop"
                onChange={e => setStartStop(e.target.value)}
              />
              Avsluta
            </label>
          </div>

          <Checkbox
            text={
              startStop === 'start' ? 'Bilen är städad ' : 'Bilen har städats'
            }
            value="cleancar"
            click={e => setCleanCar(e.target.checked)}
          />
          <div className={style.inputGroup}>
            <span>Miltal (mätarställning i km)</span>
            {/* TODO: Lägg till senaste miltalet? Hämta personens senaste logstart's startKm */}
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
          </div>
          {startStop === 'stop' && (
            <>
              <div className={style.inputGroup}>
                <Checkbox
                  text={`${driverLiuId} är sektionsaktiv (medlem i något av D-sektionens utskott)`}
                  click={e => setActiveMember(e.target.checked)}
                  checked={activeMember}
                />
              </div>

              <div className={style.inputGroup}>
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
              </div>

              <Checkbox
                text="Släpet har använts"
                click={e => setUsedTrailer(e.target.checked)}
              />

              {usedTrailer && (
                <>
                  <div className={style.inputGroup}>
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
                  </div>
                </>
              )}
            </>
          )}

          <div className={style.inputGroup}>
            <span>Valfritt meddelande</span>

            <textarea
              onChange={e => {
                setMessage(e.target.value)
              }}
            />
          </div>

          <p>
            Se till att du klickat i alla rutor som stämmer för loggningen.
            Observera att den du loggar åt (om du loggar åt någon annan) kommer
            att kunna se det du skrivit, och att det är just du som gjort det.
          </p>

          <div className={statusMessageStyle}>{statusMessage}</div>
          <Button
            onClick={() => {
              if (startStop === 'start') {
                submitStartData()
              } else {
                submitStopData()
              }
            }}
          >
            {startStop === 'start'
              ? 'Påbörja bilkörning'
              : 'Avsluta bilkörning'}
          </Button>
          <br />
        </GridItem>

        <GridItem>
          <LoggingHistory />
        </GridItem>
      </GridContainer>
    </BigPixels>
  )
}
export default CarLoggingPage
