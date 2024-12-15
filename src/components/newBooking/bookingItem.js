import React from "react";
import { container, title, date } from "./bookingItem.module.scss";
import { FaInfoCircle, FaTrash } from "react-icons/fa";
export const BookingItem = ({booking, showDeleteIcon, onDetailsClick, onDeleteClick}) => {
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }
  return (
    <div className={container}>
      <div>
      <p className={title}>{booking.user.first_name}</p>
      <p className={date}>{new Date(booking.start).toLocaleString('sv-SE', dateOptions)}</p>
      </div>
      <button onClick={onDetailsClick}>
        <FaInfoCircle />
      </button>
      {showDeleteIcon && (
        <button onClick={onDeleteClick}>
          <FaTrash />
        </button>
      )}
    </div>
  );
}