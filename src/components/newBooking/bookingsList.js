import React from "react";
import { BookingItem } from "./bookingItem";
import { container, wrapper } from "./bookingsList.module.scss";

export const BookingsList = ({bookings, deletable, onDetailsClick, onDeleteClick}) => {
  return (
    <div className={wrapper}>
      <h2>Bokningar</h2>
      <div className={container}>
        {bookings?.map(booking => (<BookingItem booking={booking} showDeleteIcon={deletable} onDetailsClick={onDetailsClick} onDeleteClick={onDeleteClick} />))}
      </div>
    </div>
  );
}