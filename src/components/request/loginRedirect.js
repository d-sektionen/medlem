import React, { useEffect } from 'react'
import BigPixels from '../layout/bigPixels'
import { GridContainer } from '../ui/grid'

const loginRedirect = () => {
  useEffect(() => {
    //TODO: Get access token from query parameter and use that to get a refresh token from backend.
    //TODO: Redirect to main page https://medlem.d-sektionen.se/
  })
  return (
    <BigPixels>
      <GridContainer></GridContainer>
    </BigPixels>
  )
}

export default loginRedirect
