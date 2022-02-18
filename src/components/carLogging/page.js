import React, { useState, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import { post } from '../request'
import style from '../../scss/carlogging.module.scss'

import BigPixels from '../layout/bigPixels'
import { GridContainer, GridItem } from '../ui/grid'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/buttons'

import LoggingHistory from './loggingHistory'

function CarLoggingPage({ pageContext: { title } }) {
  const [carLiuId, setCarLiuId] = useState('')
  const [startStop, setStartStop] = useState('start')
  const [cleanCar, setCleanCar] = useState(false)
  const [kilometers, setKilometers] = useState()
  const [message, setMessage] = useState('')
  const [committeeId, setCommitteeId] = useState(-1)
  const [usedTrailer, setUsedTrailer] = useState(false)
  const [trailerLiuId, setTrailerLiuId] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [statusMessageStyle, setStatusMessageStyle] = useState(style.success)
  const DECIMAL_RADIX = 10

  const { data: committeeData } = useSWR(() => '/committee/all/')
  const { data: userData } = useSWR(() => '/account/me/')
  useEffect(() => {
    if (userData) {
      setCarLiuId(userData.username)
      setTrailerLiuId(userData.username)
    }
  }, [userData])

  const updateStatus = response => {
    if (response.status >= 400) {
      setStatusMessageStyle(style.error)
    } else {
      setStatusMessageStyle(style.success)
    }

    if (response.data.hasOwnProperty('status_text')) {
      setStatusMessage(response.data.status_text)
    } else {
      setStatusMessage('Response code: ' + response.status)
      console.log("The response didn't have the property status_text")
    }
  }

  const submitStartData = async () => {
    if (carLiuId === '') {
      setStatusMessage('LiU-ID:t får inte vara tomt')
      setStatusMessageStyle(style.error)
    } else if (kilometers === undefined || kilometers === '') {
      setStatusMessage('Miltalet får inte vara tomt')
      setStatusMessageStyle(style.error)
    } else {
      const data = {
        car_liu_id: carLiuId,
        kilometers: parseInt(kilometers, DECIMAL_RADIX),
        message: message,
        car_cleaned: cleanCar,
      }

      post('/carlogging/starts/', data)
        .then(response => {
          mutate('/carlogging/starts/')
          updateStatus(response)
        })
        .catch(error => updateStatus(error.response))
    }
  }

  const submitStopData = async () => {
    if (carLiuId === '') {
      setStatusMessage('LiU-ID:t får inte vara tomt')
      setStatusMessageStyle(style.error)
    } else if (kilometers === undefined || kilometers === '') {
      setStatusMessage('Miltalet får inte vara tomt')
      setStatusMessageStyle(style.error)
    } else if (committeeId === -1) {
      setStatusMessage('Utskottet får inte vara ovalt')
      setStatusMessageStyle(style.error)
    } else {
      const data = {
        car_liu_id: carLiuId,
        trailer: usedTrailer,
        trailer_liu_id: trailerLiuId,
        committee_id: committeeId,
        kilometers: parseInt(kilometers, DECIMAL_RADIX),
        message: message,
        car_cleaned: cleanCar,
      }

      post('/carlogging/entries/', data)
        .then(response => {
          mutate('/carlogging/entries/')
          updateStatus(response)
        })
        .catch(error => updateStatus(error.response))
    }
  }

  return (
    <BigPixels>
      <GridContainer>
        <GridItem fullWidth={true}>
          <h1>{title}</h1>
        </GridItem>
        <GridItem>
          <h2>Ny loggning</h2>
          <p>
            Här kan du logga bilkörning för dig eller någon annan. Det gör du
            både när du börjar och avslutar din bilkörning.
          </p>
          <hr />

          <div className={style.inputGroup}>
            <span>LiU-ID på den som har bokat bilen</span>
            <input
              value={carLiuId}
              onChange={e => setCarLiuId(e.target.value)}
            />
          </div>

          <div className={style.inputGroup}>
            <span>Ska du påbörja eller avsluta billoggningen?</span>
            <label htmlFor="start-input">
              <input
                id="start-input"
                type="radio"
                name="logtype"
                defaultChecked
                value="start"
                onChange={e => setStartStop(e.target.value)}
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
              startStop === 'start' ? 'Bilen är städad' : 'Bilen har städats'
            }
            value="cleanCar"
            click={e => setCleanCar(e.target.checked)}
          />

          {startStop === 'stop' && (
            <Checkbox
              text="Släpet har använts"
              value="trailerUsed"
              defaultChecked={usedTrailer}
              click={e => setUsedTrailer(e.target.checked)}
            />
          )}

          {startStop === 'stop' && usedTrailer && (
            <div className={style.inputGroup}>
              <span>LiU-ID på den som har bokat släpet</span>
              <input
                value={trailerLiuId}
                onChange={e => setTrailerLiuId(e.target.value)}
              />
            </div>
          )}

          {startStop === 'stop' && (
            <div className={style.inputGroup}>
              <span>Utskottet bilen har körts för</span>
              <select
                defaultValue={committeeId}
                onChange={e => setCommitteeId(parseInt(e.target.value))}
              >
                <option disabled value={-1}>
                  --välj ett utskott--
                </option>
                {committeeData &&
                  committeeData.map(c => (
                    <option value={c.id}>{c.name}</option>
                  ))}
              </select>
            </div>
          )}

          <div className={style.inputGroup}>
            <span>Miltal (mätarställning i kilometer)</span>
            <input
              type="number"
              name="mileage"
              placeholder="t.ex. 79472"
              min="0"
              step="1"
              onChange={e => setKilometers(e.target.value)}
            />
          </div>

          <div className={style.inputGroup}>
            <span>Meddelande (valfritt)</span>
            <textarea onChange={e => setMessage(e.target.value)} />
          </div>

          <hr />
          <p>
            Se till att du klickat i alla rutor som stämmer för loggningen.
            Observera att den du loggar åt kommer att kunna se det du skrivit,
            och att det är just du som har gjort det.
          </p>

          <div className={statusMessageStyle}>{statusMessage}</div>
          <Button
            onClick={() =>
              startStop === 'start' ? submitStartData() : submitStopData()
            }
          >
            {startStop === 'start'
              ? 'Påbörja bilkörning'
              : 'Avsluta bilkörning'}
          </Button>
        </GridItem>
        <GridItem>
          <LoggingHistory />
        </GridItem>
      </GridContainer>
    </BigPixels>
  )
}

export default CarLoggingPage
