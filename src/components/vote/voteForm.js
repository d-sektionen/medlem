import React, { Component, useState } from 'react'
import { post } from '../request'

const VoteForm = ({ vote, setErrors }) => {
  const [checkedId, setCheckedId] = useState(-1)
  const [successfullyVoted, setSuccessfullyVoted] = useState(false)
  const [sentVote, setSentVote] = useState(false)

  const placeVote = async () => {
    if (sentVote || successfullyVoted) return
    setErrors({})

    setSentVote(true)
    const voteData = {
      vote_id: vote.id,
      alternative_id: checkedId,
    }

    await post('/voting/made_votes/', voteData)
    .then(() => setSuccessfullyVoted(true))
    .catch(err => {
      setSentVote(false)
      setErrors({ voteError: err.response.data.error })
    })
  }
  const votingDisabled = checkedId === -1
  const buttonText = votingDisabled ? 'Välj ett alternativ' : 'Rösta'
  const alreadyVotedText = successfullyVoted
    ? 'Tack för din röst!'
    : 'Du har röstat i omröstningen.'

  return (
    <div>
      <strong>{vote.question}</strong>
      {vote.has_voted || successfullyVoted ? (
        <p>{alreadyVotedText}</p>
      ) : (
        <>
          <ul>
            {vote.alternatives.map(({ text, id }) => (
              <li key={id}>
                <label>
                  <input
                    type="radio"
                    checked={checkedId === id}
                    onChange={() => setCheckedId(id)}
                  />
                  {` ${text}`}
                </label>
              </li>
            ))}
          </ul>
          <button type="button" disabled={votingDisabled || successfullyVoted || sentVote} onClick={placeVote}>
            {buttonText}
          </button>
        </>
      )}
    </div>
  )
}

export default VoteForm
