import React, { useEffect } from 'react'
import useSWR from 'swr'
import { FiBarChart2, FiEdit2 } from 'react-icons/fi'

import useModal, { useCloseModal } from '../modal/useModal'
import VoteStats from '../votingAdmin/voteStats'
import { List, ListItem, ListButton } from '../ui/list'

const VotePanel = ({ currentMeeting }) => {
  const { data: votes } = useSWR(
    `/voting/admin-votes/?event_id=${currentMeeting.id}`
  )

  const [openChartModal] = useModal(VoteStats)
  const closeModal = useCloseModal()

  // Close modal when a vote is created
  useEffect(closeModal, [votes])

  // if (votes === null) return <></>

  return (
    <div>
      <h2>Omröstningar</h2>
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
                      openChartModal(`Resultat av "${vote.question}"`, {
                        currentMeeting,
                        voteId: vote.id,
                      })
                    }
                    iconComponent={FiBarChart2}
                    text="Resultat"
                    key="results"
                  />,
                ]}
              />
            ))}
      </List>
    </div>
  )
}

export default VotePanel
