import React from 'react'
import { UserContext } from '../components/layout'

const IndexPage = () => (
  <UserContext.Consumer>
    {({ user }) => (
      <div>
        <h1>Hej{user.first_name && ' ' + user.first_name}!</h1>
        <p>Det finns just nu inget vettigt på startsidan.</p>
        <p>Använd sidomenyn, där finns vettiga saker.</p>
      </div>
    )}
  </UserContext.Consumer>
)

export default IndexPage
