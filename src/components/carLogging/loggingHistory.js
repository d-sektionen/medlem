/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState } from 'react'
import useSWR from 'swr'
import { List } from '../ui/list'
// import { get } from '../request'
import style from '../../scss/loggingHistory.module.scss'

const LoggingHistory = () => {
  // get all logs logged by user or for booking by user
  const { data: logStarts } = useSWR('/carlogging/starts/')
  const { data: logEnds } = useSWR('/carlogging/entries/')

  // console.log(logStarts)

  const [openHistoryItem, setOpenHistoryItem] = useState(null)

  return (
    <>
      <h2>Historik</h2>
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
                        <div>
                          <span>Bilen bokad av</span>
                          <span>{` ${logStart.booking_user.pretty_name}`}</span>
                        </div>

                        <div>
                          <span>Loggad av</span>
                          <span>{` ${logStart.logging_user.pretty_name}`}</span>
                        </div>

                        <div>
                          <span>Loggning gjord</span>
                          <span>
                            {` ${logStart.logging_date.split('T')[0]}, kl
                              ${
                                logStart.logging_date
                                  .split('T')[1]
                                  .split('.')[0]
                              }`}
                          </span>
                        </div>

                        <div>
                          <span>Mätarställning</span>
                          <span>{` ${logStart.start_km} km`}</span>
                        </div>

                        <div>
                          <span>Lämnat meddelande</span>
                          <span>{` ${logStart.start_message}`}</span>
                        </div>

                        <div>
                          <span>Bilen var städad</span>
                          <span>
                            {` ${logStart.start_car_cleaned ? 'Ja' : 'Nej'}`}
                          </span>
                        </div>
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
                    </span>
                    <span className={style.date}>
                      {logEnd.logging_date.split('T')[0]}
                    </span>
                  </div>

                  <div>
                    {openHistoryItem === index && (
                      <div className={style.table}>
                        <div>
                          <span>Bilen bokad av</span>
                          <span>{` ${logEnd.booking_user.pretty_name}`}</span>
                        </div>

                        <div>
                          <span>Loggad av</span>
                          <span>{` ${logEnd.logging_user.pretty_name}`}</span>
                        </div>

                        <div>
                          <span>Loggning gjord</span>
                          <span>
                            {` ${logEnd.logging_date.split('T')[0]}, kl
                              ${
                                logEnd.logging_date.split('T')[1].split('.')[0]
                              }`}
                          </span>
                        </div>

                        <div>
                          <span>Mätarställning</span>
                          <span>{` ${logEnd.end_km} km`}</span>
                        </div>

                        <div>
                          <span>Lämnat meddelande</span>
                          <span>{` ${logEnd.end_message}`}</span>
                        </div>

                        <div>
                          <span>Bilen städades</span>
                          <span>
                            {` ${logEnd.end_car_cleaned ? 'Ja' : 'Nej'}`}
                          </span>
                        </div>

                        <div style={{ padding: '5px' }}>
                          Information om tillhörande start-loggning:
                        </div>

                        <div>
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
                        </div>

                        <div>
                          <span>Mätarställning vid start-loggning</span>
                          <span>{` ${logEnd.log_start.start_km} km`}</span>
                        </div>

                        {logEnd.log_start.logging_user && (
                          <div>
                            <span>Start-loggningen gjordes av</span>
                            <span>
                              {` ${logEnd.log_start.logging_user.pretty_name}`}
                            </span>
                          </div>
                        )}

                        {logEnd.log_start.logging_user && (
                          <div>
                            <span>Meddelande vid start-loggning</span>
                            <span>{` ${logEnd.log_start.start_message}`}</span>
                          </div>
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
