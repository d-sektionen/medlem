import React, { useState } from "react";
import { Button } from "../ui/buttons";
import { formRow, formBlock, form, errorInput, errorMessage, buttonContainer } from "./bookingInputForm.module.scss";
export const BoookingInputForm = ({handleSubmit, onAbort, type, booking}) => {
  const [startDate, setStartDate] = useState(new Date(booking?.start).toISOString().split('T')[0] || '');
  const [startTime, setStartTime] = useState(new Date(booking?.start).toTimeString().split(' ')[0] || '');
  const [endDate, setEndDate] = useState(new Date(booking?.end).toISOString().split('T')[0] || '');
  const [endTime, setEndTime] = useState(new Date(booking?.end).toTimeString().split(' ')[0] || '');
  const [errors, setErrors] = useState({});

  const minDate = new Date().toISOString().split('T')[0];
  const minEndDate = startDate.length > 0 ? startDate : minDate;
  const maxStartDate = endDate.length > 0 ? endDate : null;
  //const selectedItem = items?.find(item => item.id === selectedItemId);
  console.log("in bookingInputForm, booking: ", booking);
  console.log("in bookingInputForm, starDate: ", startDate);
  console.log("in bookingInputForm, startTime: ", startTime);
  return (
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
      <div className={buttonContainer}>
        <Button type="button" onClick={onAbort}>Avbryt</Button>
        <Button type="submit">{type == "edit" ? "Ändra" : "Gå vidare"}</Button>
      </div>
    </form>
  );
}