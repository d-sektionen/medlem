import React from 'react'
import useSWR from 'swr'
import VoteForm from './voteForm'

const VotePanel = ({ meeting }) => {
  const { data: votes } = useSWR(
    () => `/voting/votes/?meeting_id=${meeting.id}`
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
