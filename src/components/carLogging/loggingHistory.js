/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useContext, useState, useEffect } from 'react'
import { List, ListItem, ListButton } from '../ui/list'
import useSWR from 'swr'
import { get } from '../request'
import style from '../../scss/loggingHistory.module.scss'

const LoggingHistory = () => {
  // get all logs logged by user or for booking by user
  const { data: logStarts } = useSWR('/carlogging/starts/')

  // console.log(logStarts)

  const [openHistoryItem, setOpenHistoryItem] = useState(null)

  return (
    <>
      <h2>Historik</h2>

      {}
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
                  >
                    <span>{`Påbörjad loggning för ${
                      logStart.booking_user.pretty_name
                    }`}</span>
                    <span className={style.date}>
                      {logStart.logging_date.split('T')[0]}
                    </span>
                  </div>

                  {openHistoryItem === index && (
                    <div className={style.logDetails}>
                      <div>
                        <span>Bokad av</span>
                        {` ${logStart.booking_user.pretty_name}`}
                      </div>

                      <div>
                        <span>Loggad av</span>
                        {` ${logStart.logging_user.pretty_name}`}
                      </div>

                      <div>
                        <span>Mätarställning:</span>
                        {` ${logStart.start_km} km`}
                      </div>

                      <div>
                        <span>Lämnat meddelande:</span>
                        {` ${logStart.start_message}`}
                      </div>

                      <div>
                        <span>Bilen var städad:</span>
                        {` ${logStart.start_car_cleaned ? 'ja' : 'nej'}`}
                      </div>
                    </div>
                  )}
                </div>
              )
          )}
      </List>
      <hr />
    </>
  )
}
export default LoggingHistory
