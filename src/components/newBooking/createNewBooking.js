import React, { useState, useMemo } from "react";
import { Button } from "../ui/buttons";
import { formRow, formBlock, form, buttonWrapper, errorInput, errorMessage } from "./createNewBooking.module.scss";
import { BookingModal } from "./bookingModal"
import useModal from '../modal/useModal'
import { parseISO, differenceInMinutes, isBefore, isEqual } from 'date-fns';
import { BoookingInputForm } from "./bookingInputForm";

export const CreateNewBooking = ({selectedItemId, items, mutateBooking, bookings, validateBooking}) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [openBookingModal, isBookingModalOpen] = useModal(BookingModal)

  const handleClick = () => {
    setShowBookingForm(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    console.log("Form data in createbooking:",formData)
    const formValues = {
      startDate: formData.get('startDate'),
      startTime: formData.get('startTime'),
      endDate: formData.get('endDate'),
      endTime: formData.get('endTime')
    }
    /*if (!validateBooking(formValues.startDate, formValues.startTime, formValues.endDate, formValues.endTime)) {
      console.error("invalid date")
      return;
    }*/
    console.log('Form submitted w/ data:', formValues);
    openBookingModal(`Boka ${selectedItem.name}`, { selectedItem, formValues, mutateBooking, bookings});
  }

  const selectedItem = items?.find(item => item.id === selectedItemId);
  
  if (showBookingForm) {
    return (
      <>
      <h3>Ny bokning</h3>
      {/*<form onSubmit={handleSubmit} className={form}>
        <div className={formBlock}>
          <label for="startDate">Startdatum</label>
          <div className={formRow}>
            <input name="startDate" type="date" min={minDate} max={maxStartDate} value={startDate} onChange={(e) => setStartDate(e.target.value)} required={true} className={errors.startDate ? errorInput : ''}></input>
            <input name="startTime" type="time" value={startTime} onChange={e=>setStartTime(e.target.value)} required={true} className={errors.startTime ? errorInput : ''}></input>
          </div>
          {errors.startDate && <div className={errorMessage}>{errors.startDate}</div>}
        </div>
        <div className={formBlock}>
          <label for="endDate">Slutdatum</label>
          <div className={formRow}>
            <input name="endDate" type="date" min={minEndDate} value={endDate} onChange={(e)=>setEndDate(e.target.value)} required={true} className={errors.endDate ? errorInput : ''}></input>
            <input name="endTime" type="time" value={endTime} onChange={(e)=>setEndTime(e.target.value)} required={true} className={errors.endTime ? errorInput : ''}></input>
          </div>
          {errors.endDate && <div className={errorMessage}>{errors.endDate}</div>}
        </div>
        {errors.duration && <div className={errorMessage}>{errors.duration}</div>}
        {errors.overlap && <div className={errorMessage}>{errors.overlap}</div>}
        <Button type="submit">Gå vidare</Button>
      </form>*/}
      <BoookingInputForm handleSubmit={handleSubmit} validateBooking={validateBooking}/>
      </>
    )
  } else {
    return <div className={buttonWrapper}><Button onClick={handleClick} >Ny bokning</Button></div>
  }
}