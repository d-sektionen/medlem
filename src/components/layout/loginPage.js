import React from 'react'
import BigPixels from './bigPixels'
import { GridContainer, GridItem } from '../ui/grid'

import { Button } from '../ui/buttons'
import { BASE_URL } from '../../config'

const loginPage = () => {
  const loginHandler = () => {
    const callbackUrl = `${window.location.href}`
    const targetUrl = `${BASE_URL}/oauth2/login?next=${callbackUrl}`
    window.location.replace(targetUrl)
  }

  return (
    <BigPixels>
      <GridContainer>
        <GridItem>
          <h1>Logga in</h1>
          <p>
            Genom att logga in här kan du komma åt D-sektionens medlemstjänster,
            inloggningen sker via LiUs centrala inloggningssystem.
          </p>
          <p>
            {`Genom att logga in godkänner du att dina personuppgifter hanteras i
            enlighet med `}
            <a href="https://d-sektionen.se/wp-content/uploads/2018/05/Policy-datahantering-D-sektionen.pdf">
              D-sektionens datahanteringspolicy
            </a>
            .
          </p>
          <p>
            <Button onClick={loginHandler}>Logga in med LiU-ID</Button>
          </p>
          <div
            style={{
              marginTop: '1.5rem',
              borderTop: '1px solid white',
            }}
          >
            <p>
              Se videon nedan för att se hur man blir medlem. <br />
              Det kan ta några dagar innan Webmaster har accepterat din ansökan.
            </p>
            <iframe
              title="Youtube player"
              width="300"
              height="300"
              src="https://www.youtube.com/embed/ppY8vcrYmKQ"
              allowFullScreen="1"
              style={{
                width: '50rem',
                maxWidth: '100%',
                height: '30rem',
                maxHeight: '100%',
                border: 'none',
                display: 'block',
                marginBottom: 0,
              }}
            />
          </div>
        </GridItem>
      </GridContainer>
    </BigPixels>
  )
}

export default loginPage
