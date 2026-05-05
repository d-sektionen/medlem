import React, { useState } from 'react'
import { post } from '../request'
import { Button } from '../ui/buttons'
import { MdOutlineHowToVote } from 'react-icons/md'
import {
  questionHeader,
  votesContainer,
  voteInput,
  voteLabel,
  placeVoteContainer,
} from '../../scss/voteForm.module.scss'

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
      .catch((err) => {
        setSentVote(false)
        setErrors({
          voteError:
            err.response?.data?.error ?? 'Ett fel uppstod vid röstningen.',
        })
      })
  }
  const votingDisabled = checkedId === -1
  const placeVoteButtonText = votingDisabled ? 'Välj ett alternativ' : 'Rösta'
  const alreadyVotedText = successfullyVoted
    ? 'Tack för din röst!'
    : 'Du har röstat i omröstningen.'

  return (
    <div>
      <h3 className={questionHeader}>
        Fråga: <strong>{vote.question}</strong>
      </h3>
      {vote.has_voted || successfullyVoted ? (
        <p>{alreadyVotedText}</p>
      ) : (
        <>
          <div className={votesContainer}>
            {vote.alternatives.map(({ text, id }) => (
              <label key={id} className={voteLabel}>
                <input
                  type="radio"
                  checked={checkedId === id}
                  onChange={() => setCheckedId(id)}
                  className={voteInput}
                />
                {` ${text}`}
              </label>
            ))}
          </div>
          <div className={placeVoteContainer}>
            <Button
              disabled={votingDisabled || successfullyVoted || sentVote}
              onClick={placeVote}
            >
              <MdOutlineHowToVote />
              {placeVoteButtonText}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default VoteForm
