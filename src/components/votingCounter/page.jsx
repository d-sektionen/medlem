import { useEffect, useState } from "react";
import useSWR from "swr";
import BigPixels from "../layout/bigPixels";
import { patch } from "../request";
import { GridContainer, GridItem } from "../ui/grid";
import TitleChooser from "../ui/titleChooser";
import usePageContext from "../usePageContext";
import AttendantPanel from "./attendantPanel";
import MeetingPanel from "./meetingPanel";
import VotePanel from "./votePanel";

const VotingAdminPage = () => {
  const { title } = usePageContext();

  const [currentMeeting, setCurrentMeeting] = useState(null);
  const { data: unorderedMeetings, mutate } = useSWR("/voting/admin-meetings/");

  const updatePatch = async (data) => {
    const { data: updatedMeeting } = await patch(
      `/voting/admin-meetings/${currentMeeting.id}/`,
      data,
    );
    mutate([
      ...unorderedMeetings.filter(
        (meeting) => meeting.id !== currentMeeting.id,
      ),
      updatedMeeting,
    ]);
  };

  const meetings = unorderedMeetings ? [...unorderedMeetings].reverse() : null;

  // re-point the selection at the freshly fetched meeting (or clear it if it is gone)
  useEffect(() => {
    setCurrentMeeting(
      (selected) =>
        unorderedMeetings?.find(({ id }) => id === selected?.id) ?? null,
    );
  }, [unorderedMeetings]);

  return (
    <BigPixels>
      <GridContainer>
        <GridItem fullWidth>
          <TitleChooser
            title={title}
            choice={currentMeeting}
            setChoice={setCurrentMeeting}
            choices={meetings}
            label="name"
            hintLabel="Välj ett möte"
            noChoicesLabel="Det finns inga möten just nu."
          />
        </GridItem>
        {currentMeeting && (
          <>
            <GridItem>
              <MeetingPanel
                currentMeeting={currentMeeting}
                updatePatch={updatePatch}
              />
            </GridItem>
            <GridItem>
              <VotePanel currentMeeting={currentMeeting} />
            </GridItem>
            <GridItem>
              <AttendantPanel currentMeeting={currentMeeting} />
            </GridItem>
          </>
        )}
      </GridContainer>
    </BigPixels>
  );
};

export default VotingAdminPage;
