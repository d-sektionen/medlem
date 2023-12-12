import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import Snowfall from 'react-snowfall'
import whiteImage from '../../images/snowflake-white.webp'
import blueImage from '../../images/dsek-blue.webp'
import brownImage from '../../images/dsek-brown.webp'
import ceriseImage from '../../images/dsek-cerise.webp'
import greenImage from '../../images/dsek-green.webp'
import yellowImage from '../../images/dsek-yellow.webp'

const DsektionHappyBirthday = () => {
  const [dsektionColorImages, setDsektionColorImages] = useState([])
  const currentDate = new Date()
  const dsektionBirthday = new Date('01/16')
  const date = currentDate.getDate()

  const generateImages = () => {
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

    setDsektionColorImages([
      snowflakeBlue,
      snowflakeBrown,
      snowflakeCerise,
      snowflakeGreen,
      snowflakeYellow,
      snowflakeWhite,
    ])
  }

  useEffect(() => {
    generateImages()
  }, [])

  return (
    <>
      {true && (
        <div>
          <Snowfall
            snowflakeCount={300}
            images={dsektionColorImages}
            rotationSpeed={[0.8, 1.5]}
            speed={[2.0, 3.0]}
            radius={[6.0, 12.0]}
            // With a slight wind draft to the right, snowfall updates more nicely when resizing window.
            wind={[-0.1, 0.1]}
          />
          <Confetti
            colors={[
              '#ffffff',
              '#754022',
              '#e5398d',
              '#f7e623',
              '#70bd44',
              '#20407c',
            ]}
          />
        </div>
      )}
    </>
  )
}

export default DsektionHappyBirthday
