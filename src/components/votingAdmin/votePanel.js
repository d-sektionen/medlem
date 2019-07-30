import React, { useState, useEffect } from 'react'

import { FiTrash2, FiCheck, FiBarChart2, FiEdit2 } from 'react-icons/fi'

import useRestEndpoint from '../request/useRestEndpoint'
import useModal, { useCloseModal } from '../modal/useModal'
import AddVote from './addVote'
import VoteStats from './voteStats'

const VotePanel = ({ currentMeeting }) => {
  const [{ list, update, create }, votes] = useRestEndpoint({
    endpoint: '/voting/votes/',
  })

  const [openCreateModal] = useModal(AddVote)
  const [openChartModal] = useModal(VoteStats)
  const closeModal = useCloseModal()

  // Close modal when a vote is created
  useEffect(closeModal, [votes])

  useEffect(
    () => {
      if (currentMeeting) list({ event_id: currentMeeting.id })
      // TODO: handle errors
    },
    [currentMeeting]
  )

  if (votes === null) return <></>

  return (
    <div>
      <h2>Omröstningar</h2>
      <button
        onClick={() =>
          openCreateModal('Ny omröstning', { currentMeeting, create })
        }
        type="button"
      >
        Ny omröstning
      </button>
      <ul>
        {votes
          .filter(vote => vote.meeting === currentMeeting.id)
          .map(vote => (
            <li key={vote.id}>
              {vote.question}
              {
                <FiBarChart2
                  onClick={() =>
                    openChartModal(`Resultat av "${vote.question}"`, {
                      voteId: vote.id,
                    })
                  }
                />
              }
              {
                <FiEdit2
                  onClick={() =>
                    openCreateModal(`Uppdatera "${vote.question}"`, {
                      currentMeeting,
                      update,
                      updateData: vote,
                    })
                  }
                />
              }
              {vote.open && <FiCheck />}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default VotePanel
