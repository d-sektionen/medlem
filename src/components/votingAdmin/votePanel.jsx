import { FiBarChart2, FiTrash2 } from "react-icons/fi";
import useSWR from "swr";
import useConfirmModal from "../modal/useConfirmModal";
import useModal, { useCloseModal } from "../modal/useModal";
import { del, post } from "../request";
import { Button } from "../ui/buttons";
import { List, ListButton, ListItem } from "../ui/list";
import AddVote from "./addVote";
import VoteStats from "./voteStats";
import {newVoteButtonContainer} from "./votePanel.module.css";

const VotePanel = ({ currentMeeting }) => {
  const { data: votes, mutate } = useSWR(
    `/voting/admin-votes/?event_id=${currentMeeting.id}`,
  );

  const closeModal = useCloseModal();

  const create = async (data) => {
    const { data: newVote } = await post("/voting/admin-votes/", data);
    mutate([...votes, newVote]);
    closeModal();
    return newVote;
  };

  const open = async (vote) => {
    // Defer opening until Confirmation's trailing close() has completed, so it doesn't immediately close the new modal.
    await closeModal();
    openChartModal(`Resultat av "${vote.question}"`, {
      voteId: vote.id,
    });
  };

  const [openCreateModal] = useModal(AddVote);
  const [openChartModal] = useModal(VoteStats);
  const [confirmModal] = useConfirmModal();

  return (
    <div>
      <h2>Omröstningar</h2>
      <div className={newVoteButtonContainer}>
        <Button
          onClick={() =>
            openCreateModal("Ny omröstning", {
              currentMeeting,
              create,
            })
          }
        >
          Ny omröstning
        </Button>
      </div>
      <List maxHeight="268px">
        {votes
          ?.filter((vote) => vote.meeting === currentMeeting.id)
          .map((vote) => (
            <ListItem
              title={vote.question}
              subtitle={vote.open ? "Active" : undefined}
              key={vote.id}
              buttons={[
                <ListButton
                  onClick={() =>
                    confirmModal(
                      `Vill du ta bort omröstningen?`,
                      async () => {
                        await del(`/voting/admin-votes/${vote.id}`, {
                          params: {
                            meeting_id: currentMeeting.id,
                            vote_id: vote.id,
                          },
                        });

                        mutate([]);
                      },
                      closeModal,
                    )
                  }
                  iconComponent={FiTrash2}
                  text="Ta bort"
                  key="remove"
                />,
                <ListButton
                  onClick={() =>
                    confirmModal(
                      `Vill du se resultatet?`,
                      () => {
                        open(vote);
                      },
                      closeModal,
                    )
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
