import { useMemo, useState } from "react";
import useSWR from "swr";

import BigPixels from "../layout/bigPixels";
import { GridContainer, GridItem } from "../ui/grid";
import TitleChooser from "../ui/titleChooser";
import usePageContext from "../usePageContext";
import MeetingInfoPanel from "./meetingInfoPanel";
import SpeakerPanel from "./speakerPanel";

//import { get } from '../request'

const VotePage = () => {
  const { title } = usePageContext();

  const [currentMeetingId, setCurrentMeetingId] = useState(null);
  const { data: meetings } = useSWR("/voting/guest-meetings/");

  const currentMeeting = useMemo(() => {
    return meetings?.find(({ id }) => id === currentMeetingId) ?? null;
  }, [meetings, currentMeetingId]);

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
            noChoicesLabel="Det finns inga möten tillgängliga just nu. Du kan bara se möten du blivit inbjuden till."
          />
        </GridItem>
        {currentMeeting && (
          <>
            <GridItem>
              <MeetingInfoPanel currentMeeting={currentMeeting} />
            </GridItem>

            {/* {currentMeeting.enable_speaker_requests && ( */}
            <GridItem>
              <SpeakerPanel meeting={currentMeeting} />
            </GridItem>
            {/* )} */}
          </>
        )}
      </GridContainer>
    </BigPixels>
  );
};
export default VotePage;
