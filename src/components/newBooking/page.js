import React, {useContext, useState} from "react"
import {page, column, content, calendarPadding} from "./page.module.scss"
import { BookableResourceContainer } from "./bookableResourceContainer"
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

const getDate4WeeksAgo = date => {
  return subWeeks(startOfISOWeek(date), 4).toISOString()
}

export default function NewBookingPage () {
  const [afterDate, setAfterDate] = useState(getDate4WeeksAgo(new Date()))
  const [selectedResource, setSelectedResource] = useState(1)
  const [user] = useContext(UserContext)

  const alertMessage = "Bokningar mellan 11 November och 31 December behöver godkännas manuellt."

  const { data: items } = useSWR('/booking/items/')
  const { data: bookings, mutate } = useSWR(
    () =>
      items &&
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
  const myBookings = sortedBookings?.filter(booking => booking.user === user.id)
  const otherBookings = sortedBookings?.filter(booking => booking.user !== user.id)

  return (
    <div className={page}>
      <h1>Bokningar</h1>
      <div className={content}>

      <div className={column}>
        {/* currently not working */}
        {/* <BookableResourceContainer items={sortedItemsWithIcons} selectedItem={selectedResource} onSelectedItemChange={handleSelectedResourceChange}/> */}
      </div>
      <div className={`${column} ${calendarPadding}`}>
        {/* todo */}
        <AlertBanner message={alertMessage} />
        <BookingCalendar bookings={bookings} />
      </div>
      <div className={column}>
        <BookingsList bookings={myBookings}/>
        <CreateNewBooking/>
        <BookingsList bookings={otherBookings}/>
      </div>
      </div>
    </div>
  )
}