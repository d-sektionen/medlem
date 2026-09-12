import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import {
  currentMeetingContainer,
  othersContainer,
  votePanelContainer,
} from "../../scss/votePage.module.scss";
import BigPixels from "../layout/bigPixels";
import { GridContainer, GridItem } from "../ui/grid";
import TitleChooser from "../ui/titleChooser";
import usePageContext from "../usePageContext";
import MeetingInfoPanel from "./meetingInfoPanel";
import SpeakerPanel from "./speakerPanel";
import VotePanel from "./votePanel";

export default function VotePage() {
  const { title } = usePageContext();

  const [currentMeeting, setCurrentMeeting] = useState(null);
  const { data: meetings } = useSWR("/voting/meetings/");

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
