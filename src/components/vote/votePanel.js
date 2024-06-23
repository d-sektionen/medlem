import React, { useState } from 'react'
import useSWR from 'swr'
import VoteForm from './voteForm'
import { formError } from '../../scss/vote.module.scss'

const VotePanel = ({ meeting }) => {
  const { data: votes } = useSWR(
    () => `/voting/votes/?meeting_id=${meeting.id}`
  )
  const [errors, setErrors] = useState({})
  const setFormErrors = errors => {
    setErrors(errors)
    setTimeout(() => setErrors({}), 3000)
  }

  return (
    <div>
      <h2>Rösta</h2>
      {errors && <div className={formError}>{errors.voteError}</div>}
      {votes && (
        <>
          {votes.length === 0 && <p>Det finns ingen aktiv omröstning</p>}
          {votes.map(vote => (
            <VoteForm key={vote.id} vote={vote} setErrors={setFormErrors} />
          ))}
        </>
      )}
    </div>
  )
}

export default VotePanel
