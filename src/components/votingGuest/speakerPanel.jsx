import { useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import useSWR from "swr";
import { UserContext } from "../layout/layout";
import { del, post } from "../request";
import { Button, ButtonGroup } from "../ui/buttons";
import { List, ListButton, ListItem } from "../ui/list";

const SpeakerPanel = ({ meeting }) => {
  const { data: speakers, mutate } = useSWR(
    () => meeting && `/voting/speakers/?meeting_id=${meeting.id}`,
  );

  const [user] = useContext(UserContext);

  const errorMessage = meeting.attending
    ? "Talarlista är inaktiverad för mötet."
    : "Du måste vara registrerad på mötet för att kunna skriva upp dig på talarlistan.";

  return (
    <div>
      <h2>Talarlista</h2>
      {meeting.attending && meeting.enable_speaker_requests ? (
        <ButtonGroup>
          <Button
            onClick={async () => {
              const { data: newSpeaker } = await post("/voting/speakers/", {
                meeting_id: meeting.id,
              });
              mutate([...speakers, newSpeaker]);
            }}
          >
            Jag vill tala!
          </Button>
          <Button
            onClick={async () => {
              const { data: newSpeaker } = await post("/voting/speakers/", {
                meeting_id: meeting.id,
                prioritized: true,
              });
              mutate([...speakers, newSpeaker]);
            }}
          >
            Replik!
          </Button>
        </ButtonGroup>
      ) : (
        <p>{errorMessage}</p>
      )}
      <List>
        {speakers?.map((speaker, i) => (
          <ListItem
            title={speaker?.user?.pretty_name}
            subtitle={speaker.prioritized ? "Replik" : null}
            key={`speaker-${speaker.id}` ?? `index-${i}`}
            buttons={[
              <ListButton
                shown={user?.id === speaker?.user?.id}
                onClick={async () => {
                  const prioQS = speaker.prioritized ? "&prioritized" : "";
                  await del(
                    `/voting/speakers/?meeting_id=${meeting.id}${prioQS}`,
                  );
                  mutate(speakers.filter((x) => x.id !== speaker.id));
                }}
                iconComponent={FiTrash2}
                text="Lämna talarlista"
                key="remove"
              />,
            ]}
          />
        ))}
      </List>
    </div>
  );
};

export default SpeakerPanel;
