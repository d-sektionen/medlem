import React, { useState } from "react";
import { FiEdit, FiInfo, FiTrash2 } from "react-icons/fi";
import useSWR from "swr";
import BigPixels from "./layout/bigPixels";
import { GridContainer, GridItem } from "./ui/grid";
import { List, ListButton, ListItem } from "./ui/list";
import usePageContext from "./usePageContext";

const KeylogPage = () => {
  const { title } = usePageContext();

  const { data: keys } = useSWR("/keylog/keys/");

  //console.log("====================");
  //console.log(props);

  //return("hej");

  return (
    <BigPixels>
      <GridContainer>
        <GridItem>
          <h1>{title}</h1>

          {keys && (
            <List>
              {keys.map((key) => (
                <ListItem
                  title={key.name}
                  subtitle={
                    key.status
                      ? `Upptagen (${key.status.taken_by.pretty_name})`
                      : "Tillgänglig"
                  }
                  buttons={[
                    <ListButton
                      iconComponent={FiInfo}
                      text="Mer information"
                      onClick={() => {}}
                      key="infobutton"
                    />,
                  ]}
                  key={key.id}
                  color={key.color}
                />
              ))}
            </List>
          )}
        </GridItem>
      </GridContainer>
    </BigPixels>
  );
};

export default KeylogPage;
