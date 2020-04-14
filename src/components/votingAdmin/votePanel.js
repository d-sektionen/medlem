import React, { useState, useEffect } from 'react'

import { FiTrash2, FiCheck, FiBarChart2, FiEdit2 } from 'react-icons/fi'

import useRestEndpoint from '../request/useRestEndpoint'
import useModal, { useCloseModal } from '../modal/useModal'
import AddVote from './addVote'
import VoteStats from './voteStats'
import { List, ListItem, ListButton } from '../ui/list'
import { Button } from '../ui/buttons'

const VotePanel = ({ currentMeeting }) => {
  const [{ list, update, create }, votes] = useRestEndpoint({
    endpoint: '/voting/admin-votes/',
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
      <Button
        onClick={() =>
          openCreateModal('Ny omröstning', {
            currentMeeting,
            create,
          })
        }
      >
        Ny omröstning
      </Button>
      <List>
        {votes
          .filter(vote => vote.meeting === currentMeeting.id)
          .map(vote => (
            <ListItem
              title={vote.question}
              subtitle={vote.open ? 'Active' : undefined}
              key={vote.id}
              buttons={[
                <ListButton
                  onClick={() =>
                    openChartModal(`Resultat av "${vote.question}"`, {
                      voteId: vote.id,
                    })
                  }
                  iconComponent={FiBarChart2}
                  text="Resultat"
                  key="results"
                />,
                <ListButton
                  onClick={() =>
                    openCreateModal(`Uppdatera "${vote.question}"`, {
                      currentMeeting,
                      update,
                      updateData: vote,
                    })
                  }
                  iconComponent={FiEdit2}
                  text="Uppdatera omröstning"
                  key="update"
                />,
              ]}
            />
          ))}
      </List>
    </div>
  )
}

export default VotePanel
