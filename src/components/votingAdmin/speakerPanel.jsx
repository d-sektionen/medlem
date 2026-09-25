import { useCallback, useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import backendService from "../request/backendService";
import socket, { joinRoom, leaveRoom } from "../request/socket";
import { List, ListButton, ListItem } from "../ui/list";

const SpeakerPanel = ({ meeting }) => {
  const [speakers, setSpeakers] = useState([]);

  const handleMeetingChange = useCallback(async () => {
    if (meeting) {
      const resp = await backendService.get(
        `/voting/speakers/?meeting_id=${meeting.id}`,
      );
      setSpeakers(resp.data);
    }
  }, [meeting]);

  const handleNewSpeakerRequest = useCallback(
    (data) => {
      if (data.meeting_id !== meeting.id) {
        return;
      }

      setSpeakers((prev) => {
        if (prev.find((s) => s.id === data.speaker.id)) return prev;
        return [...prev, data.speaker];
      });
    },
    [meeting.id],
  );

  const handleDeleteSpeakerRequest = useCallback(
    (data) => {
      if (data.meeting_id !== meeting.id) {
        return;
      }

      setSpeakers((prev) =>
        prev.filter((s) => s.id !== data.speaker_request_id),
      );
    },
    [meeting.id],
  );

  useEffect(() => {
    handleMeetingChange();
    socket.on("connect", handleMeetingChange);

    joinRoom(`meeting_speaker_${meeting.id}`);

    socket.on("new_speaker_request", handleNewSpeakerRequest);

    socket.on("delete_speaker_request", handleDeleteSpeakerRequest);

    return () => {
      socket.off("connect", handleMeetingChange);
      socket.off("new_speaker_request", handleNewSpeakerRequest);
      socket.off("delete_speaker_request", handleDeleteSpeakerRequest);

      leaveRoom(`meeting_speaker_${meeting.id}`);
    };
  }, [
    meeting,
    handleMeetingChange,
    handleNewSpeakerRequest,
    handleDeleteSpeakerRequest,
  ]);

  async function deleteSpeaker(speakerId) {
    await backendService.delete(`/voting/speakers/${speakerId}`);
  }

  return (
    <div>
      <h2>Talarlista</h2>
      <List maxHeight="260px">
        {speakers?.map((s) => (
          <ListItem
            title={s.user.pretty_name}
            subtitle={s.prioritized ? "Replik" : null}
            key={s.id}
            buttons={[
              <ListButton
                onClick={() => deleteSpeaker(s.id)}
                iconComponent={FiTrash2}
                text="Ta bort från talarlista"
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
