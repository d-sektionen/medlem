import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

import { get } from './request'
import '../scss/general.scss'
import style from '../scss/layout.module.scss'

import SideMenu from './sideMenu'

import TopBar from './topBar'
import { BASE_URL } from '../js/config'
import ModalHandler from './modal/modalHandler'
import LayoutContent from './layoutContent'
import { Button } from './ui/buttons'

export const LoadingContext = React.createContext({
  status: false,
  set: () => {},
})
export const UserContext = React.createContext({ user: null, set: () => {} })

const Layout = ({ children, location }) => {
  const [loginUrl, setLoginUrl] = useState('')
  const [sideMenuOpen, setSideMenuOpen] = useState(false)
  const [error, setError] = useState(null)

  const loadingContextValue = useState(false)
  const [loading, setLoading] = loadingContextValue
  const userContextValue = useState(null)
  const [user, setUser] = userContextValue

  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  useEffect(
    () => {
      // this needs to be state, otherwise the build version will use the undefined href from SSR.
      const { origin, pathname } = location
      setLoginUrl(`${BASE_URL}/account/token?redirect=${origin}${pathname}`)

      // Delete the foo parameter.
    },
    [location]
  )

  useEffect(() => {
    if (!window.localStorage.getItem('token')) return

    get('/account/user/me/')
      .then(res => {
        setLoading(false)
        setUser(res.data)
        setError(null)
      })
      .catch(err => {
        setLoading(false)
        setUser(null)

        if (!err.response)
          setError(
            <>
              <p>Kommunikation med servern kunde inte etableras.</p>
              <Button
                onClick={() => {
                  window.location.reload()
                }}
              >
                Ladda om sidan
              </Button>
            </>
          )
        else if (err.response.status === 401) {
          setError(
            <>
              <p>Inloggningssessionen är ogiltig. Testa att logga in igen.</p>
              <Button
                onClick={() => {
                  window.localStorage.removeItem('token')
                  setError(null)
                }}
              >
                Logga ut
              </Button>
            </>
          )
        }
      })
    setLoading(true)
  }, [])

  return (
    <LoadingContext.Provider value={loadingContextValue}>
      <UserContext.Provider value={userContextValue}>
        <Helmet
          title={site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: 'Datateknologsektionens medlemsportal',
            },
            {
              name: 'keywords',
              content: 'medlem, d-sektionen, datateknologsektionen',
            },
          ]}
        >
          <html lang="sv" />
        </Helmet>
        <div className={style.app}>
          <ModalHandler>
            <div className={style.containerWrapper}>
              <SideMenu
                open={sideMenuOpen}
                close={() => setSideMenuOpen(false)}
              />
              <TopBar user={user} openMenu={() => setSideMenuOpen(true)} />
              <LayoutContent
                loginUrl={loginUrl}
                error={error}
                loading={loading}
                loggedIn={user !== null}
              >
                {children}
              </LayoutContent>
            </div>
          </ModalHandler>
        </div>
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
}

export default Layout
