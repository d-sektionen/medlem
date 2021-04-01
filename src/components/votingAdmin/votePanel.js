import React, { useEffect } from 'react'
import useSWR from 'swr'
import { FiBarChart2, FiEdit2 } from 'react-icons/fi'

import useModal, { useCloseModal } from '../modal/useModal'
import useConfirmModal from '../modal/useConfirmModal'
import AddVote from './addVote'
import VoteStats from './voteStats'
import { List, ListItem, ListButton } from '../ui/list'
import { Button } from '../ui/buttons'
import { post, put } from '../request'

const VotePanel = ({ currentMeeting }) => {
  const { data: votes, mutate } = useSWR(
    `/voting/admin-votes/?event_id=${currentMeeting.id}`
  )

  const create = async data => {
    const { data: newVote } = await post('/voting/admin-votes/', data)
    mutate([...votes, newVote])
    return newVote
  }

  const update = async (id, data) => {
    const { data: updatedVote } = await put(`/voting/admin-votes/${id}/`, data)
    mutate([...votes.filter(v => v.id !== id), updatedVote])
    return updatedVote
  }

  const open = async vote => {
    await closeModal()
    openChartModal(`Resultat av "${vote.question}"`, {
      voteId: vote.id,
    })
  }

  const [openCreateModal] = useModal(AddVote)
  const [openChartModal] = useModal(VoteStats)
  const closeModal = useCloseModal()
  const [confirmModal] = useConfirmModal()

  // Close modal when a vote is created
  useEffect(closeModal, [votes])

  // if (votes === null) return <></>

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
        {votes &&
          votes
            .filter(vote => vote.meeting === currentMeeting.id)
            .map(vote => (
              <ListItem
                title={vote.question}
                subtitle={vote.open ? 'Active' : undefined}
                key={vote.id}
                buttons={[
                  <ListButton
                    onClick={() =>
                      confirmModal(
                        `Vill du se resultatet?`,
                        () => {
                          open(vote)
                        },
                        closeModal
                      )
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
