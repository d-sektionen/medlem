import React, { useState, useEffect } from 'react'

import style from '../../scss/checkin.module.scss'
import { useEndpoint, del, get } from '../request'
import { FiTrash2 } from 'react-icons/fi'
import useRestEndpoint from '../request/useRestEndpoint'

const OccurrencePanel = ({ setCurrentOccurrence, currentOccurrence }) => {
  const [newOccurrenceName, setNewOccurrenceName] = useState('')

  const [{ list, create }, unorderedOccurrences] = useRestEndpoint({
    endpoint: '/attendance/occurrences/',
  })

  const occurrences = unorderedOccurrences
    ? [...unorderedOccurrences].reverse()
    : null

  useEffect(() => {
    list()
    // TODO: handle errors
  }, [])

  useEffect(
    () => {
      if (!occurrences || !occurrences.length) setCurrentOccurrence(null)
      else if (currentOccurrence === null)
        setCurrentOccurrence({ ...occurrences[0] })
    },
    [occurrences]
  )

  if (occurrences === null) return <></>

  return (
    <div>
      <h2>Händelser</h2>
      {occurrences && occurrences.length && (
        <select
          value={currentOccurrence ? currentOccurrence.id : undefined}
          onChange={e =>
            setCurrentOccurrence(
              occurrences.find(
                occurrence => `${occurrence.id}` === e.target.value
              )
            )
          }
        >
          {occurrences.map(occurrence => (
            <option value={occurrence.id} key={occurrence.id}>
              {occurrence.name}
            </option>
          ))}
        </select>
      )}
      <form
        onSubmit={e => {
          e.preventDefault()
          setNewOccurrenceName('')
          // setCurrentOccurrence(null)

          create({
            name: newOccurrenceName,
          }).then(res => {
            setCurrentOccurrence(res.data)
          })
        }}
      >
        <input
          value={newOccurrenceName}
          onChange={e => {
            setNewOccurrenceName(e.target.value)
          }}
        />
      </form>
    </div>
  )
}

export default OccurrencePanel
