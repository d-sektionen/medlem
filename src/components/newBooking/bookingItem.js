import React, { useState, useContext } from "react";
import { container, containerContainer, title, date } from "./bookingItem.module.scss";
import { FaInfoCircle, FaTrash, FaPen, FaCheck, FaTimes } from "react-icons/fa";
import { CreateNewBooking } from "./createNewBooking";
import { BookingInputForm } from "./bookingInputForm";
import { put } from "../request";
import { formatDate } from "./bookingUtils";
import useSWR from "swr";
import { UserContext } from "../layout/layout";

export const BookingItem = ({booking, showDeleteIcon, onDetailsClick, onDeleteClick, onUpdate, onDeny, onConfirm,  validateBooking}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [user] = useContext(UserContext)
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
      description: formData.get('description'),
      start: formatDate(formData.get('startDate'), formData.get('startTime')),
      end: formatDate(formData.get('endDate'), formData.get('endTime')),
      restricted_timeslot: formData.get('restricted_timeslot') === 'true',
    }

    const res = await onUpdate(booking.id, data);
    setIsEditing(false);

  }
  const isAdmin = user.privileges.booking_admin
    
  return (
    <div className={containerContainer}>
      <div>
        <p className={title}>{booking?.user?.first_name}</p>
        <p className={date}>{new Date(booking?.start)?.toLocaleString('sv-SE', dateOptions)}</p>
      </div>
      <div className={container}>
      {(isAdmin) && (
        <>
        <button onClick={()=> onDeleteClick(booking.id)}>
          <FaTimes />
        </button>
        {booking.confirmed !== true && (
        <button onClick={() => onConfirm(booking.id)}>
          <FaCheck />
        </button>
        )}
        </>
      )}
      {(showDeleteIcon || isAdmin) && (
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
        <BookingInputForm handleSubmit={handleSubmit} type="edit" handleAbort={()=>setIsEditing(false)} booking={booking} validateBooking={validateBooking}/>
        )}
    </div>
  );
}