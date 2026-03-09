import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { contentWrapper } from '../../scss/layout.module.scss'

import BigPixels from './bigPixels'
import { GridContainer, GridItem } from '../ui/grid'
import { Button } from '../ui/buttons'
import SideMenu from './sideMenu'
import TopBar from './topBar'
import LoginPage from './loginPage'
import BackendService, {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '../request/backendService'

const LayoutContent = ({
  children,
  userContextValue,
  loadingContextValue,
  pageContext,
}) => {
  const [user, setUser] = userContextValue
  const [loading, setLoading] = loadingContextValue
  const [sideMenuOpen, setSideMenuOpen] = useState(false)
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY)
    setToken(storedToken)
  }, [])

  const requiredPrivileges = pageContext.requiredPrivileges
  const [hasPrivileges, setHasPrivileges] = useState(false)

  function handlePageChange() {
    setHasPrivileges(
      requiredPrivileges == undefined || user?.privileges[requiredPrivileges]
    )
  }
  useEffect(handlePrivilegeChange, [user, requiredPrivileges])

  function handlePrivilegeChange() {
    setHasPrivileges(
      requiredPrivileges == undefined || user?.privileges[requiredPrivileges]
    )
  }
  useEffect(handlePageChange, [pageContext])

  const loggedIn = user !== null

  async function getUser() {
    try {
      const { data } = await BackendService.get('/account/me/')
      setUser(data)
      setError(null)
    } catch (err) {
      setUser(null)
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      setToken(null)

      if (!err.response) {
        setError(
          <>
            <p>Kommunikation med servern kunde inte etableras.</p>
            <Button onClick={() => window.location.reload()}>
              Ladda om sidan
            </Button>
          </>
        )
      }
    }
  }

  function handleToken() {
    setLoading(true)

    const urlParams = new URLSearchParams(window.location.search)

    const accessToken = urlParams.get(ACCESS_TOKEN_KEY)
    const refreshToken = urlParams.get(REFRESH_TOKEN_KEY)

    if (accessToken) {
      // Save tokens retrieved from backend
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
      setToken(accessToken)

      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)

      // Edit history to remove reference of tokens in url.
      window.history.replaceState(
        window.history.state,
        window.history.pageTitle,
        window.location.pathname
      )
    }

    const hasTokens = localStorage.getItem(ACCESS_TOKEN_KEY) !== null // && localStorage.getItem(REFRESH_TOKEN_KEY) !== null

    if (hasTokens) {
      getUser()
    } else {
      setUser(null)
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      //localStorage.removeItem(REFRESH_TOKEN_KEY)
      //TODO:
    }

    setLoading(false)
  }

  useEffect(handleToken, [token])

  // Page is loading
  if (loading) {
    return <BigPixels />
  }

  return (
    <>
      {user && (
        <>
          <SideMenu open={sideMenuOpen} close={() => setSideMenuOpen(false)} />
          <TopBar user={user} openMenu={() => setSideMenuOpen(true)} />
        </>
      )}
      <div className={contentWrapper}>
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
        {/* Login error */}
        {!loggedIn && error && (
          <BigPixels>
            <GridContainer>
              <GridItem>{error}</GridItem>
            </GridContainer>
          </BigPixels>
        )}
        {/* Display login page */}
        {!loggedIn && !error && <LoginPage></LoginPage>}
      </div>
    </>
  )
}

LayoutContent.propTypes = {
  children: PropTypes.node.isRequired,
  userContextValue: PropTypes.array.isRequired,
  loadingContextValue: PropTypes.array.isRequired,
  pageContext: PropTypes.object.isRequired,
}

export default LayoutContent
