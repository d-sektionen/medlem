import { useMemo, useState } from "react";
import useSWR from "swr";
import BigPixels from "../layout/bigPixels";
import { GridContainer, GridItem } from "../ui/grid";
import TitleChooser from "../ui/titleChooser";
import usePageContext from "../usePageContext";
import MeetingInfoPanel from "./meetingInfoPanel";
import SpeakerPanel from "./speakerPanel";
import {
  currentMeetingContainer,
  othersContainer,
  votePanelContainer,
} from "./votePage.module.css";
import VotePanel from "./votePanel";

export default function VotePage() {
  const { title } = usePageContext();

  const [currentMeetingId, setCurrentMeetingId] = useState(null);
  const { data: meetings, mutate } = useSWR("/voting/meetings/");

  const currentMeeting = useMemo(() => {
    return meetings?.find(({ id }) => id === currentMeetingId) ?? null;
  }, [meetings, currentMeetingId]);

  // Update the fetched meeting list so the derived selection reflects the change
  const setCurrentMeeting = (updatedMeeting) => {
    mutate(
      meetings.map((meeting) =>
        meeting.id === updatedMeeting.id ? updatedMeeting : meeting,
      ),
    );
  };

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
          <div className={currentMeetingContainer}>
            <div className={votePanelContainer}>
              <VotePanel meeting={currentMeeting} />
            </div>
            <div className={othersContainer}>
              <MeetingInfoPanel
                currentMeeting={currentMeeting}
                setCurrentMeeting={setCurrentMeeting}
              />
              <SpeakerPanel meeting={currentMeeting} />
            </div>
          </div>
        )}
      </GridContainer>
    </BigPixels>
  );
}
