import React, { useContext, useState, useEffect } from 'react'
import useSWR from 'swr'
import VoteForm from './voteForm'
import style from '../../scss/vote.module.scss'

// import style from '../../scss/vote.module.scss'

const VotePanel = ({ meeting }) => {
  const { data: votes, error, revalidate } = useSWR(
    () => `/voting/votes/?meeting_id=${meeting.id}`
  )
  const [errors, setErrors] = useState({})
  const setFormErrors = errors => {
    setErrors(errors)
    setTimeout(() => setErrors({}), 3000)
  }

  useEffect(() => {
    revalidate()
  }, [meeting])
  return (
    <div>
      <h2>Rösta</h2>
      {errors && <div className={style.formError}>{errors.voteError}</div>}
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
