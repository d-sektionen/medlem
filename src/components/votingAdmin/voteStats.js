import React, { useRef, useEffect } from 'react'
import { Chart } from 'frappe-charts/dist/frappe-charts.esm'
import { useEndpoint } from '../request'
import 'frappe-charts/dist/frappe-charts.min.css'

const VoteStats = ({ currentMeeting, voteId }) => {
  const chartContainer = useRef(null)

  const [data] = useEndpoint({
    endpoint: `/voting/votes/${voteId}/`,
  })

  useEffect(() => {
    if (!chartContainer.current) return

    const chartData = {
      labels: data ? data.alternatives.map(alt => alt.text) : [],
      datasets: [
        {
          name: 'Some Data',
          type: 'bar',
          values: data ? data.alternatives.map(alt => alt.num_votes) : [],
        },
      ],
    }

    const chart = new Chart(chartContainer.current, {
      title: data ? data.question : [],
      data: chartData,
      type: 'pie', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
      height: 400,
      colors: ['#20407C', '#E5398D', '#754022', '#70BD44', '#F7E623'],
    })
  })

  return (
    <div>
      <div ref={chartContainer} />
      <p>
        {'Summa: '}
        {(data ? data.alternatives.map(alt => alt.num_votes) : []).reduce(
          (a, b) => a + b,
          0
        )}
      </p>
    </div>
  )
}

export default VoteStats
