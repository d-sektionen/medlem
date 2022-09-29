import React from 'react'
import PropTypes from 'prop-types'

import style from '../../scss/layout.module.scss'

import BigPixels from './bigPixels'
import { GridContainer, GridItem } from '../ui/grid'
import { Button } from '../ui/buttons'

import { get, post } from '../request/index'
import { useState } from 'react'

// The following function are copying from
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
  loggedIn,
  loading,
  error,
  loginUrl,
  hasPrivileges,
}) => {
  const [deviceCode, setDeviceCode] = useState('')
  const [verificationURI, setVerificationURI] = useState('')

  const deviceLogin = 'http://localhost:8000/account/device/'
  const deviceFunc = () => {
    let csrftoken = getCookie('csrftoken')
    console.log(csrftoken)
    const payload = { test: 'test' }
    fetch(deviceLogin, {
      method: 'POST',
      //mode:"no-cors",
      //headers: { "X-CSRFToken": csrftoken },
      //credentials: 'omit'
    })
      .then(res => res.json())
      .then(js => {
        console.log(js)
        setDeviceCode(js['device_code'])
        setVerificationURI(js['verification_uri_complete'])
      })
  }

  const deviceFuncLogin = () => {
    let csrftoken = getCookie('csrftoken')
    console.log(deviceCode)
    console.log(verificationURI)

    fetch(deviceLogin, {
      method: 'POST',
      headers: { 'X-CSRFToken': csrftoken },
      body: JSON.stringify(payload),
      credentials: 'omit',
    })
      .then(res => res.json())
      .then(js => {
        console.log(js)
        window.localStorage.setItem('token', js['code']['access_token'])
      })
  }

  const fetchMe = () => {
    let csrftoken = getCookie('csrftoken')
    console.log(deviceCode)
    console.log(verificationURI)
    const payload = { device_code: deviceCode, test: 123 }

    fetch(deviceLogin, {
      method: 'POST',
      headers: { 'X-CSRFToken': csrftoken },
      body: JSON.stringify(payload),
      credentials: 'omit',
    })
      .then(res => res.json())
      .then(js => {
        console.log(js)
      })
  }

  return (
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
                  {/* För utveckling, när adfs inte kan redir till localhost */}
                  <p>
                    <Button onClick={deviceFunc}>Get Device id</Button>
                  </p>
                  <p>
                    <Button href={verificationURI} onClick={deviceFuncLogin}>
                      Device id Login
                    </Button>
                  </p>
                </>
              )}
            </GridItem>
          </GridContainer>
        </BigPixels>
      )}
    </div>
  )
}

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
