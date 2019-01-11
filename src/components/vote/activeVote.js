import React from 'react'
import VoteForm from './voteForm'

const ActiveVote = ({ votes, onMessage, setLoading }) => {
  if (votes.length === 0) return <div>Det finns ingen aktiv omröstning</div>

  const shownVote = votes[0]

  return shownVote.has_voted ? (
    <p>Du har redan röstat i den nuvarande omröstningen.</p>
  ) : (
    <VoteForm vote={shownVote} onMessage={onMessage} setLoading={setLoading} />
  )
}

export default ActiveVote
