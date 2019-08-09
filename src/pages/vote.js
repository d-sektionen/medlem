import React from 'react'
import { LoadingContext } from '../components/layout'
import Vote from '../components/vote'
import BigPixels from '../components/bigPixels'
import { GridContainer, GridItem } from '../components/ui/grid'

const VotePage = () => (
  <LoadingContext.Consumer>
    {loading => (
      <BigPixels>
        <GridContainer>
          <GridItem>
            <Vote setLoading={loading.set} />
          </GridItem>
        </GridContainer>
      </BigPixels>
    )}
  </LoadingContext.Consumer>
)

export default VotePage
