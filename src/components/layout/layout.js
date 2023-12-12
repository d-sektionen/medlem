import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { SWRConfig } from 'swr'

import { get } from '../request'
import '../../scss/general.scss'
import style from '../../scss/layout.module.scss'

import SideMenu from './sideMenu'

import TopBar from './topBar'
import { BASE_URL, TITLE } from '../../config'
import ModalHandler from '../modal/modalHandler'
import LayoutContent from './layoutContent'
import { Button } from '../ui/buttons'

import DsektionSnowfall from '../celebration/snowfall'
import DsektionHappyBirthday from '../celebration/happybirthday'

export const LoadingContext = React.createContext({
  status: true,
  set: () => {},
})
export const UserContext = React.createContext({ user: null, set: () => {} })

const Layout = ({ children, location, pageContext }) => {
  const [loginUrl, setLoginUrl] = useState('')
  const [sideMenuOpen, setSideMenuOpen] = useState(false)
  const [error, setError] = useState(null)

  const loadingContextValue = useState(true)
  const [loading, setLoading] = loadingContextValue
  const userContextValue = useState(null)
  const [user, setUser] = userContextValue

  useEffect(() => {
    // this needs to be state, otherwise the build version will use the undefined href from SSR.
    const { origin, pathname } = location
    setLoginUrl(`${BASE_URL}/account/token?redirect=${origin}${pathname}`)

    // Delete the foo parameter.
  }, [location])

  useEffect(() => {
    ;(async () => {
      if (!window.localStorage.getItem('token')) {
        setLoading(false)
        return
      }
      setLoading(true)

      try {
        const { data } = await get('/account/me/')
        setLoading(false)
        setUser(data)
        setError(null)
      } catch (err) {
        setLoading(false)
        setUser(null)

        if (!err.response)
          setError(
            <>
              <p>Kommunikation med servern kunde inte etableras.</p>
              <Button onClick={() => window.location.reload()}>
                Ladda om sidan
              </Button>
            </>
          )
        else if (err.response.status === 401) {
          window.localStorage.removeItem('token')
        }
      }
    })()
  }, [])

  return (
    <LoadingContext.Provider value={loadingContextValue}>
      <UserContext.Provider value={userContextValue}>
        <SWRConfig
          value={{
            refreshInterval: 20000,
            fetcher: url => get(url).then(res => res.data),
          }}
        >
          <Helmet
            title={`${pageContext.title} – ${TITLE}`}
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
          <div className={style.app}>
            <DsektionSnowfall
              snowflakeCountDayIncrement={15}
              snowflakeCountBase={100}
              dsektionSnowflakeCountBase={20}
            />
            <DsektionHappyBirthday />
            <ModalHandler>
              <div className={style.containerWrapper}>
                {user && (
                  <SideMenu
                    open={sideMenuOpen}
                    close={() => setSideMenuOpen(false)}
                  />
                )}
                {user && (
                  <TopBar user={user} openMenu={() => setSideMenuOpen(true)} />
                )}
                <LayoutContent
                  loginUrl={loginUrl}
                  error={error}
                  loading={loading}
                  loggedIn={user !== null}
                  hasPrivileges={
                    pageContext.requiredPrivileges &&
                    user &&
                    user.privileges[pageContext.requiredPrivileges]
                  }
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
