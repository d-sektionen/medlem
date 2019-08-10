import React, { useContext } from 'react'
import { LoadingContext } from '../components/layout'
import Vote from '../components/vote'
import BigPixels from '../components/bigPixels'
import { GridContainer, GridItem } from '../components/ui/grid'

const VotePage = () => {
  const setLoading = useContext(LoadingContext)[1]
  return (
    <BigPixels>
      <GridContainer>
        <GridItem>
          <Vote setLoading={setLoading} />
        </GridItem>
      </GridContainer>
    </BigPixels>
  )
}
export default VotePage
