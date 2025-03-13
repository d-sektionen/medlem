import React, { useState, useEffect } from 'react'

import { get, post, del } from './request'
import { Button } from './ui/buttons'

import { inputLabel } from '../scss/membership.module.scss'

const MembershipPanel = () => {
  const [initiallyLoaded, setInitiallyLoaded] = useState(true)
  const [sent, setSent] = useState(false)
  const [startingYear, setStartingYear] = useState('')
  const [program, setProgram] = useState('Empty')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [message, setMessage] = useState('')
  const [infomailSubscriber, setInfomailSubscriber] = useState(true)
  const [liuCardId, setLiuCardId] = useState("")
  const [errors, setErrors] = useState('')

  useEffect(() => {
    get('/membership/request/')
      .then(() => {
        setSent(true)
        setErrors(null)
        setInitiallyLoaded(true)
      })
      .catch(err => {
        setInitiallyLoaded(true)
        if (err.response && err.response.status === 404) {
          setSent(false)
          setErrors(null)
        } else if (err.response && err.response.data) {
          setErrors(err.response.data)
        }
      })
  }, [])

  const submitRequest = e => {
    e.preventDefault()

    post('/membership/request/', {
      first_name: firstName,
      last_name: lastName,
      program,
      starting_year: startingYear,
      message,
      infomail_subscriber: infomailSubscriber,
      liu_card_id: liuCardId,
    })
      .then(() => {
        setErrors(null)
        setSent(true)
      })
      .catch(err => {
        if (err.response && err.response.data) {
          setErrors(err.response.data)
        }
      })
  }

  const removeRequest = () => {
    if (
      window.confirm(
        'Är du säker på att du vill återkalla din medlemsförfrågan?'
      )
    )
      del('/membership/request/')
        .then(() => {
          setSent(false)
          setErrors(null)
        })
        .catch(err => {
          if (err.response && err.response.data) {
            setErrors(err.response.data)
          }
        })
  }

  return (
    <>
      <h2>Bli medlem</h2>
      {initiallyLoaded && !sent && (
        <>
          <p>
            Nu drar din tid tillsammans med oss i D-sektionen igång, och ett
            utmärkt sätt att få ut det mesta av din universitetstid är att bli
            medlem i sektionen.
          </p>
          <p>
            Att bli medlem i D-sektionen ger med sig en massa fördelar. Först
            och främst ger det dig möjlighet att delta under alla roliga
            evenemang vi anordnar under läsåren. Du har också möjlighet att
            använda de webbtjänster vi erbjuder på vår hemsida, samt om du vill
            kunna gå på och påverka under våra sektionsmöten där beslut tas
            kring sektionens framtida verksamhet.
          </p>
          <p>
            Ett medlemskap i D-sektionen är helt gratis. Vi finansieras via
            sponsoravtal, bidrag från studentkåren LinTek och universitetet,
            samt betalningar under enskilda event. För att bli medlem i
            D-sektionen registrerar du dig via följande formulär:
          </p>
          <p>
            Med ansökan kan du välja att prenumerera på vårt nyhetsbrev, där vi
            informerar om kommande evenemang och annan information som kan vara
            av intresse för dig som student på D-sektionen.
            För att avsluta prenumerationen efter att du blivit medlem kan du gå till profilinställningar.
          </p>

          <form onSubmit={submitRequest}>
            <label className={inputLabel}>
              Förnamn
              <input
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              {errors && errors.first_name && errors.first_name.join(', ')}
            </label>
            <label className={inputLabel}>
              Efternamn
              <input
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
              {errors && errors.last_name && errors.last_name.join(', ')}
            </label>
            <label className={inputLabel}>
              Program
              <select
                value={program}
                onChange={e => setProgram(e.target.value)}
              >
                <option value="Empty" />
                <option value="D">Datateknik (D)</option>
                <option value="U">Mjukvaruteknik (U)</option>
                <option value="IT">Informationsteknologi (IT)</option>
                <option value="IP">Innovativ Programmering (IP)</option>
                <option value="CS">Masterprogram Computer Science (CS)</option>
                <option value="CY">Masterprogram Cybersecurity (CYS)</option>
              </select>
              {errors && errors.program && errors.program.join(', ')}
            </label>
            <label className={inputLabel}>
              Startår
              <input
                type="number"
                value={startingYear}
                onChange={e => setStartingYear(parseInt(e.target.value, 10))}
              />
              {errors &&
                errors.starting_year &&
                errors.starting_year.join(', ')}
            </label>
            <label className={inputLabel}>
              LiU-kortnummer (kan lämnas tom)
              <br />
              <span>Finns på framsidan av LiU-kortet.</span>
              <input
                value={liuCardId}
                onChange={e => setLiuCardId(e.target.value)}
              />
              {errors && errors.liu_card_id && errors.liu_card_id.join(', ')}
            </label>
            <label className={inputLabel}>
              Övrig information (kan lämnas tom)
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              {errors && errors.message && errors.message.join(', ')}
            </label>
            <label className={inputLabel}>
              Prenumerera på veckomailet:
              <input
                checked={infomailSubscriber}
                type="checkbox"
                onChange={e => setInfomailSubscriber(e.target.checked)}
              />
              {errors && errors.infomail_subscriber && errors.infomail_subscriber.join(', ')}
            </label>
            <Button type="submit">Skicka förfrågan</Button>
          </form>
        </>
      )}
      {initiallyLoaded && sent && (
        <>
          <p>
            Tack för din medlemsförfrågan, den kommer behandlas så snart som
            möjligt.
          </p>
          <Button onClick={removeRequest}>Återkalla medlemsförfrågan</Button>
        </>
      )}
      {errors && errors.detail}
    </>
  )
}

export default MembershipPanel
