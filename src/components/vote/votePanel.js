import React, { useContext, useState, useEffect } from 'react'
import useSWR from 'swr'
import VoteForm from './voteForm'

const VotePanel = ({ meeting }) => {
  const { data: votes, error, revalidate } = useSWR(
    () => `/voting/votes/?meeting_id=${meeting.id}`
  )

  useEffect(
    () => {
      //revalidate() temporarily disabled
    },
    [meeting]
  )
  return (
    <div>
      <h2>Rösta</h2>
      {votes && (
        <>
          {votes.length === 0 && <p>Det finns ingen aktiv omröstning</p>}
          {votes.map(vote => (
            <VoteForm key={vote.id} vote={vote} />
          ))}
        </>
      )}
    </div>
  )
}

export default VotePanel
