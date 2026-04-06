import React, { useEffect, useState } from 'react'
import VoteForm from './voteForm'
import { formError } from '../../scss/vote.module.scss'
import backendService from '../request/backendService'
import socket, { joinRoom, leaveRoom } from '../request/socket'

const VotePanel = ({ meeting }) => {
  const [votes, setVotes] = useState([])

  async function fetchVotes() {
    if (meeting) {
      const resp = await backendService.get(
        `/voting/votes/?meeting_id=${meeting.id}`
      )
      setVotes(resp.data)
    }
  }

  useEffect(() => {
    fetchVotes()

    socket.on('connect', () => {
      fetchVotes()
    })

    joinRoom(`meeting_votes_${meeting.id}`)

    socket.on('new_vote', (data) => {
      console.log('Received new_vote event', data)
      if (data.meeting !== meeting.id) return

      if (votes.find((v) => v.id === data.id)) {
        votes[votes.findIndex((v) => v.id === data.id)] = data
        setVotes([...votes])
        return
      }

      votes.push(data)
      setVotes([...votes])
    })

    socket.on('delete_vote', (data) => {
      if (data.meeting !== meeting.id) return

      const newVotes = votes.filter((v) => v.id !== data.id)
      setVotes(newVotes)
    })

    socket.on('delete_alternative', (data) => {
      if (data.meeting !== meeting.id) return

      setVotes((prev) =>
        prev.map((v) =>
          v.id === data.vote
            ? {
                ...v,
                alternatives: v.alternatives.filter((a) => a.id !== data.id),
              }
            : v
        )
      )
    })

    socket.on('new_alternative', (data) => {
      if (data.meeting !== meeting.id) return

      setVotes((prev) =>
        prev.map((v) =>
          v.id === data.vote
            ? { ...v, alternatives: [...v.alternatives, data] }
            : v
        )
      )
    })

    socket.on('update_alternative', (data) => {
      if (data.meeting !== meeting.id) return

      setVotes((prev) =>
        prev.map((v) =>
          v.id === data.vote
            ? {
                ...v,
                alternatives: v.alternatives.map((a) =>
                  a.id === data.id ? data : a
                ),
              }
            : v
        )
      )
    })

    return () => {
      socket.off('connect', fetchVotes)
      socket.off('new_vote')
      socket.off('delete_vote')
      socket.off('delete_alternative')
      socket.off('new_alternative')
      socket.off('update_alternative')

      leaveRoom(`meeting_votes_${meeting.id}`)
    }
  }, [meeting.id])

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
