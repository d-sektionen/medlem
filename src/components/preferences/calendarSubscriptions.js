import React, { useState } from 'react'
import useSWR from 'swr'
import { FiLink, FiTrash2 } from 'react-icons/fi'
import { List, ListItem, ListButton } from '../ui/list'
import useConfirmModal from '../modal/useConfirmModal'
import { del, post } from '../request'
import AddCalendarSubscription from './addCalendarSubscription'
import useModal, { useCloseModal } from '../modal/useModal'
import { Button } from '../ui/buttons'
import CalendarLink from './calendarLink'



const CalendarSubscriptions = () => {
  const [openCreateModal] = useModal(AddCalendarSubscription)
  const [openLinkModal] = useModal(CalendarLink)
  const [openConfirmation] = useConfirmModal()
  const closeModal = useCloseModal()
  const { data: subs, mutate } = useSWR('/account/calendar-subscriptions/')
  const bookableItems = useSWR('/booking/items/')
  console.log(bookableItems)
  const getTitle = sub => {
    console.log(sub)
    const parts = []
    if (sub.include_bookings) parts.push('bokningar')
    if (sub.include_events_attending) parts.push('anmälda evenemang')
    if (sub.include_events_not_attending) parts.push('oanmälda evenemang')
    if (sub.include_bookings_by_user) parts.push('bokningar av användare')
    if (sub.include_bookable_items) {
      sub.include_bookable_items.forEach(element => {
        if(!bookableItems.isLoading){
          parts.push(bookableItems.data.find(item => item.id === element).name)
        }
      });
    }
    const combined = parts.join(', ')
    return combined.charAt(0).toUpperCase() + combined.substring(1)
  }
  return (
    <div>
      <h2>Kalenderprenumerationer</h2>
      <List>
        {subs &&
          subs.map(sub => (
            <ListItem
              title={getTitle(sub)}
              key={sub.id}
              buttons={[
                <ListButton
                  iconComponent={FiLink}
                  text="Visa länk"
                  onClick={() => {
                    openLinkModal('Prenumerationslänk', {
                      url: sub.url,
                    })
                  }}
                  key="view"
                />,
                <ListButton
                  iconComponent={FiTrash2}
                  text="Ta bort prenumeration"
                  onClick={() => {
                    openConfirmation(
                      'Är du säker på att du vill ta bort prenumerationen?',
                      async () => {
                        await del(`/account/calendar-subscriptions/${sub.id}/`)
                        mutate(subs.filter(s => s.id !== sub.id))
                      }
                    )
                  }}
                  key="delete"
                />,
              ]}
            />
          ))}
      </List>
      <Button
        onClick={() => {
          openCreateModal('Ny prenumeration', {
            create: async data => {
              const { data: newSub } = await post(
                '/account/calendar-subscriptions/',
                data
              )
              mutate([...subs, newSub])
              closeModal()
            },
          })
        }}
      >
        Ny prenumeration
      </Button>
    </div>
  )
}

export default CalendarSubscriptions
