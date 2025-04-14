import React, { useState } from "react";
import { BookingItem } from "./bookingItem";
import { Button } from "../ui/buttons";
import { container, wrapper } from "./bookingsList.module.scss";

export const BookingsList = ({bookings, deletable, onDetailsClick, onDeleteClick, onUpdate, validateBooking, onConfirm, onDeny}) => {

  const [showAllBookings, setShowAllBookings] = useState(false);

  const showAll = () => {
    setShowAllBookings(!showAllBookings);
  }

  //bookings?.map(booking => (console.log(booking.confirmed)));           
  const filteredBookings = showAllBookings ? bookings : bookings?.filter((booking, index) => index < 5)

  if (bookings?.length <= 0) {
    return (<p>Du har inga bokningar</p>)
  }
  console.log(bookings, deletable, onDetailsClick, onDeleteClick);
  return (
      <div className={container}>
        {showAll && (
          <div className={container}>{filteredBookings?.map((booking, index) => (<BookingItem booking={booking} showDeleteIcon={deletable} onDetailsClick={onDetailsClick} onDeleteClick={onDeleteClick} onUpdate={onUpdate} onConfirm={onConfirm} onDeny={onDeny} onkey={`booking-item-${index}`} validateBooking={validateBooking}/>))}
          </div>
        )}
        {bookings?.length > 5 && (<Button onClick={showAll}>{showAllBookings ? 'Visa färre' : 'Visa alla bokningar'}</Button>)}
      </div>
    )
    
  
}