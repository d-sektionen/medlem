import React from 'react'
import Snowfall from 'react-snowfall'
import whiteImage from '../../images/snowflake-white.webp'
import blueImage from '../../images/dsek-blue.webp'
import brownImage from '../../images/dsek-brown.webp'
import ceriseImage from '../../images/dsek-cerise.webp'
import greenImage from '../../images/dsek-green.webp'
import yellowImage from '../../images/dsek-yellow.webp'

const DsektionSnowfall = () => {
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

  const whiteSnowflakes = Array(45).fill(snowflakeWhite)

  const snowflakeImages = [
    snowflakeBlue,
    snowflakeBrown,
    snowflakeCerise,
    snowflakeGreen,
    snowflakeYellow,
  ].concat(whiteSnowflakes)

  return (
    <Snowfall
      // Controls the number of snowflakes that are created (default 150)
      snowflakeCount={150}
      images={snowflakeImages}
      rotationSpeed={[0.1, 0.5]}
      speed={[0.5, 1.0]}
      radius={[3.0, 8.0]}
      wind={[-1.0, 1.0]}
    />
  )
}

export default DsektionSnowfall
