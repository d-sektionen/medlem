import React, { useContext } from 'react'
import { UserContext } from '../components/layout'
import Content from '../components/content'
import { useEndpoint } from '../components/request'

const IndexPage = () => {
  const [data] = useEndpoint({
    url: 'https://d-sektionen.se/wp-json/wp/v2/posts',
  })
  const { user } = useContext(UserContext)

  const greeting = user.first_name ? `Hej ${user.first_name}!` : 'Hej!'

  return (
    <Content>
      <h1>{greeting}</h1>
      <p>
        Välkommen till D-sektionens medlemssida. I sidomenyn finns våra tjänster
        för medlemmar.
      </p>
      <h2>
        {'Senaste nytt från '}
        <a href="https://d-sektionen.se">d-sektionen.se</a>
      </h2>
      <ul>
        {data &&
          data.map(post => (
            <li>
              <a href={post.link}>{post.title.rendered}</a>
            </li>
          ))}
      </ul>
    </Content>
  )
}

export default IndexPage
