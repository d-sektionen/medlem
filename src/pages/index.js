import React from 'react'
import { UserContext } from '../components/layout'
import Content from '../components/content'
import { Get } from '../components/request'

const IndexPage = () => (
  <UserContext.Consumer>
    {({ user }) => (
      <Content>
        <h1>Hej{user.first_name && ' ' + user.first_name}!</h1>
        <p>
          Välkommen till D-sektionens medlemssida. I sidomenyn finns våra
          tjänster för medlemmar.
        </p>
        <h2>
          Senaste nytt från <a href="https://d-sektionen.se">d-sektionen.se</a>
        </h2>
        <ul>
          <Get url={'https://d-sektionen.se/wp-json/wp/v2/posts'}>
            {data =>
              data.map(post => (
                <li>
                  <a href={post.link}>{post.title.rendered}</a>
                </li>
              ))
            }
          </Get>
        </ul>
      </Content>
    )}
  </UserContext.Consumer>
)

export default IndexPage
