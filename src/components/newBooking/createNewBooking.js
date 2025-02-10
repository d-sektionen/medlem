import React, { useState, useMemo } from "react";
import { Button } from "../ui/buttons";
import { formRow, formBlock, form, buttonWrapper, errorInput, errorMessage } from "./createNewBooking.module.scss";
import { BookingModal } from "./bookingModal"
import useModal from '../modal/useModal'
import { parseISO, differenceInMinutes, isBefore, isEqual } from 'date-fns';

export const CreateNewBooking = ({selectedItemId, items, mutateBooking, bookings}) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [errors, setErrors] = useState({});
  const [openBookingModal, isBookingModalOpen] = useModal(BookingModal)
  

  const validateBooking = () => {
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
  
    const isIntercepting = bookings.some(booking => {
      const bookingStart = parseISO(`${booking.startDate}T${booking.startTime}`);
      const bookingEnd = parseISO(`${booking.endDate}T${booking.endTime}`);
      return (isBefore(start, bookingEnd) && isAfter(end, bookingStart));
    });
  
    if (isIntercepting) {
      newErrors.overlap = "Bokningen överlappar med en annan bokning.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleClick = () => {
    setShowBookingForm(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateBooking()) {
      return;
    }
    console.log('Form submitted');
    const formValues = {
      startDate,
      startTime,
      endDate,
      endTime
    }
    openBookingModal(`Boka ${selectedItem.name}`, { selectedItem, formValues, mutateBooking, bookings});
  }
  

  const minDate = new Date().toISOString().split('T')[0];
  const minEndDate = startDate.length > 0 ? startDate : minDate;
  const maxStartDate = endDate.length > 0 ? endDate : null;
  const selectedItem = items?.find(item => item.id === selectedItemId);

  console.log('form data', {
    startDate,
    startTime,
    endDate,
    endTime
  })
  
  if (showBookingForm) {
    return (
      <>
      <h3>Ny bokning</h3>
      <form onSubmit={handleSubmit} className={form}>
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
      </form>
      </>
    )
  } else {
    return <div className={buttonWrapper}><Button onClick={handleClick} >Ny bokning</Button></div>
  }
}