import { useCallback, useEffect, useState } from "react";

import { FiTrash2 } from "react-icons/fi";
import backendService from "../request/backendService";
import socket, { joinRoom, leaveRoom } from "../request/socket";
import { List, ListButton, ListItem } from "../ui/list";

const DoorkeeperPanel = ({ event }) => {
  const [input, setInput] = useState("");
  const [doorkeepers, setDoorkeepers] = useState([]);

  const handleEventChange = useCallback(async () =>  {
    if (event) {
      const resp = await backendService.get(
        `/checkin/doorkeepers/?event_id=${event.id}`,
      );
      setDoorkeepers(resp.data);
    }
  })

  const handleNewDoorkeeper = useCallback((data) => {
    if (data.event.id !== event.id) return;

    setDoorkeepers((prev) => {
      if (prev.find((d) => d.id === data.id)) return prev;
      return [...prev, data];
    });
  });

  const handleDeleteDoorkeeper = useCallback((data) => {
    if (data.event.id !== event.id) return;

    setDoorkeepers((prev) => prev.filter((d) => d.id !== data.doorkeeper_id));
  });

  useEffect(() => {
    handleEventChange();

    socket.on("connect", handleEventChange);

    joinRoom(`event_doorkeepers_${event.id}`);

    socket.on("new_doorkeeper", handleNewDoorkeeper);

    socket.on("delete_doorkeeper", handleDeleteDoorkeeper);

    return () => {
      socket.off("connect", handleEventChange);
      socket.off("new_doorkeeper", handleNewDoorkeeper);
      socket.off("delete_doorkeeper", handleDeleteDoorkeeper);
      leaveRoom(`event_doorkeepers_${event.id}`);
    };
  }, [event.id, handleEventChange, handleNewDoorkeeper, handleDeleteDoorkeeper]);

  async function create(data) {
    await backendService.post("/checkin/doorkeepers/", data);
  }

  async function destroy(id) {
    await backendService.delete(`/checkin/doorkeepers/${id}/`);
  }

  return (
    <div>
      <h2>Dörrvakter</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setInput("");

          create({
            user_username: input,
            event_id: event.id,
          });
        }}
      >
        <input
          value={input}
          placeholder="LiU-ID"
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <List>
        {doorkeepers?.map((doorkeeper) => (
            <ListItem
              title={doorkeeper.user.pretty_name}
              key={doorkeeper.id}
              buttons={[
                <ListButton
                  onClick={() => destroy(doorkeeper.id)}
                  iconComponent={FiTrash2}
                  text="Ta bort dörrvakt"
                  key="remove"
                />,
              ]}
            />
          ))}
      </List>
    </div>
  );
};

export default DoorkeeperPanel;
