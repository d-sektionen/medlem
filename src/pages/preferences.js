import React, { useContext } from 'react'
import { UserContext, LoadingContext } from '../components/layout'
import Preferences from '../components/preferences'
import BigPixels from '../components/bigPixels'
import { GridContainer, GridItem } from '../components/ui/grid'

const PreferencesPage = () => {
  const setLoading = useContext(LoadingContext)[1]
  const [user, setUser] = useContext(UserContext)
  return (
    <BigPixels>
      <GridContainer>
        <GridItem>
          <Preferences user={user} setUser={setUser} setLoading={setLoading} />
        </GridItem>
      </GridContainer>
    </BigPixels>
  )
}

export default PreferencesPage
