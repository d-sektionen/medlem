import { FiBarChart2 } from "react-icons/fi";
import useSWR from "swr";

import useModal from "../modal/useModal";
import { List, ListButton, ListItem } from "../ui/list";
import VoteStats from "./voteStats";

const VotePanel = ({ currentMeeting }) => {
  const { data: votes } = useSWR(
    `/voting/admin-votes/?event_id=${currentMeeting.id}`,
  );

  const [openChartModal] = useModal(VoteStats);

  return (
    <div>
      <h2>Omröstningar</h2>
      <List>
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
