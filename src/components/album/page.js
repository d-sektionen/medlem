import React, { useState } from 'react'
import useSWR from 'swr'

import { GridContainer, GridItem, PhotoGridContainer } from '../ui/grid'
import BigPixels from '../layout/bigPixels'
import TitleChooser from '../ui/titleChooser'
import { post, put, del } from '../request'
import { StaticImage } from "gatsby-plugin-image"

const AlbumPage = ({ pageContext: { title } }) => {
  const [groupBy, setGroupBy] = useState(null);
  const [showItem, setShowItem] = useState(null);

  return (
    <BigPixels>
      <PhotoGridContainer>
        <GridItem fullWidth>
          <TitleChooser
            title={title}
            choice={groupBy}
            setChoice={setGroupBy}
            choices={[{'id': 1, 'groupBy': 'Hästar', 'choices':[{'id': 1, 'show': 'Juan'}, {'id':2, 'show': 'ricardio'}]},
            {'id': 2, 'groupBy': 'Grodor', 'choices':[{'id': 1, 'show': 'carlito'}, {'id':2, 'show': 'pär'}]}]}
            label="groupBy"
            choicesLabel="Gruppera efter"
          />
          <TitleChooser
            choice={showItem}
            setChoice={setShowItem}
            choices={groupBy? groupBy['choices']: []}
            label="show"
            choicesLabel="Visa"
          />
        </GridItem>
        <GridItem>
          <StaticImage src="./images/juan.jpg" alt="juan" layout='constrained' aspectRatio={1} width={250}/>
        </GridItem>
        <GridItem>
          <StaticImage src="./images/juan.jpg" alt="screen" layout='constrained' aspectRatio={1} width={250}/>
        </GridItem>
        <GridItem>
          <StaticImage src="./images/juan.jpg" alt="screen" layout='constrained' aspectRatio={1} width={250}/>
        </GridItem>
        <GridItem>
          <StaticImage src="./images/juan.jpg" alt="screen" layout='constrained' aspectRatio={1} width={250}/>
        </GridItem>
        <GridItem>
          <StaticImage src="./images/juan.jpg" alt="screen" layout='constrained' aspectRatio={1} width={250}/>
        </GridItem>
        <GridItem>
          <StaticImage src="./images/juan.jpg" alt="screen" layout='constrained' aspectRatio={1} width={250}/>
        </GridItem>
        <GridItem>
          <StaticImage src="./images/juan.jpg" alt="screen" layout='constrained' aspectRatio={1} width={250}/>
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
      </PhotoGridContainer>
    </BigPixels>
  )
}

export default AlbumPage
