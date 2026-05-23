import React, { useState } from "react";
import { Button } from "../ui/buttons";
import { buttonWrapper } from "./createNewBooking.module.scss";
import { BookingModal } from "./bookingModal"
import useModal from '../modal/useModal'
import { BookingInputForm } from "./bookingInputForm";

/**
 * CreateNewBooking component represents 
 * 
 * @param {} selectedItemId - 
 * @param {} items - 
 * @param {} mutateBooking -
 * @param {} bookings - 
 * @param {} validateBooking -
 * 
 * @description
 * This component 
 */


export const CreateNewBooking = ({selectedItemId, items, mutateBooking, bookings, validateBooking}) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [openBookingModal] = useModal(BookingModal)

  const handleClick = () => {
    setShowBookingForm(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formValues = {
      startDate: formData.get('startDate'),
      startTime: formData.get('startTime'),
      endDate: formData.get('endDate'),
      endTime: formData.get('endTime'),
      description: formData.get('description')
    }
    openBookingModal(`Boka ${selectedItem.name}`, { selectedItem, formValues, mutateBooking, bookings});
    setShowBookingForm(false)
  }

  const selectedItem = items?.find(item => item.id === selectedItemId);
  
  if (showBookingForm) {
    return (
      <>
      <h3>Ny bokning</h3>
      <BookingInputForm handleSubmit={handleSubmit} handleAbort={()=>setShowBookingForm(false)} validateBooking={validateBooking}/>
      </>
    )
  } else {
    return <div className={buttonWrapper}><Button onClick={handleClick} >Ny bokning</Button></div>
  }
}