import React, { useRef, useEffect } from 'react'
import useSWR from 'swr'

const VoteStats = ({ currentMeeting, voteId }) => {
  const { data } = useSWR(() => voteId && `/voting/admin-votes/${voteId}/`)

  const voteSum = (data
    ? data.alternatives.map(alt => alt.num_votes)
    : []
  ).reduce((a, b) => a + b, 0)

  const attendantsVoted = data ? data.attendants_voted : ''

  const { data: allVotes } = useSWR(
    `/voting/admin-votes/?event_id=${currentMeeting.id}`
  )

  const thisVote = allVotes.filter(vote => vote.id === voteId)[0]
  const maxSelectable = thisVote.max_number_of_selectable_alternatives
  const minSelectable = thisVote.min_number_of_selectable_alternatives

  return (
    <div>
      {minSelectable < maxSelectable && (
        <p>
          {minSelectable}-{maxSelectable}
          &nbsp;alternativ väljs av deltagarna
        </p>
      )}

      {minSelectable === maxSelectable && (
        <p>
          {maxSelectable}
          &nbsp;alternativ väljs av deltagarna
        </p>
      )}

      <ul>
        {data &&
          data.alternatives.map(alt => (
            <li key={alt.text}>
              {`${alt.text}: ${alt.num_votes}`}
              {voteSum
                ? ` (${
                    alt.num_votes
                      ? Math.round((1000 * alt.num_votes) / voteSum) / 10
                      : 0
                  }%)`
                : ''}
            </li>
          ))}
      </ul>
      <p>
        {'Summa av alla röster: '}
        {voteSum}
      </p>
      <p>
        {'Antal personer som röstat: '}
        {attendantsVoted}
      </p>
    </div>
  )
}

export default VoteStats
