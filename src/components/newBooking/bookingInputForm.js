import React, { useState } from "react";
import { Button } from "../ui/buttons";
import { formRow, formBlock, form, errorInput, errorMessage, buttonContainer } from "./bookingInputForm.module.scss";
import { parseISO, differenceInMinutes, isBefore, isEqual } from 'date-fns';

export const BookingInputForm = ({handleSubmit, type, booking, validateBooking, handleAbort}) => {
  console.log("BookingInputForm booking input:", booking)
  const [startDate, setStartDate] = useState(booking?.start ? new Date(booking.start).toISOString().split('T')[0] : '');
  const [startTime, setStartTime] = useState(booking?.start ? new Date(booking?.start)?.toTimeString().split(' ')[0] : '');
  const [endDate, setEndDate] = useState(booking?.end ? new Date(booking?.end)?.toISOString().split('T')[0] : '');
  const [endTime, setEndTime] = useState(booking?.end ? new Date(booking?.end)?.toTimeString().split(' ')[0] : '');
  const [errors, setErrors] = useState({});

  const minDate = new Date().toISOString().split('T')[0];
  const minEndDate = startDate.length > 0 ? startDate : minDate;
  const maxStartDate = endDate.length > 0 ? endDate : null;
  //const selectedItem = items?.find(item => item.id === selectedItemId);
  console.log("in bookingInputForm, booking: ", booking);
  console.log("in bookingInputForm, starDate: ", startDate);
  console.log("in bookingInputForm, startTime: ", startTime);

  
  const onSubmit = (e) => {
    e.preventDefault()
    console.log("BookingInputForm: Submitting bookingInputForm")
    const validationErrors = validateBooking(startDate, startTime, endDate, endTime);
    console.log("BookingInputForm: validation results:", validationErrors)
    if (Object.keys(validationErrors).length > 0){
      console.error("invalid date", validationErrors)
      setErrors(validationErrors)
      return
    }
    handleSubmit(e)
  }

  return (
    <>
    <form onSubmit={onSubmit} className={form}>
      <div className={formBlock}>
        <label htmlFor="startDate">Startdatum</label>
        <div className={formRow}>
          <input name="startDate" id="startDate" type="date" min={minDate} max={maxStartDate} value={startDate} onChange={(e) => setStartDate(e.target.value)} required={true} className={errors.startDate ? errorInput : ''}></input>
          <input name="startTime" id="startTime" type="time" value={startTime} onChange={e=>setStartTime(e.target.value)} required={true} className={errors.startTime ? errorInput : ''}></input>
        </div>
        {errors.startDate && <div className={errorMessage}>{errors.startDate}</div>}
      </div>
      <div className={formBlock}>
        <label htmlFor="endDate">Slutdatum</label>
        <div className={formRow}>
          <input name="endDate" id="endDate" type="date" min={minEndDate} value={endDate} onChange={(e)=>setEndDate(e.target.value)} required={true} className={errors.endDate ? errorInput : ''}></input>
          <input name="endTime" id="endTime" type="time" value={endTime} onChange={(e)=>setEndTime(e.target.value)} required={true} className={errors.endTime ? errorInput : ''}></input>
        </div>
        {errors.endDate && <div className={errorMessage}>{errors.endDate}</div>}
      </div>
      {errors.duration && <div className={errorMessage}>{errors.duration}</div>}
      {errors.overlap && <div className={errorMessage}>{errors.overlap}</div>}
      <div className={buttonContainer}>
        <Button type="button" onClick={handleAbort}>Avbryt</Button>
        <Button type="submit">{type == "edit" ? "Ändra" : "Gå vidare"}</Button>
      </div>
    </form>

    </>
  );
}