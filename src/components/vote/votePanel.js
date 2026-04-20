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

  function handleNewVote(data) {
    if (data.meeting !== meeting.id) return

    setVotes((prev) => {
      const existingIndex = prev.findIndex((v) => v.id === data.id)
      if (existingIndex !== -1) {
        const newVotes = [...prev]
        newVotes[existingIndex] = { ...newVotes[existingIndex], ...data }
        return newVotes
      }
      return [...prev, data]
    })
  }

  function handleDeleteVote(data) {
    if (data.meeting !== meeting.id) return
    setVotes((prev) => prev.filter((v) => v.id !== data.id))
  }

  function handleDeleteAlternative(data) {
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
  }

  function handleNewAlternative(data) {
    if (data.meeting !== meeting.id) return

    setVotes((prev) =>
      prev.map((v) =>
        v.id === data.vote
          ? { ...v, alternatives: [...v.alternatives, data] }
          : v
      )
    )
  }

  function handleUpdateAlternative(data) {
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
  }

  useEffect(() => {
    fetchVotes()

    socket.on('connect', fetchVotes)

    joinRoom(`meeting_votes_${meeting.id}`)

    socket.on('new_vote', handleNewVote)

    socket.on('delete_vote', handleDeleteVote)

    socket.on('delete_alternative', handleDeleteAlternative)

    socket.on('new_alternative', handleNewAlternative)

    socket.on('update_alternative', handleUpdateAlternative)

    return () => {
      socket.off('connect', fetchVotes)
      socket.off('new_vote', handleNewVote)
      socket.off('delete_vote', handleDeleteVote)
      socket.off('delete_alternative', handleDeleteAlternative)
      socket.off('new_alternative', handleNewAlternative)
      socket.off('update_alternative', handleUpdateAlternative)

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
