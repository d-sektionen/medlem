import React, { useState, useEffect } from 'react'
import useSWR from 'swr'

import AttendantPanel from './attendantPanel'
import DoorkeeperPanel from '../checkin/doorkeeperPanel'
import { GridContainer, GridItem } from '../ui/grid'
import BigPixels from '../layout/bigPixels'
import TitleChooser from '../ui/titleChooser'
import AddOccurrence from './addOccurrence'
import useModal, { useCloseModal } from '../modal/useModal'
import { post } from '../request'

const AttendancePage = ({ pageContext: { title } }) => {
  const [currentOccurrence, setCurrentOccurrence] = useState(null)
  const { data: unorderedOccurrences, mutate } = useSWR(
    '/attendance/occurrences/'
  )
  const [openCreateModal] = useModal(AddOccurrence)
  const closeModal = useCloseModal()

  const create = async data => {
    const { data: newOccurrence } = await post('/attendance/occurrences/', data)
    mutate([...unorderedOccurrences, newOccurrence])
  }

  const occurrences = unorderedOccurrences
    ? [...unorderedOccurrences].reverse()
    : null

  // sync currentOccurrence with updated occurrences
  useEffect(
    () => {
      if (currentOccurrence)
        setCurrentOccurrence(
          unorderedOccurrences.find(m => m.id === currentOccurrence.id)
        )
    },
    [unorderedOccurrences]
  )

  return (
    <BigPixels>
      <GridContainer>
        <GridItem fullWidth>
          <TitleChooser
            title={title}
            choice={currentOccurrence}
            setChoice={setCurrentOccurrence}
            choices={occurrences}
            label="name"
            action={() => {
              openCreateModal('Ny händelse', {
                create: async data => {
                  await create(data)
                  closeModal()
                },
              })
            }}
            actionLabel="Ny händelse"
            noChoicesLabel="Det finns inga händelser just nu."
          />
        </GridItem>
        {currentOccurrence && (
          <>
            <GridItem>
              <AttendantPanel currentOccurrence={currentOccurrence} />
            </GridItem>
            <GridItem>
              <DoorkeeperPanel event={currentOccurrence} />
            </GridItem>
          </>
        )}
      </GridContainer>
    </BigPixels>
  )
}

export default AttendancePage
