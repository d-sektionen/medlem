import React, {useContext, useState} from "react"
import {page, bookingList, resourceSelector, content, calendarPadding} from "./page.module.scss"
import BookableResourceContainer from "./bookableResourceContainer"
import { BookingsList } from "./bookingsList"
import { AlertBanner } from "./alertBanner"
import BookingCalendar from "../booking/bookingCalendar"
import useSWR from "swr"
import { startOfISOWeek, subWeeks } from 'date-fns'
import { FaCar, FaTrailer, FaToolbox, FaCamera, FaBox } from "react-icons/fa";
import { LuLandPlot, LuDrill} from "react-icons/lu";
import { FaTent } from "react-icons/fa6";
import { UserContext } from "../layout/layout"
import { CreateNewBooking } from "./createNewBooking"
import { BookingCalendar2 } from "../booking/bookingCalendar2"
// import { BookingModal } from "./bookingModal"
import useModal from '../modal/useModal'

const getDate4WeeksAgo = date => {
  return subWeeks(startOfISOWeek(date), 4).toISOString()
}

export default function NewBookingPage () {
  const [afterDate, setAfterDate] = useState(getDate4WeeksAgo(new Date()))
  const [selectedResource, setSelectedResource] = useState(1)
  const [user] = useContext(UserContext)
  // const [openBookingModal, isBookingModalOpen] = useModal(BookingModal)

  const alertMessage = "Bokningar mellan 11 November och 31 December behöver godkännas manuellt."

  const { data: items } = useSWR('/booking/items/')
  const { data: bookings, mutate } = useSWR(
    () =>
      selectedResource &&
    `/booking/bookings/?item=${selectedResource}${
      afterDate ? '&after=' + afterDate : ''
    }`
  )

  const defaultIcon = <FaBox />;
  const icons = {
    1: <FaCar />,
    2: <FaTrailer />,
    3: <LuLandPlot />,
    4: <FaTent />,
    6: <LuDrill />,
    7: <FaToolbox />,
    9: <FaCamera />
  }
  const itemsWithIcons = items?.map(item => ({
    ...item,
    icon: icons[item.id] || defaultIcon
  }))
  const sortedItemsWithIcons = itemsWithIcons?.sort((a, b) => a.id - b.id)
  const handleSelectedResourceChange = (id) => {
    setSelectedResource(id)
  }
  
  const sortedBookings = bookings?.sort((a, b) => new Date(a.start) - new Date(b.start))
  const myBookings = sortedBookings?.filter(booking => booking.user.id === user.id)
  const otherBookings = sortedBookings?.filter(booking => booking.user.id !== user.id)

  return (
    <div className={page}>
      <h1>Bokningar</h1>
      <div className={content}>
        <div className={resourceSelector}>
        <BookableResourceContainer items={sortedItemsWithIcons} selectedItem={selectedResource} onSelectedItemChange={handleSelectedResourceChange}/>
        </div>
        <div className={calendarPadding}>
          {/* todo */}
          {/*<AlertBanner message={alertMessage} />*/}
          <BookingCalendar2 bookings={bookings} />
        </div>
        <div className={bookingList}>
          <h2>Mina bokningar</h2> 
          <BookingsList bookings={myBookings} type="mine"/>
          <CreateNewBooking selectedItemId={selectedResource} items={items} mutateBooking={mutate} bookings={bookings}/>
          <BookingsList bookings={otherBookings}/>
        </div>
      </div>
    </div>
  )
}