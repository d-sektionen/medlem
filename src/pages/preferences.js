import React from 'react'
import { UserContext, LoadingContext } from '../components/layout'
import Preferences from '../components/preferences'
import Content from '../components/content'

const PreferencesPage = () => (
  <LoadingContext.Consumer>
    {loading => (
      <UserContext.Consumer>
        {({ user, set }) => (
          <Content>
            <Preferences user={user} setUser={set} setLoading={loading.set} />
          </Content>
        )}
      </UserContext.Consumer>
    )}
  </LoadingContext.Consumer>
)

export default PreferencesPage
