import React from 'react'
import { UserContext, LoadingContext } from '../components/layout'
import Preferences from '../components/preferences'
import BigPixels from '../components/bigPixels'
import { GridContainer, GridItem } from '../components/ui/grid'

const PreferencesPage = () => (
  <LoadingContext.Consumer>
    {loading => (
      <UserContext.Consumer>
        {({ user, set }) => (
          <BigPixels>
            <GridContainer>
              <GridItem>
                <Preferences
                  user={user}
                  setUser={set}
                  setLoading={loading.set}
                />
              </GridItem>
            </GridContainer>
          </BigPixels>
        )}
      </UserContext.Consumer>
    )}
  </LoadingContext.Consumer>
)

export default PreferencesPage
