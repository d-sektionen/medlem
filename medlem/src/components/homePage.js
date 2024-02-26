import React, { useContext } from 'react'
import useSWR from 'swr'
import { FiLink, FiExternalLink } from 'react-icons/fi'

import { UserContext } from './layout/layout'
import BigPixels from './layout/bigPixels'
import { GridContainer, GridItem } from './ui/grid'
import MembershipPanel from './membershipPanel'
import { List, ListButton, ListItem } from './ui/list'

const IndexPage = () => {
  const { data } = useSWR(
    'https://d-sektionen.se/wp-json/wp/v2/posts?per_page=6'
  )
  const [user] = useContext(UserContext)

  const greeting = user.first_name ? `Hej ${user.first_name}!` : 'Hej!'

  return (
    <BigPixels>
      <GridContainer>
        {!user.membership && (
          <GridItem>
            <MembershipPanel />
          </GridItem>
        )}
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
          <List>
            {data &&
              data.map(post => (
                <ListItem
                  key={post.id}
                  title={post.title.rendered}
                  subtitle={new Date(post.date).toLocaleDateString()}
                  buttons={[
                    <ListButton
                      key="link"
                      text="Läs mer"
                      iconComponent={FiExternalLink}
                      href={post.link}
                    />,
                  ]}
                />
              ))}
          </List>
        </GridItem>
      </GridContainer>
    </BigPixels>
  )
}

export default IndexPage
