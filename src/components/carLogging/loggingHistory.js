/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState } from 'react'
import useSWR from 'swr'
import PropTypes from 'prop-types'
import { List } from '../ui/list'
// import { get } from '../request'
import style from '../../scss/loggingHistory.module.scss'

const Row = ({ children }) => <div className={style.tableRow}>{children}</div>
Row.defaultProps = {
  children: undefined,
}
Row.propTypes = {
  children: PropTypes.node,
}

const LoggingHistory = () => {
  // get all logs logged by user or for booking by user
  const { data: logStarts } = useSWR('/carlogging/starts/')
  const { data: logEnds } = useSWR('/carlogging/entries/')

  // console.log(logStarts)

  const [openHistoryItem, setOpenHistoryItem] = useState(null)

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
              !logStart.logging_finished && (
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
                      {`Påbörjad körning för ${
                        logStart.booking_user.pretty_name
                      }`}
                    </span>
                    <span className={style.date}>
                      {logStart.logging_date.split('T')[0]}
                    </span>
                  </div>

                  <div>
                    {openHistoryItem === index && (
                      <div className={style.table}>
                        <Row>
                          <span>Bilen bokad av</span>
                          <span>{` ${logStart.booking_user.pretty_name}`}</span>
                        </Row>

                        <Row>
                          <span>Loggad av</span>
                          <span>{` ${logStart.logging_user.pretty_name}`}</span>
                        </Row>

                        <Row>
                          <span>Loggning gjord</span>
                          <span>
                            {` ${logStart.logging_date.split('T')[0]}, kl
                              ${
                                logStart.logging_date
                                  .split('T')[1]
                                  .split('.')[0]
                              }`}
                          </span>
                        </Row>

                        <Row>
                          <span>Mätarställning</span>
                          <span>{` ${logStart.start_km} km`}</span>
                        </Row>

                        <Row>
                          <span>Lämnat meddelande</span>
                          <span>{` ${logStart.start_message}`}</span>
                        </Row>

                        <Row>
                          <span>Bilen var städad</span>
                          <span>
                            {` ${logStart.start_car_cleaned ? 'Ja' : 'Nej'}`}
                          </span>
                        </Row>
                      </div>
                    )}
                  </div>
                </div>
              )
          )}

        {logEnds &&
          logEnds.map(
            (logEnd, index) =>
              true && (
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
                      {`Avslutad körning för ${
                        logEnd.booking_user.pretty_name
                      }`}
                      {!logEnd.paid && (
                        <span style={{ color: '#ff4949' }}> (obetald)</span>
                      )}
                    </span>
                    <span className={style.date}>
                      {logEnd.logging_date.split('T')[0]}
                    </span>
                  </div>

                  <div>
                    {openHistoryItem === index && (
                      <div className={style.table}>
                        <Row>
                          <span>Kostnad</span>
                          <span>{` ${logEnd.cost} kr`}</span>
                        </Row>

                        <Row>
                          <span>Betald</span>
                          <span
                            style={
                              logEnd.paid
                                ? { color: 'lime' }
                                : { color: '#ff4949' }
                            }
                          >
                            {logEnd.paid ? 'Ja' : 'Nej'}
                          </span>
                        </Row>

                        {!logEnd.paid && (
                          <div className={style.withPadding}>
                            {`Betala genom att swisha ${
                              logEnd.cost
                            } kr till 123 585 58 53. Märk betalningen med LiU-ID på den som bokat bilen, och antal körda km.`}
                          </div>
                        )}

                        <div
                          className={style.withPadding}
                          style={{ display: 'block', paddingBottom: '10px' }}
                        >
                          Kostnaden beräknas genom följande. Det översta som
                          stämmer på den som bokat bilen används:
                          <div>
                            <ul>
                              <li>
                                Sektionsaktiv (i utskott inom D-sektionen):
                                3kr/km + 30kr/påbörjat dygn utöver det första
                              </li>

                              <li>
                                Sektionsmedlem: 4kr/km + 30kr/påbörjat dygn
                                utöver det första
                              </li>

                              <li>
                                Annan sektion/förening: 6kr/km + 30kr/påbörjat
                                dygn utöver det första
                              </li>
                            </ul>
                          </div>
                          Släpet kostar 100kr/dygn
                        </div>

                        <div className={style.withPadding}>
                          Statistik om körningen:
                        </div>

                        <Row>
                          <span>Sträcka som körts:</span>
                          <span>
                            {` ${logEnd.end_km - logEnd.log_start.start_km} km`}
                          </span>
                        </Row>

                        <Row>
                          <span>Föraren är sektionsaktiv:</span>
                          <span>{logEnd.active_member ? 'Ja' : 'Nej'}</span>
                        </Row>

                        <Row>
                          <span>Föraren är sektionsmedlem:</span>
                          <span>{logEnd.member ? 'Ja' : 'Nej'}</span>
                        </Row>

                        <Row>
                          <span>Antal dagar som bilen använts:</span>
                          <span>{` ${logEnd.car_days}`}</span>
                        </Row>

                        <Row>
                          <span>Antal dagar som släpet använts:</span>
                          <span>{` ${logEnd.trailer_days}`}</span>
                        </Row>

                        <div className={style.withPadding}>
                          Allmän information om loggningen:
                        </div>

                        <Row>
                          <span>Bilen bokad av</span>
                          <span>{` ${logEnd.booking_user.pretty_name}`}</span>
                        </Row>

                        <Row>
                          <span>Loggad av</span>
                          <span>{` ${logEnd.logging_user.pretty_name}`}</span>
                        </Row>

                        <Row>
                          <span>Loggning gjord</span>
                          <span>
                            {` ${logEnd.logging_date.split('T')[0]}, kl
                              ${
                                logEnd.logging_date.split('T')[1].split('.')[0]
                              }`}
                          </span>
                        </Row>

                        <Row>
                          <span>Mätarställning</span>
                          <span>{` ${logEnd.end_km} km`}</span>
                        </Row>

                        <Row>
                          <span>Lämnat meddelande</span>
                          <span>{` ${logEnd.end_message}`}</span>
                        </Row>

                        <Row>
                          <span>Bilen städades</span>
                          <span>
                            {` ${logEnd.end_car_cleaned ? 'Ja' : 'Nej'}`}
                          </span>
                        </Row>

                        <div className={style.withPadding}>
                          Information om tillhörande start-loggning:
                        </div>

                        <Row>
                          <span>Start-loggning gjord</span>
                          <span>
                            {` ${
                              logEnd.log_start.logging_date.split('T')[0]
                            }, kl
                              ${
                                logEnd.log_start.logging_date
                                  .split('T')[1]
                                  .split('.')[0]
                              }`}
                          </span>
                        </Row>

                        <Row>
                          <span>Mätarställning vid start-loggning</span>
                          <span>{` ${logEnd.log_start.start_km} km`}</span>
                        </Row>

                        {logEnd.log_start.logging_user && (
                          <Row>
                            <span>Start-loggningen gjordes av</span>
                            <span>
                              {` ${logEnd.log_start.logging_user.pretty_name}`}
                            </span>
                          </Row>
                        )}

                        {logEnd.log_start.logging_user && (
                          <Row>
                            <span>Meddelande vid start-loggning</span>
                            <span>{` ${logEnd.log_start.start_message}`}</span>
                          </Row>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
          )}
      </List>
      <hr />
    </>
  )
}
export default LoggingHistory
