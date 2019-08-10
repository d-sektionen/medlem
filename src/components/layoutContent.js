import React from 'react'
import PropTypes from 'prop-types'

import '../scss/general.scss'
import style from '../scss/layout.module.scss'

import BigPixels from './bigPixels'
import { GridContainer, GridItem } from './ui/grid'

const LayoutContent = ({ children, loggedIn, loading, error, loginUrl }) => (
  <div className={style.contentWrapper}>
    {loggedIn && children}
    {!loggedIn && loading && <BigPixels />}
    {!loggedIn && !loading && (
      <BigPixels>
        <GridContainer>
          <GridItem>
            {error}
            {!error && (
              <>
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
                <a href={loginUrl} className="button">
                  Logga in
                </a>
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
}

LayoutContent.propTypes = {
  children: PropTypes.node.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.node,
  loginUrl: PropTypes.string.isRequired,
}

export default LayoutContent
