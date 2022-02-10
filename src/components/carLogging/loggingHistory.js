/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState } from 'react'
import useSWR from 'swr'
import PropTypes from 'prop-types'
import style from '../../scss/loggingHistory.module.scss'

import { List } from '../ui/list'

const Row = ({ children }) => <div className={style.tableRow}>{children}</div>
Row.defaultProps = { children: undefined }
Row.propTypes = { children: PropTypes.node }

function LoggingHistory() {
  const [openHistoryItem, setOpenHistoryItem] = useState(null)

  const { data: logStarts } = useSWR('/carlogging/starts/')
  const { data: logEnds } = useSWR('/carlogging/entries/')

  return (
    <>
      <h2>Loggningar</h2>
      <p>
        Här ser du gjorda billoggningar som är relevanta för dig. Du ser
        billoggningar som andra gjort åt dig när du har bokat bilen,
        billoggningar du gjort åt andra, samt billoggningar du gjort åt dig
        själv.
      </p>
      <List>
        {logStarts &&
          logStarts.map(
            (logStart, index) =>
              !logStart.is_finished && (
                <div>
                  <div
                    className={style.logInfo}
                    onClick={() =>
                      openHistoryItem === index
                        ? setOpenHistoryItem(null)
                        : setOpenHistoryItem(index)
                    }
                    style={
                      openHistoryItem === index
                        ? { backgroundColor: '#333' }
                        : {}
                    }
                  >
                    <span>
                      Påbörjad körning för {logStart.car_user.pretty_name}
                    </span>
                    <span className={style.date}>
                      {logStart.logging_date.split('T')[0]}
                    </span>
                  </div>

                  {openHistoryItem === index && (
                    <div className={style.table}>
                      <Row>
                        <span>Bilen bokad av</span>
                        <span>{logStart.car_user.pretty_name}</span>
                      </Row>
                      <Row>
                        <span>Loggad av</span>
                        <span>{logStart.logging_user.pretty_name}</span>
                      </Row>
                      <Row>
                        <span>Loggning gjord</span>
                        <span>
                          {logStart.logging_date.split('T')[0]}, kl{' '}
                          {logStart.logging_date.split('T')[1].split('.')[0]}
                        </span>
                      </Row>
                      <Row>
                        <span>Mätarställning</span>
                        <span>{logStart.kilometers} km</span>
                      </Row>
                      <Row>
                        <span>Meddelande</span>
                        <span>{logStart.message}</span>
                      </Row>
                      <Row>
                        <span>Bilen var städad</span>
                        <span>{logStart.car_cleaned ? 'Ja' : 'Nej'}</span>
                      </Row>
                    </div>
                  )}
                </div>
              )
          )}

        {logEnds &&
          logEnds.map((logEnd, index) => (
            <div>
              <div
                className={style.logInfo}
                onClick={() =>
                  openHistoryItem === index
                    ? setOpenHistoryItem(null)
                    : setOpenHistoryItem(index)
                }
                style={
                  openHistoryItem === index ? { backgroundColor: '#333' } : {}
                }
              >
                <span>
                  Avslutad körning för {logEnd.car_user.pretty_name}
                  {!logEnd.is_paid ? (
                    <span style={{ color: '#ff4949' }}> (obetald)</span>
                  ) : (
                    <span style={{ color: '#49ff49' }}> (betald)</span>
                  )}
                </span>
                <span className={style.date}>
                  {logEnd.logging_date.split('T')[0]}
                </span>
              </div>

              {openHistoryItem === index && (
                <div className={style.table}>
                  <Row>
                    <span>Kostnad</span>
                    <span>{logEnd.cost} kr</span>
                  </Row>
                  <Row>
                    <span>Betald</span>
                    {logEnd.is_paid ? (
                      <span style={{ color: '#49ff49' }}>Ja</span>
                    ) : (
                      <span style={{ color: '#ff4949' }}>Nej</span>
                    )}
                  </Row>

                  {!logEnd.is_paid && (
                    <div className={style.withPadding}>
                      Betala genom att swisha {logEnd.cost} kr till 123 585 58
                      53. Märk betalningen med LiU-ID på den som bokat bilen,
                      LiU-ID på den som bokat släpet, och antal körda km.
                    </div>
                  )}

                  <div className={style.withPadding}>
                    Kostnaden beräknas genom följande:
                    <ul>
                      <li>
                        Bilen kostar 3 kr/km + 30 kr/dygn (utöver det första)
                      </li>
                      <li>Släpet kostar 100 kr/dygn</li>
                    </ul>
                  </div>
                  <br />

                  <div className={style.withPadding}>
                    Statistik om körningen:
                  </div>
                  <Row>
                    <span>Sträcka som körts:</span>
                    <span>
                      {logEnd.kilometers - logEnd.log_start.kilometers} km
                    </span>
                  </Row>
                  <Row>
                    <span>Antal dagar som bilen använts:</span>
                    <span>{logEnd.car_days}</span>
                  </Row>
                  <Row>
                    <span>Antal dagar som släpet använts:</span>
                    <span>{logEnd.trailer_days}</span>
                  </Row>

                  <div className={style.withPadding}>
                    Allmän information om loggningen:
                  </div>
                  <Row>
                    <span>Bilen bokad av</span>
                    <span>{logEnd.car_user.pretty_name}</span>
                  </Row>
                  <Row>
                    <span>Loggad av</span>
                    <span>{logEnd.logging_user.pretty_name}</span>
                  </Row>
                  <Row>
                    <span>Loggning gjord</span>
                    <span>
                      {logEnd.logging_date.split('T')[0]}, kl{' '}
                      {logEnd.logging_date.split('T')[1].split('.')[0]}
                    </span>
                  </Row>
                  <Row>
                    <span>Utskott kört för</span>
                    <span>{logEnd.committee.name}</span>
                  </Row>
                  <Row>
                    <span>Mätarställning</span>
                    <span>{logEnd.kilometers} km</span>
                  </Row>
                  <Row>
                    <span>Meddelande</span>
                    <span>{logEnd.message}</span>
                  </Row>
                  <Row>
                    <span>Bilen städades</span>
                    <span>{logEnd.car_cleaned ? 'Ja' : 'Nej'}</span>
                  </Row>
                  <Row>
                    <span>Släpet användes</span>
                    <span>{logEnd.trailer_user ? 'Ja' : 'Nej'}</span>
                  </Row>
                  {logEnd.trailer_user && (
                    <Row>
                      <span>Släpet bokat av</span>
                      <span>{logEnd.trailer_user.pretty_name}</span>
                    </Row>
                  )}

                  <div className={style.withPadding}>
                    Information om tillhörande start-loggning:
                  </div>
                  <Row>
                    <span>Loggning gjord</span>
                    <span>
                      {logEnd.log_start.logging_date.split('T')[0]}, kl{' '}
                      {
                        logEnd.log_start.logging_date
                          .split('T')[1]
                          .split('.')[0]
                      }
                    </span>
                  </Row>
                  <Row>
                    <span>Mätarställning</span>
                    <span>{logEnd.log_start.kilometers} km</span>
                  </Row>
                  {logEnd.log_start.logging_user && (
                    <Row>
                      <span>Loggad av</span>
                      <span>{logEnd.log_start.logging_user.pretty_name}</span>
                    </Row>
                  )}
                  {logEnd.log_start.logging_user && (
                    <Row>
                      <span>Meddelande</span>
                      <span>{logEnd.log_start.message}</span>
                    </Row>
                  )}
                  <Row>
                    <span>Bilen var städad</span>
                    <span>{logEnd.log_start.car_cleaned ? 'Ja' : 'Nej'}</span>
                  </Row>
                </div>
              )}
            </div>
          ))}
      </List>
    </>
  )
}

export default LoggingHistory
