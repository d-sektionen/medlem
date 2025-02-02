import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { SWRConfig } from 'swr'

import { get } from '../request'
import '../../scss/general.scss'
import { app, containerWrapper } from '../../scss/layout.module.scss'

import { TITLE } from '../../config'
import ModalHandler from '../modal/modalHandler'
import LayoutContent from './layoutContent'

import DsektionSnowfall from '../christmas/snowfall'

export const LoadingContext = React.createContext({
  status: true,
  set: () => {},
})
export const UserContext = React.createContext({ user: null, set: () => {} })

const Layout = ({ children, pageContext }) => {
  const loadingContextValue = useState(true)
  const userContextValue = useState(null)

  return (
    <LoadingContext.Provider value={loadingContextValue}>
      <UserContext.Provider value={userContextValue}>
        <SWRConfig
          value={{
            refreshInterval: 20000,
            fetcher: (url) => get(url).then((res) => res.data),
          }}
        >
          <Helmet
            title={`${pageContext.title} - ${TITLE}`}
            meta={[
              {
                name: 'description',
                content: `${pageContext.title} på Datateknologsektionens medlemsportal`,
              },
              {
                name: 'keywords',
                content: `${pageContext.title}, medlem, d-sektionen, datateknologsektionen`,
              },
            ]}
          >
            <html lang="sv" />
          </Helmet>
          <div className={app}>
            <DsektionSnowfall
              snowflakeCountDayIncrement={25}
              snowflakeCountBase={100}
              dsektionSnowflakeCountBase={20}
            />
            <ModalHandler>
              <div className={containerWrapper}>
                <LayoutContent
                  loadingContextValue={loadingContextValue}
                  userContextValue={userContextValue}
                  pageContext={pageContext}
                >
                  {children}
                </LayoutContent>
              </div>
            </ModalHandler>
          </div>
        </SWRConfig>
      </UserContext.Provider>
    </LoadingContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    origin: PropTypes.string,
    pathname: PropTypes.string,
  }).isRequired,
  pageContext: PropTypes.shape({
    title: PropTypes.string.isRequired,
    requiredPrivileges: PropTypes.string,
  }).isRequired,
}

export default Layout
