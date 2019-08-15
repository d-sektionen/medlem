import React, { useContext } from 'react'
import { LoadingContext } from '../layout/layout'
import Vote from '.'
import BigPixels from '../layout/bigPixels'
import { GridContainer, GridItem } from '../ui/grid'

const VotePage = () => {
  return (
    <BigPixels>
      <GridContainer>
        <GridItem>
          <Vote />
        </GridItem>
      </GridContainer>
    </BigPixels>
  )
}
export default VotePage
