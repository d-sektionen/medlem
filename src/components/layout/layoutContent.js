import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { contentWrapper } from '../../scss/layout.module.scss'

import BigPixels from './bigPixels'
import { GridContainer, GridItem } from '../ui/grid'
import { Button } from '../ui/buttons'
import SideMenu from './sideMenu'
import TopBar from './topBar'
import { get } from '../request'
import { BASE_URL } from '../../config'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../request/backendService'

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

  const hasPrivileges =
    pageContext.requiredPrivileges &&
    user &&
    user.privileges[pageContext.requiredPrivileges]

  const loggedIn = user !== null

  const loginHandler = () => {
    const callbackUrl = `${window.location.href}login`
    const targetUrl = `${BASE_URL}/oauth2/login?next=${callbackUrl}`
    window.location.replace(targetUrl)
  }

  const getUser = async () => {
    try {
      const { data } = await get('/account/me/')
      setUser(data)
      setError(null)
    } catch (err) {
      setUser(null)
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)

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

    const hasTokens =
      localStorage.getItem(ACCESS_TOKEN_KEY) !== null &&
      localStorage.getItem(REFRESH_TOKEN_KEY) !== null

    if (hasTokens) {
      getUser()
    } else {
      setUser(null)
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
    }

    setLoading(false)
  }, [])

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
                      <Button onClick={loginHandler}>
                        Logga in med LiU-ID
                      </Button>
                    </p>
                    <div
                      style={{
                        marginTop: '1.5rem',
                        borderTop: '1px solid white',
                      }}
                    >
                      <p>
                        Se videon nedan för att se hur man blir medlem. <br />
                        Det kan ta några dagar innan Webmaster har accepterat
                        din ansökan.
                      </p>
                      <iframe
                        title="Youtube player"
                        width="300"
                        height="300"
                        src="https://www.youtube.com/embed/ppY8vcrYmKQ"
                        frameBorder="0"
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
                  </>
                )}
              </GridItem>
            </GridContainer>
          </BigPixels>
        )}
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
