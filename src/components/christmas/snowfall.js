import React from 'react'
import Snowfall from 'react-snowfall'
import whiteImage from '../../images/snowflake-white.webp'
import blueImage from '../../images/dsek-blue.webp'
import brownImage from '../../images/dsek-brown.webp'
import ceriseImage from '../../images/dsek-cerise.webp'
import greenImage from '../../images/dsek-green.webp'
import yellowImage from '../../images/dsek-yellow.webp'

const DsektionSnowfall = ({
  snowflakeCountDayIncrement,
  snowflakeCountBase,
  dsektionSnowflakeCountBase,
}) => {
  const currentDate = new Date()

  // If the current month is not december
  if (currentDate.getMonth() != 11) {
    return <></>
  }

  const snowflakeWhite = document.createElement('img')
  snowflakeWhite.src = whiteImage
  const snowflakeBlue = document.createElement('img')
  snowflakeBlue.src = blueImage
  const snowflakeBrown = document.createElement('img')
  snowflakeBrown.src = brownImage
  const snowflakeCerise = document.createElement('img')
  snowflakeCerise.src = ceriseImage
  const snowflakeGreen = document.createElement('img')
  snowflakeGreen.src = greenImage
  const snowflakeYellow = document.createElement('img')
  snowflakeYellow.src = yellowImage

  const dsektionSnowflakeImages = [
    snowflakeBlue,
    snowflakeBrown,
    snowflakeCerise,
    snowflakeGreen,
    snowflakeYellow,
  ]

  /*
  Formula for calulating max amount of dsektion color snow particles.
  Since the Snowfall component picks a random image from a supplied list, we have to calulate the amount
  of white snowflake images to place in the list to achieve the desired amount of dsektion color snowflakes.

  maxDsektionSnowflakes = snowflakeCount * (dsektionSnowflakeAmount / (whiteSnowflakeAmount + dsektionSnowflakeAmount))
  => whiteSnowflakeAmount = dsektionSnowflakeAmount * ((snowflakeCount / maxDsektionSnowflakes) - 1)

  Also round this value to a whole number.
  */

  const date = currentDate.getDate()
  const snowflakeCount = snowflakeCountBase + snowflakeCountDayIncrement * date
  const dsektionSnowflakeAmount = dsektionSnowflakeImages.length
  const maxDsektionSnowflakes = dsektionSnowflakeCountBase + date
  const whiteSnowflakeAmount = Math.floor(
    dsektionSnowflakeAmount * (snowflakeCount / maxDsektionSnowflakes - 1)
  )

  const whiteSnowflakeImage = Array(whiteSnowflakeAmount).fill(snowflakeWhite)
  const snowflakeImages = dsektionSnowflakeImages.concat(whiteSnowflakeImage)

  return (
    <Snowfall
      // Controls the number of snowflakes that are created (default 150)
      snowflakeCount={snowflakeCount}
      images={snowflakeImages}
      rotationSpeed={[0.1, 0.5]}
      speed={[0.1, 1.0]}
      radius={[3.0, 7.0]}
      wind={[-1.0, 1.0]}
    />
  )
}

export default DsektionSnowfall
