import React from 'react'
import PropTypes from 'prop-types'

import style from '../../scss/layout.module.scss'

import BigPixels from './bigPixels'
import { GridContainer, GridItem } from '../ui/grid'
import { Button } from '../ui/buttons'

const LayoutContent = ({
  children,
  loggedIn,
  loading,
  error,
  loginUrl,
  hasPrivileges,
}) => (
  <div className={style.contentWrapper}>
    {/* Display page */}
    {loggedIn && hasPrivileges && children}
    {/* Missing privileges */}
    {loggedIn && !hasPrivileges && (
      <BigPixels>
        <GridContainer>
          <GridItem>
            <p>
              Ditt konto saknar privilegierna att se denna sida. Kontakta
              webmaster om du anser att detta är fel.
            </p>
          </GridItem>
        </GridContainer>
      </BigPixels>
    )}
    {/* Page is loading */}
    {!loggedIn && loading && <BigPixels />}
    {/* Not logged in */}
    {!loggedIn && !loading && (
      <BigPixels>
        <GridContainer>
          <GridItem>
            {error}
            {!error && (
              <>
                <h1>Logga in</h1>
                <p>
                  Genom att logga in här kan du komma åt D&#8209;sektionens
                  medlemstjänster, inloggningen sker via LiUs centrala
                  inloggningssystem.
                </p>
                <p>
                  {`Genom att logga in godkänner du att dina personuppgifter
                  hanteras i enlighet med `}
                  <a href="https://d-sektionen.se/wp-content/uploads/2018/05/Policy-datahantering-D-sektionen.pdf">
                    D&#8209;sektionens datahanteringspolicy
                  </a>
                  .
                </p>
                <p>
                  <Button href={loginUrl}>Logga in med LiU-id</Button>
                </p>
              </>
            )}
          </GridItem>
        </GridContainer>
      </BigPixels>
    )}
  </div>
)

LayoutContent.defaultProps = {
  error: undefined,
  hasPrivileges: true,
}

LayoutContent.propTypes = {
  children: PropTypes.node.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.node,
  loginUrl: PropTypes.string.isRequired,
  hasPrivileges: PropTypes.bool,
}

export default LayoutContent
