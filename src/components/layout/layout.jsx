import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { SWRConfig } from 'swr'

import { get } from '../request'
import '../../scss/general.scss'
import { app, containerWrapper } from '../../scss/layout.module.scss'

import { TITLE } from '../../config'
import ModalHandler from '../modal/modalHandler'
import LayoutContent from './layoutContent'

import DsektionSnowfall from '../christmas/snowfall'
import usePageContext from '../usePageContext'

export const LoadingContext = React.createContext({
  status: true,
  set: () => {},
})
export const UserContext = React.createContext({ user: null, set: () => {} })

const usePageMeta = ({ title }) => {
  useEffect(() => {
    document.title = `${title} - ${TITLE}`
    document.documentElement.lang = 'sv'

    const updateMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', name)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    updateMeta(
      'description',
      `${title} på Datateknologsektionens medlemsportal`
    )
    updateMeta(
      'keywords',
      `${title}, medlem, d-sektionen, datateknologsektionen`
    )
  }, [title])
}

const Layout = ({ children }) => {
  const loadingContextValue = useState(true)
  const userContextValue = useState(null)

  const pageContext = usePageContext()

  usePageMeta({ title: pageContext.title });

  return (
    <LoadingContext.Provider value={loadingContextValue}>
      <UserContext.Provider value={userContextValue}>
        <SWRConfig
          value={{
            refreshInterval: 20000,
            fetcher: (url) => get(url).then((res) => res.data),
          }}
        >
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
}

export default Layout

