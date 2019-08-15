import React from 'react'
import VoteForm from './voteForm'
import { useEndpoint } from '../request'

const ActiveVote = ({ showMessage, setLoading }) => {
  const [votes, error] = useEndpoint({
    endpoint: '/voting/votes/?current=true',
  })

  if (error) {
    showMessage('Något gick fel', 'Logga ut eller refresha eller nåt.', true)
  }

  if (!votes) return <></>

  if (votes.length === 0) return <div>Det finns ingen aktiv omröstning</div>

  const shownVote = votes[0]

  return shownVote.has_voted ? (
    <p>Du har redan röstat i den nuvarande omröstningen.</p>
  ) : (
    <VoteForm
      vote={shownVote}
      onMessage={showMessage}
      setLoading={setLoading}
    />
  )
}

export default ActiveVote
