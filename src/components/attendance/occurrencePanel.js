import React, { useEffect } from 'react'

import useRestEndpoint from '../request/useRestEndpoint'
import AutoForm from '../form/form'

const OccurrencePanel = ({ setCurrentOccurrence, currentOccurrence }) => {
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
      <AutoForm endpoint="/attendance/occurrences/" customFetcher={create} />
    </div>
  )
}

export default OccurrencePanel
