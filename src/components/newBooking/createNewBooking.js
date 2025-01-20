import React, { useState, useMemo } from "react";
import { Button } from "../ui/buttons";
import { formRow, formBlock, form } from "./createNewBooking.module.scss";
import { BookingModal } from "./bookingModal"
import useModal from '../modal/useModal'

export const CreateNewBooking = ({selectedItemId, items}) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [openBookingModal, isBookingModalOpen] = useModal(BookingModal)

  const handleClick = () => {
    setShowBookingForm(true);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    const formValues = {
      startDate,
      startTime,
      endDate,
      endTime
    }
    openBookingModal(`Boka ${selectedItem}`, { selectedItem, formValues });
  }
  const minDate = new Date().toISOString().split('T')[0];
  const minEndDate = startDate.length > 0 ? startDate : minDate;
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
            <input name="startDate" type="date" min={minDate} value={startDate} onChange={(e) => setStartDate(e.target.value)} required={true}></input>
            <input name="startTime" type="time" value={startTime} onChange={e=>setStartTime(e.target.value)} required={true}></input>
          </div>
        </div>
        <div className={formBlock}>
          <label for="endDate">Slutdatum</label>
          <div className={formRow}>
            <input name="endDate" type="date" min={minEndDate} value={endDate} onChange={(e)=>setEndDate(e.target.value)} required={true}></input>
            <input name="endTime" type="time" value={endTime} onChange={(e)=>setEndTime(e.target.value)} required={true}></input>
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