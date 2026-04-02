import React, { useEffect, useState } from 'react'
import VoteForm from './voteForm'
import { formError } from '../../scss/vote.module.scss'
import backendService from '../request/backendService'
import socket, { joinRoom } from '../request/socket'

const VotePanel = ({ meeting }) => {
  const [votes, setVotes] = useState([])

  async function fetchVotes() {
    if (meeting) {
      const resp = await backendService.get(
        `/voting/votes/?meeting_id=${meeting.id}`
      )
      setVotes(resp.data)
      console.log('Fetched votes', resp.data)
    }
  }

  useEffect(() => {
    fetchVotes()
  }, [meeting])

  joinRoom(`meeting_votes_${meeting.id}`)

  socket.on('new_vote', (data) => {
    if (data.meeting === meeting.id) {
      if (votes.find((v) => v.id === data.id)) {
        votes[votes.findIndex((v) => v.id === data.id)] = data
        setVotes([...votes])
        return
      }
      votes.push(data)
      setVotes([...votes])
    }
  })

  socket.on('delete_vote', (data) => {
    if (data.meeting === meeting.id) {
      const newVotes = votes.filter((v) => v.id !== data.id)
      setVotes(newVotes)
    }
  })

  socket.on('delete_alternative', (data) => {
    if (data.meeting === meeting.id) {
      const newVotes = votes.map((v) => {
        if (v.id === data.vote) {
          return {
            ...v,
            alternatives: v.alternatives.filter((a) => a.id !== data.id),
          }
        }
        return v
      })
      setVotes(newVotes)
    }
  })

  socket.on('new_alternative', (data) => {
    if (data.meeting === meeting.id) {
      const newVotes = votes.map((v) => {
        if (v.id === data.vote) {
          return {
            ...v,
            alternatives: [...v.alternatives, data],
          }
        }
        return v
      })
      setVotes(newVotes)
    }
  })

  socket.on('update_alternative', (data) => {
    if (data.meeting === meeting.id) {
      const newVotes = votes.map((v) => {
        if (v.id === data.vote) {
          return {
            ...v,
            alternatives: v.alternatives.map((a) =>
              a.id === data.id ? data : a
            ),
          }
        }
        return v
      })
      setVotes(newVotes)
    }
  })

  // const { data: votes = [], mutate } = useSWR(
  //   `/voting/votes/?meeting_id=${meeting.id}`
  // )

  const [errors, setErrors] = useState({})
  const setFormErrors = (errors) => {
    setErrors(errors)
    setTimeout(() => setErrors({}), 3000)
  }

  return (
    <div>
      <h2>Rösta</h2>
      {errors && <div className={formError}>{errors.voteError}</div>}
      {votes && (
        <>
          {votes.length === 0 && <p>Det finns ingen aktiv omröstning</p>}
          {votes.map((vote) => (
            <VoteForm key={vote.id} vote={vote} setErrors={setFormErrors} />
          ))}
        </>
      )}
    </div>
  )
}

export default VotePanel
