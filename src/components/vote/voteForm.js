import React, { Component, useState } from 'react'
import { post } from '../request'

const VoteForm = ({ vote }) => {
  // vote.number_of_selectable_alternatives = 2
  // const [checkedId, setCheckedId] = useState(multipleChoice ? undefined : -1)
  const [successfullyVoted, setSuccessfullyVoted] = useState(false)
  const [checkedIds, setCheckedIds] = useState([])

  const placeVote = async () => {
    const voteData = {
      vote_id: vote.id,
      alternative_id: checkedIds,
      // alternative_ids: checkedIds,
    }

    await post('/voting/made_votes/', voteData)
    setSuccessfullyVoted(true)
  }

  const multipleChoice = vote.number_of_selectable_alternatives > 1
  const votingDisabled =
    checkedIds.length === 0 ||
    checkedIds.length !== vote.number_of_selectable_alternatives

  let buttonText
  if (votingDisabled) {
    buttonText =
      vote.number_of_selectable_alternatives > 1
        ? `Välj ${vote.number_of_selectable_alternatives} alternativ`
        : 'Välj ett alternativ'
  } else {
    buttonText = 'Rösta'
  }

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
                      onClick={() =>
                        checkedIds.includes(id)
                          ? setCheckedIds(
                              currentCheckedIds =>
                                currentCheckedIds.filter(theId => theId !== id) // filter out all that don't match id
                            )
                          : setCheckedIds(
                              [...checkedIds, id] // append id
                            )
                      }
                    />
                  ) : (
                    <input
                      type="radio"
                      checked={checkedIds[0] === id}
                      onChange={() => {
                        setCheckedIds([id])
                      }}
                    />
                  )}

                  {` ${text}`}
                </label>
              </li>
            ))}
          </ul>

          {/*
            (vote.number_of_selectable_alternatives > 1 && votingDisabled)
            &&
            (
              <p>
                Välj&nbsp;
                {vote.number_of_selectable_alternatives}
                &nbsp;alternativ
              </p>
            )
          */}

          <button type="button" disabled={votingDisabled} onClick={placeVote}>
            {buttonText}
          </button>
        </>
      )}
    </div>
  )
}

export default VoteForm
