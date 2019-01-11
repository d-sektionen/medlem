import React from 'react'
import { UserContext, LoadingContext } from '../components/layout'
import Preferences from '../components/preferences'

const PreferencesPage = () => (
  <LoadingContext.Consumer>
    {loading => (
      <UserContext.Consumer>
        {({ user, set }) => (
          <Preferences user={user} setUser={set} setLoading={loading.set} />
        )}
      </UserContext.Consumer>
    )}
  </LoadingContext.Consumer>
)

export default PreferencesPage
