import React, { useState } from "react";
import { container, containerContainer, title, date } from "./bookingItem.module.scss";
import { FaInfoCircle, FaTrash, FaPen } from "react-icons/fa";
import { CreateNewBooking } from "./createNewBooking";
import { BoookingInputForm } from "./bookingInputForm";
import { put } from "../request";
import { formatDate } from "./bookingUtils";
import useSWR from "swr";
export const BookingItem = ({booking, showDeleteIcon, onDetailsClick, onDeleteClick, onUpdate}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: bookings, mutate } = useSWR(
    () =>
      selectedResource &&
    `/booking/bookings/?item=${selectedResource}`
  )
  console.log("bookings")
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      item_id: booking.item.id,
      description: booking.description,
      start: formatDate(formData.get('startDate'), formData.get('startTime')),
      end: formatDate(formData.get('endDate'), formData.get('endTime')),
      restricted_timeslot: formData.get('restricted_timeslot') === 'true',
    }
    console.log("data: ", data);

    const res = await onUpdate(booking.id, data);
    console.log(res)
  }
    
  return (
    <div className={containerContainer}>
      <div className={container}>
      <div>
        <p className={title}>{booking?.user?.first_name}</p>
        <p className={date}>{new Date(booking?.start)?.toLocaleString('sv-SE', dateOptions)}</p>
      </div>
      {showDeleteIcon && (
        <>
          <button onClick={() => setIsEditing(!isEditing)}>
            <FaPen />
          </button>
          <button onClick={onDeleteClick}>
            <FaTrash />
          </button>
        </>
      )}
      <button onClick={onDetailsClick}>
        <FaInfoCircle />
      </button>
      </div>
      {isEditing && (
        <BoookingInputForm handleSubmit={handleSubmit} type="edit" onAbort={() => setIsEditing(false)} booking={booking}/>
        )}
    </div>
  );
}