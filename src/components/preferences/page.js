import React, { useContext } from 'react'
import { UserContext, LoadingContext } from '../layout/layout'
import Preferences from './preferences'
import BigPixels from '../layout/bigPixels'
import { GridContainer, GridItem } from '../ui/grid'

const PreferencesPage = ({ pageContext: { title } }) => {
  const setLoading = useContext(LoadingContext)[1]
  const [user, setUser] = useContext(UserContext)
  return (
    <BigPixels>
      <GridContainer>
        <GridItem>
          <Preferences
            user={user}
            setUser={setUser}
            setLoading={setLoading}
            title={title}
          />
        </GridItem>
      </GridContainer>
    </BigPixels>
  )
}

export default PreferencesPage
