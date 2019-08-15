import React, { useContext } from 'react'
import { UserContext } from './layout/layout'
import { useEndpoint } from './request'
import BigPixels from './layout/bigPixels'
import { GridContainer, GridItem } from './ui/grid'

const IndexPage = () => {
  const [data] = useEndpoint({
    url: 'https://d-sektionen.se/wp-json/wp/v2/posts',
  })
  const [user] = useContext(UserContext)

  const greeting = user.first_name ? `Hej ${user.first_name}!` : 'Hej!'

  return (
    <BigPixels>
      <GridContainer>
        <GridItem>
          <h1>{greeting}</h1>
          <p>
            Välkommen till D-sektionens medlemssida. I sidomenyn finns våra
            tjänster för medlemmar.
          </p>
          <h2>
            {'Senaste nytt från '}
            <a href="https://d-sektionen.se">d-sektionen.se</a>
          </h2>
          <ul>
            {data &&
              data.map(post => (
                <li key={post.id}>
                  <a href={post.link}>{post.title.rendered}</a>
                </li>
              ))}
          </ul>
        </GridItem>
      </GridContainer>
    </BigPixels>
  )
}

export default IndexPage
