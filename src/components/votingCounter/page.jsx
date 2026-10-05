import { useMemo, useState } from "react";
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

  const [currentMeetingId, setCurrentMeetingId] = useState(null);
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

  const currentMeeting = useMemo(() => {
    return unorderedMeetings?.find(({ id }) => id === currentMeetingId) ?? null;
  }, [unorderedMeetings, currentMeetingId]);

  return (
    <BigPixels>
      <GridContainer>
        <GridItem fullWidth>
          <TitleChooser
            title={title}
            choice={currentMeeting}
            setChoice={(meeting) => setCurrentMeetingId(meeting.id)}
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
