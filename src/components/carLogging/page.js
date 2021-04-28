import React, { useContext, useState, useEffect } from 'react'
import useSWR from 'swr'

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

  const [carDays, setCarDays] = useState(0)
  const [usedTrailer, setUsedTrailer] = useState(false)
  const [trailerDays, setTrailerDays] = useState(0)

  const sendData = async () => {
    const voteData = {
      start_km: 0,
      end_km: distance,
      trailer: false,
      trailer_days: null,
      car_days: null,
      active_member: false,
    }

    await post('/voting/made_votes/', voteData)
    setSuccessfullyVoted(true)
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
          {/*

          TODO: spara även loggarens LiU-ID
          
          liu-id
          start/stopp
          om start: städad vid ankomst?
          om stopp: lämnas städad?
          mätarställning
          kört för:
            - sig själv
            - något utskotts räkning
            - annan sektion/förening
          om sig själv:
              ska kostnaden räknas ut och presenteras för användaren, tillsammans med vårt Swish-nr.
          om annan sektion/förening:
              ska man presenteras med ett formulär där man fyller i de fakturauppgfiter som behövs. 
              Möjligvis kan man ha Swish alternativ här också, men faktura som standard.
          
          (om inte utskott) baserat på angivet LiU-ID, om sektionsmedlem:
            sektionsaktiv eller inte?
          
          Valfri kommentar
          
          Generera PDF med: LiU-id, namn, starttid av bokningen, sluttid av bokningen, mätarställningen, hur många km som körts, vilken "prisklass" (Utskott, Sektionsaktiv, Sektionsmedlem, övriga) det gäller, kostnad per km och totalkostnad.
          Kan (ska?!) skickas som mail till kassören, mail inkl valfri kommentar.
          */}
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
          {/* Är bilen städad?
          <Switch
            off="Nej :("
            on="Ja!"
            click={e => console.log(e)}
          ></Switch> */}
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
                  }}
                >
                  <option value="department">Utksott</option>
                  <option value="personal">Personligt</option>
                  <option value="other">Annan sektion/förening</option>
                </select>
              </label>

              <label className={style.inputGroup}>
                <span>Antal dagar som bilen använts:</span>

                <select
                  onChange={e => {
                    setCarDays(e.target.value)
                  }}
                />
              </label>

              <Checkbox
                text={'Har släpet använts?'}
                click={e => setUsedTrailer(e.target.checked)}
              />

              {usedTrailer && (
                <>
                  <label className={style.inputGroup}>
                    <span>Antal dagar som släpet använts:</span>

                    {/* Bör vara input type number? */}
                    <select
                      onChange={e => {
                        setTrailerDays(e.target.value)
                      }}
                    />
                  </label>
                </>
              )}
            </>
          )}
          {/* Har släpet använts?

          Hur många dagar har släpet använts? */}
          <br />
          <label className={style.inputGroup}>
            <span>Valfritt meddelande</span>
            <input
              type="text"
              onChange={e => {
                setMessage(e.target.value)
              }}
            />
          </label>
          <br />
          <Button onClick={() => console.log('submitted')}>
            {startStop === 'start'
              ? 'Påbörja bilkörning'
              : 'Avsluta bilkörning'}
          </Button>
          <br />
          <br />
          {driverLiuId} | {startStop} | {cleanCar + ''} | {distance} | {purpose}{' '}
          | {message} | {usedTrailer + ''}
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
