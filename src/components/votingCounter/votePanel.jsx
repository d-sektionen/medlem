import React, { useEffect } from "react";
import { FiBarChart2, FiEdit2 } from "react-icons/fi";
import useSWR from "swr";

import useModal, { useCloseModal } from "../modal/useModal";
import { post, put } from "../request";
import { Button } from "../ui/buttons";
import { List, ListButton, ListItem } from "../ui/list";
import VoteStats from "./voteStats";

const VotePanel = ({ currentMeeting }) => {
  const { data: votes, mutate } = useSWR(
    `/voting/admin-votes/?event_id=${currentMeeting.id}`,
  );

  const create = async (data) => {
    const { data: newVote } = await post("/voting/admin-votes/", data);
    mutate([...votes, newVote]);
    return newVote;
  };

  const update = async (id, data) => {
    const { data: updatedVote } = await put(`/voting/admin-votes/${id}/`, data);
    mutate([...votes.filter((v) => v.id !== id), updatedVote]);
    return updatedVote;
  };

  const [openChartModal] = useModal(VoteStats);
  const closeModal = useCloseModal();

  // Close modal when a vote is created
  useEffect(closeModal, [votes]);

  // if (votes === null) return <></>

  return (
    <div>
      <h2>Omröstningar</h2>
      <List>
        {votes &&
          votes
            .filter((vote) => vote.meeting === currentMeeting.id)
            .map((vote) => (
              <ListItem
                title={vote.question}
                subtitle={vote.open ? "Active" : undefined}
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
                ]}
              />
            ))}
      </List>
    </div>
  );
};

export default VotePanel;
