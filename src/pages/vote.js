import React from 'react'
import { LoadingContext } from '../components/layout'
import Vote from '../components/vote/'
import Content from '../components/content'

const VotePage = () => (
  <LoadingContext.Consumer>
    {loading => (
      <Content>
        <Vote setLoading={loading.set} />
      </Content>
    )}
  </LoadingContext.Consumer>
)

export default VotePage
