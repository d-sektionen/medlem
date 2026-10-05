import { useMemo, useState } from "react";
import useSWR from "swr";
import DoorkeeperPanel from "../checkin/doorkeeperPanel";
import BigPixels from "../layout/bigPixels";
import useModal, { useCloseModal } from "../modal/useModal";
import { patch, post } from "../request";
import { GridContainer, GridItem } from "../ui/grid";
import TitleChooser from "../ui/titleChooser";
import usePageContext from "../usePageContext";
import AddMeeting from "./addMeeting";
import AttendantPanel from "./attendantPanel";
import MeetingPanel from "./meetingPanel";
import SpeakerPanel from "./speakerPanel";
import VotePanel from "./votePanel";

const VotingAdminPage = () => {
  const { title } = usePageContext();

  const [currentMeetingId, setCurrentMeetingId] = useState(null);
  const { data: unorderedMeetings, mutate } = useSWR("/voting/admin-meetings/");
  const [openCreateModal] = useModal(AddMeeting);
  const closeModal = useCloseModal();

  const create = async (data) => {
    const { data: newMeeting } = await post("/voting/admin-meetings/", data);
    mutate([...unorderedMeetings, newMeeting]);
  };

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
            action={() => {
              openCreateModal("Nytt möte", {
                create: async (data) => {
                  await create(data);
                  closeModal();
                },
              });
            }}
            actionLabel="Nytt möte"
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
              <DoorkeeperPanel event={currentMeeting} />
            </GridItem>
            <GridItem>
              <AttendantPanel currentMeeting={currentMeeting} />
            </GridItem>
            <GridItem>
              <SpeakerPanel meeting={currentMeeting} />
            </GridItem>
          </>
        )}
      </GridContainer>
    </BigPixels>
  );
};

export default VotingAdminPage;
