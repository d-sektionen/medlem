import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import style from '../../scss/layout.module.scss'

import BigPixels from './bigPixels'
import { GridContainer, GridItem } from '../ui/grid'
import { Button } from '../ui/buttons'

import { get, post } from '../request/index'
import { useState } from 'react'

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
  loggedIn,
  loading,
  error,
  loginUrl,
  hasPrivileges,
}) => {
  const [deviceCode, setDeviceCode] = useState('')
  const [verificationURI, setVerificationURI] = useState('')

  const deviceLogin = '/account/device/'
  const deviceFunc = () => {
    post(deviceLogin, { credentials: 'omit' })
      .then(res => res.data)
      .then(js => {
        // Set id of requesting device (This user)
        setDeviceCode(js['device_code'])
        // Set verification url (sends user to LiU ADFS login)
        // Code is pre-filled
        setVerificationURI(js['verification_uri_complete'])
      })
  }

  const deviceFuncLogin = () => {
    //let csrftoken = getCookie('csrftoken')

    // Send the device id to our backend
    const payload = { device_code: deviceCode }

    // The backend will send the device id to LiU ADFS
    // LiU ADFS will send the user to our backend
    // Our backend will send the access token to the user (the response to this)
    post(deviceLogin, JSON.stringify(payload), {
      //headers: { 'X-CSRFToken': csrftoken },
      credentials: 'omit',
    })
      .then(res => res.data)
      .then(js => {
        // Save the accesstoken recieved from the server
        window.localStorage.setItem('token', js['code']['access_token'])
        window.location.reload(true)
      })
  }

  useEffect(() => {
    deviceFunc()
  }, [])

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
                  {/* <p>
                    <Button href={loginUrl}>Logga in med LiU-id</Button>
                  </p> */}
                  {/* För utveckling, när adfs inte kan redir till localhost */}
                  {/* 
                  <p>
                    <Button onClick={deviceFunc}>Get Device id</Button>
                  </p> */}
                  <p>
                    <Button
                      href={verificationURI}
                      target="_blank"
                      onClick={deviceFuncLogin}
                    >
                      Logga in med LiU-id (ADFS device)
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
                      Det kan ta några dagar innan Webmaster har accepterat din
                      ansökan.
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
