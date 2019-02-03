import React from 'react'
import { UserContext } from '../components/layout'
import Content from '../components/content'

const IndexPage = () => (
  <UserContext.Consumer>
    {({ user }) => (
      <Content>
        <h1>Hej{user.first_name && ' ' + user.first_name}!</h1>
        <p>Det finns just nu inget vettigt på startsidan.</p>
        <p>Använd sidomenyn, där finns vettiga saker.</p>
      </Content>
    )}
  </UserContext.Consumer>
)

export default IndexPage
