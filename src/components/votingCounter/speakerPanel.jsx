import React, { useContext, useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import useSWR from "swr";
import { UserContext } from "../layout/layout";
import { del, post } from "../request";
import { Button } from "../ui/buttons";
import { List, ListButton, ListItem } from "../ui/list";

const SpeakerPanel = ({ meeting }) => {
  const { data: speakers, mutate } = useSWR(
    () => meeting && `/voting/speakers/?meeting_id=${meeting.id}`,
    { refreshInterval: 4000 },
  );

  return (
    <div>
      <h2>Talarlista</h2>
      <List>
        {speakers &&
          speakers.map((s) => (
            <ListItem
              title={s.user.pretty_name}
              subtitle={s.prioritized ? "Replik" : null}
              key={s.id}
              buttons={[
                <ListButton
                  onClick={async () => {
                    await del(`/voting/speakers/${s.id}`);
                    mutate(speakers.filter((x) => x.id !== s.id));
                  }}
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
