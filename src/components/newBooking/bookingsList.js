import React, { useState } from "react";
import { BookingItem } from "./bookingItem";
import { Button } from "../ui/buttons";
import { container, wrapper } from "./bookingsList.module.scss";

export const BookingsList = ({bookings, deletable, onDetailsClick, onDeleteClick}) => {
  const [showAllBookings, setShowAllBookings] = useState(false);

  const showAll = () => {
    setShowAllBookings(true);
  }
  if (showAllBookings) {

  return (
    <>
      <div className={container}>
        <h2>Mina bokningar</h2> 
    
      {bookings?.map(booking => (<BookingItem booking={booking} showDeleteIcon={deletable} onDetailsClick={onDetailsClick} onDeleteClick={onDeleteClick} />))}
      </div>

    </>
  )
  } else {
    return (
      <div className={wrapper}>
        <h2>Mina bokningar</h2> 

        <Button onClick={showAll}>Visa alla bokningar</Button>
      </div>
    )
  }
}