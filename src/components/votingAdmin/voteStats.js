import React, { useRef, useEffect } from 'react'
import { Chart } from 'frappe-charts/dist/frappe-charts.esm'
import { useEndpoint } from '../request'
import 'frappe-charts/dist/frappe-charts.min.css'

const VoteStats = ({ currentMeeting, voteId }) => {
  const [data] = useEndpoint({
    endpoint: `/voting/votes/${voteId}/`,
  })

  const voteSum = (data
    ? data.alternatives.map(alt => alt.num_votes)
    : []
  ).reduce((a, b) => a + b, 0)

  return (
    <div>
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
        {'Summa: '}
        {voteSum}
      </p>
    </div>
  )
}

export default VoteStats
