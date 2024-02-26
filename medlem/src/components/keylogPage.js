import React, { useState } from 'react'
import BigPixels from './layout/bigPixels'
import { GridContainer, GridItem } from './ui/grid'
import useSWR from 'swr'

import { List, ListItem, ListButton } from './ui/list'

import { FiTrash2, FiInfo, FiEdit } from 'react-icons/fi'

const KeylogPage = ({ pageContext }) => {
  const { data: keys } = useSWR('/keylog/keys/')

  //console.log("====================");
  //console.log(props);

  //return("hej");

  return (
    <BigPixels>
      <GridContainer>
        <GridItem>
          <h1>{pageContext.title}</h1>

          {keys && (
            <List>
              {keys.map(key => (
                <ListItem
                  title={key.name}
                  subtitle={
                    key.status
                      ? `Upptagen (${key.status.taken_by.pretty_name})`
                      : 'Tillgänglig'
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
  )
}

export default KeylogPage
