import React, { useState } from "react";
import { container, containerContainer, title, date } from "./bookingItem.module.scss";
import { FaInfoCircle, FaTrash, FaPen } from "react-icons/fa";
import { CreateNewBooking } from "./createNewBooking";
import { BookingInputForm } from "./bookingInputForm";
import { put } from "../request";
import { formatDate } from "./bookingUtils";
import useSWR from "swr";

export const BookingItem = ({booking, showDeleteIcon, onDetailsClick, onDeleteClick, onUpdate, validateBooking}) => {
  const [isEditing, setIsEditing] = useState(false);

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
    setIsEditing(false);

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
          <button onClick={()=> onDeleteClick(booking.id)}>
            <FaTrash />
          </button>
        </>
      )}
      <button onClick={() => onDetailsClick(booking)}>
        <FaInfoCircle />
      </button>
      </div>
      {isEditing && (
        <BookingInputForm handleSubmit={handleSubmit} type="edit" handleAbort={()=>setIsEditing(false)} booking={booking} validateBooking={validateBooking} test={()=>console.log("skibdidididi didid")}/>
        )}
    </div>
  );
}