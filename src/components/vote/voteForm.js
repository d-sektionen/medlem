import React, { Component, useState } from 'react'
import { post } from '../request'

const VoteForm = ({ vote }) => {
  vote.number_of_selectable_alternatives = 2
  const multipleChoice = vote.number_of_selectable_alternatives > 1
  const [checkedId, setCheckedId] = useState(multipleChoice ? undefined : -1)
  const [successfullyVoted, setSuccessfullyVoted] = useState(false)
  const [checkedIds, setCheckedIds] = useState(multipleChoice ? [] : undefined)

  const placeVote = async () => {
    const voteData = {
      vote_id: vote.id,
      alternative_id: checkedId,
      alternative_ids: checkedIds,
    }

    console.log(voteData)

    await post('/voting/made_votes/', voteData)
    setSuccessfullyVoted(true)
  }
  console.log(checkedIds)
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
                  {multipleChoice ? (
                    <input
                      type="checkbox"
                      onChange={() =>
                        setCheckedIds(prevState => {
                          checkedIds: [...prevState.checkedIds, id]
                        })
                      }
                    />
                  ) : (
                    <input
                      type="radio"
                      checked={checkedId === id}
                      onChange={() => setCheckedId(id)}
                    />
                  )}

                  {` ${text}`}
                </label>
              </li>
            ))}
          </ul>
          <button type="button" disabled={votingDisabled} onClick={placeVote}>
            {buttonText}
          </button>
        </>
      )}
    </div>
  )
}

export default VoteForm
