import React, { useState } from 'react'
import useSWR from 'swr'

import { GridContainer, GridItem } from '../ui/grid'
import BigPixels from '../layout/bigPixels'
import TitleChooser from '../ui/titleChooser'
import { post, put, del } from '../request'
import { StaticImage } from "gatsby-plugin-image"

const AlbumPage = ({ pageContext: { title } }) => {

  return (
    <BigPixels>
      <GridContainer>
        <GridItem fullWidth>
          <TitleChooser
            title={title}
            // choice={item}
            // setChoice={setItem}
            // categorizedChoices={categorizedItems}
            label="name"
          />
        </GridItem>
        <GridItem fullWidth>
          <StaticImage src="./images/juan.jpg" alt="juan"/>
        </GridItem>
        {/* {item && bookings && (
          <>
            <GridItem>
              <ItemPanel
                item={item}
                bookings={bookings}
                createBooking={create}
              />
            </GridItem>
            <GridItem>
              <BookingPanel
                bookings={bookings}
                updateBooking={update}
                destroyBooking={destroy}
                confirmBooking={confirm}
              />
            </GridItem>
          </>
        )} */}
      </GridContainer>
    </BigPixels>
  )
}

export default AlbumPage
