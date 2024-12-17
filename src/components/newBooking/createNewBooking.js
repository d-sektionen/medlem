import React, { useState } from "react";
import { Button } from "../ui/buttons";
import { formRow, formBlock, form } from "./createNewBooking.module.scss";

export const CreateNewBooking = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [startDate, setStartDate] = useState('');

  const handleClick = () => {
    setShowBookingForm(true);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log(e);
  }
  const minDate = new Date().toISOString().split('T')[0];
  const minEndDate = startDate.length > 0 ? startDate : minDate;

  if (showBookingForm) {
    return (
      <>
      <h3>Ny bokning</h3>
      <form onSubmit={handleSubmit} className={form}>
        <div className={formBlock}>
          <label for="startDate">Startdatum</label>
          <div className={formRow}>
            <input name="startDate" type="date" min={minDate} value={startDate} onChange={(e) => setStartDate(e.target.value)}></input>
            <input name="startDate" type="time"></input>
          </div>
        </div>
        <div className={formBlock}>
          <label for="endDate">Slutdatum</label>
          <div className={formRow}>
            <input name="endDate" type="date" min={minEndDate}></input>
            <input name="endDate" type="time"></input>
          </div>
        </div>
        <Button type="submit">Gå vidare</Button>
      </form>
      </>
    )
  } else {
    return <Button onClick={handleClick}>Ny bokning</Button>
  }
}