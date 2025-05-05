import React, {useContext, useState} from "react"
import {page, bookingList, resourceSelector, content, calendarPadding, infoBox, infoPopup} from "./page.module.scss"
import BookableResourceContainer from "./bookableResourceContainer"
import { BookingsList } from "./bookingsList"
import useSWR from "swr"
import { parseISO, differenceInMinutes, isBefore, isEqual, startOfISOWeek, subWeeks } from 'date-fns';
import { FaCar, FaTrailer, FaToolbox, FaCamera, FaBox } from "react-icons/fa";
import { LuLandPlot, LuDrill} from "react-icons/lu";
import { FaTent } from "react-icons/fa6";
import { UserContext } from "../layout/layout"
import { CreateNewBooking } from "./createNewBooking"
import { BookingCalendar } from "./bookingCalendar"
import { post, put, del } from "../request"
import useModal from '../modal/useModal'
import ViewBooking from './viewBooking'
import useConfirmModal from '../modal/useConfirmModal'
import { Button } from "../ui/buttons";
import { useMediaQuery } from "../ui/useMediaQuery"

const getDate4WeeksAgo = date => {
  return subWeeks(startOfISOWeek(date), 4).toISOString()
}

export default function NewBookingPage () {
  const [afterDate, setAfterDate] = useState(getDate4WeeksAgo(new Date()))
  const [selectedResource, setSelectedResource] = useState(1)
  const [user] = useContext(UserContext)

  const [openViewBooking] = useModal(ViewBooking)
  const [openConfirmation] = useConfirmModal()

  const [view, setVisible] = useState(false);

  const { data: items } = useSWR('/booking/items/')
  const { data: bookings, mutate } = useSWR(
    () =>
      selectedResource &&
    `/booking/bookings/?item=${selectedResource}${
      afterDate ? '&after=' + afterDate : ''
    }`
  )
  const update = async (bookingId, data) => {
      const { data: updatedBooking } = await put(
        `/booking/bookings/${bookingId}/`,
        data
      )
      mutate([...bookings.filter(b => b.id !== bookingId), updatedBooking])
      return updatedBooking
    }

  const destroy = async bookingId => {
    await del(`/booking/bookings/${bookingId}/`)
    mutate(bookings.filter(b => b.id !== bookingId))
  }

  const confirm = async bookingId => {
    await put(`/booking/bookings/${bookingId}/confirm/`)
    mutate(
      bookings.map(b => {
        if (bookingId !== b.id) return b
        return { ...b, confirmed: true }
      })
    )
  }

  const deny = async (bookingId, data) => {
    await post(
      `/booking/bookings/${bookingId}/deny/`,
      data
    )
    mutate(
      bookings.filter(b => {
        return bookingId !== b.id
      })
    )
  }

  const validateBooking = (startDate, startTime, endDate, endTime) => {
    const start = parseISO(`${startDate}T${startTime}`);
    const end = parseISO(`${endDate}T${endTime}`);
    const newErrors = {};
    
    if (isBefore(end, start) || isEqual(end, start)) {
      newErrors.endDate = "Slutdatum/tid måste vara efter startdatum/tid.";
    }
  
    const diffInMinutes = differenceInMinutes(end, start);
    if (diffInMinutes < 30) {
      newErrors.duration = "Bokningen måste vara minst 30 minuter lång.";
    }
  
    const isIntercepting = bookings?.some(booking => {
      const bookingStart = parseISO(`${booking?.startDate}T${booking?.startTime}`);
      const bookingEnd = parseISO(`${booking?.endDate}T${booking?.endTime}`);
      return (isBefore(start, bookingEnd) && isAfter(end, bookingStart));
    });
  
    if (isIntercepting) {
      newErrors.overlap = "Bokningen överlappar med en annan bokning.";
    }
    return newErrors
  }

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
  const myBookings = sortedBookings?.filter(booking => booking.user.id === user.id && new Date(booking.start) >= new Date()) 
  const unConfirmedBookings = sortedBookings?.filter(booking => !booking.confirmed)
  const otherBookings = sortedBookings?.filter(booking => booking.user.id !== user.id && new Date(booking.start) >= new Date())
  const resource = items?.find(item=>item.id === selectedResource)?.name
  
  const isNarrow = useMediaQuery("(max-width: 600px)")

  const handleDelete = (bookingId) => {
    openConfirmation(
      'Är du säker på att du vill ta bort bokningen?',
      () => destroy(bookingId)
    )
  }
  const handleDetails = (booking) => {
    openViewBooking('Bokningsinformation', { booking });
  };

  
  return (
    <div className={page}>
      <h1>Bokningar</h1>
      <div className={content}>

        <div className={resourceSelector}>
        <BookableResourceContainer items={sortedItemsWithIcons} selectedItem={selectedResource} onSelectedItemChange={handleSelectedResourceChange}/>
        {isNarrow && (<p>{items?.find(item=>item.id === selectedResource)?.name}</p>)}
        </div>

        <div className={calendarPadding}>
          <BookingCalendar bookings={bookings} />
        </div>

        <div className={bookingList}>
          <h2>Mina bokningar</h2> 

          <div className={infoBox}>
            <p>Genom att boka {items?.find(item=>item.id === selectedResource)?.name} godkänner du <a href={items?.find(item=>item.id === selectedResource)?.terms}>bokningsavtalet</a>.</p>
            <Button onClick={() => setVisible(!view)}>Mer info</Button>  
          </div>
         
          {view && (
            <div className={infoPopup}>
              <div>
                <h2>{resource}</h2>
                <p>{items?.find(item=>item.id === selectedResource)?.description}</p>
                <Button type="button" onClick={() => setVisible(false)}>Stäng</Button>
              </div>
              
            </div>
          )}

          <BookingsList bookings={myBookings} deletable={true} onDetailsClick={handleDetails} onDeleteClick={handleDelete} onUpdate={update} validateBooking={validateBooking}/>
                    
          <CreateNewBooking selectedItemId={selectedResource} items={items} mutateBooking={mutate} bookings={bookings} validateBooking={validateBooking}/>
          {user.privileges.booking_admin && <><h2>Ohanterade bokningar</h2><BookingsList bookings={unConfirmedBookings} deletable={true} onDetailsClick={handleDetails} onDeleteClick={handleDelete} onUpdate={update} onConfirm={confirm} onDeny={deny} validateBooking={validateBooking}/></>}
          
          <h2>Alla bokningar</h2>
          <BookingsList bookings={otherBookings} deletable={false} onDetailsClick={handleDetails} onDeleteClick={handleDelete} onUpdate={update} validateBooking={validateBooking}/>
        </div>

      </div>
    </div>
  )
}