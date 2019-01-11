import React from 'react'
import { LoadingContext } from '../components/layout'
import Vote from '../components/vote/'

const PreferencesPage = () => (
  <LoadingContext.Consumer>
    {loading => <Vote setLoading={loading.set} />}
  </LoadingContext.Consumer>
)

export default PreferencesPage
