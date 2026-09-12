import React, { useContext, useEffect, useState } from "react";
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

  const [currentMeeting, setCurrentMeeting] = useState(null);
  const { data: meetings } = useSWR("/voting/guest-meetings/");

  // sync currentMeeting with updated meetings
  useEffect(() => {
    if (currentMeeting)
      setCurrentMeeting(meetings.find((m) => m.id === currentMeeting.id));
  }, [meetings]);

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
