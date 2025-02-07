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

// The following function are copyied from
// https://docs.djangoproject.com/en/dev/ref/csrf/#ajax
function getCookie(name) {
  var cookieValue = null
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';')
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim()
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

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

  const requiredPrivileges = pageContext.requiredPrivileges

  const hasPrivileges =
    requiredPrivileges && user && user.privileges[requiredPrivileges]

  const loggedIn = user !== null

  const getUser = async () => {
    try {
      const { data } = await BackendService.get('/account/me/')
      setUser(data)
      setError(null)
    } catch (err) {
      setUser(null)
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      //localStorage.removeItem(REFRESH_TOKEN_KEY)

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

  useEffect(() => {
    setLoading(true)

    const accessTokenRegex = new RegExp(`${ACCESS_TOKEN_KEY}=([^&]+)`)
    //const refreshTokenRegex = new RegExp(`${REFRESH_TOKEN_KEY}=([^&]+)`)
    // Try to find tokens in url.
    const accessTokenMatch = window.location.href.match(accessTokenRegex)
    //const refreshTokenMatch = window.location.href.match(refreshTokenRegex)

    if (accessTokenMatch) {
      // Save tokens retrieved from backend
      localStorage.setItem(ACCESS_TOKEN_KEY, accessTokenMatch[1])
      //localStorage.setItem(REFRESH_TOKEN_KEY, refreshTokenMatch[1])

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
    }

    setLoading(false)
  }, [user])

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

LayoutContent.defaultProps = {
  error: undefined,
  hasPrivileges: true,
}

LayoutContent.propTypes = {
  children: PropTypes.node.isRequired,
  userContextValue: PropTypes.array.isRequired,
  loadingContextValue: PropTypes.array.isRequired,
  pageContext: PropTypes.object.isRequired,
}

export default LayoutContent
