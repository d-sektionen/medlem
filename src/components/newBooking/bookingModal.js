import React, {useState} from "react";
import { formItem, popup, popupContent } from "./bookingModal.module.scss";
import { Button } from "../ui/buttons";
export const BookingModal = ({selectedItem, formValues}) => {
  const [restrictedTimeslot, setRestrictedTimeslot] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [purpose, setContent] = useState('');

  const handleBooking = (e) => {
    e.preventDefault();
      setShowPopup(true);
  }

  const handleComfirm = () => {
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
    saveBooking();
  };

  // todo: add new booking to calender

  // const newBooking = booking === undefined
  // const saveBooking = () => {
  //   const request = newBooking
  //     ? createBooking({
  //         item_id: item.id,
  //         description,
  //         start,
  //         end,
  //         restricted_timeslot: restrictedTimeslot,
  //       })
  //     : updateBooking(booking.id, {
  //         item_id: booking.item.id,
  //         description,
  //         start,
  //         end,
  //         restricted_timeslot: restrictedTimeslot,
  //       })

  //   request
  //     .then(() => {
  //       close()
  //     })
  //     .catch(err => {
  //       setErrors(err.response.data)
  //       console.log(err.response.data)
  //     })
  // }


  return (
    <>
      <h3>Ny bokning</h3>

      <form onSubmit={handleBooking}>
        <label for="purpose">ändamål</label><br></br>
        <textarea name="purpose" value={purpose} onChange={e => setContent(e.target.value)} placeholder="Skriv ditt ändamål här" cols={40}></textarea>
        <h3>
          {'Begränsad tidsperiod '}
          <input
            type="checkbox"
            checked={restrictedTimeslot}
            onChange={(e) => setRestrictedTimeslot(e.target.checked)}
          />
        </h3>
        <p>
          En begränsad tidsperiod låter dig skapa en tidsperiod där du har
          prioritet att skapa bokningar. En begränsad tidsperiod måste bekräftas
          av en administratör.
        </p>
      <Button type="submit">Save</Button> 
      </form>

      {showPopup && (
        <div className={popup}> 
          <div className={popupContent}>
            <h2>Bekräfta bokning</h2>
            <p>{`Bokning av ${selectedItem.name}`}</p>
            <br></br>
            <p>{`Start datum: ${formValues.startDate} ${formValues.startTime}`}</p>
            <p>{`Slut datum: ${formValues.endDate} ${formValues.endTime}`}</p>
            <br></br>
            <p>{`ändamål: ${purpose}`}</p>

            {restrictedTimeslot && (
              <p>Du har valt en begränsad tidsperiod. Detta
          kräver administratörens godkännande.</p>
            )}

            <Button onClick={handleComfirm}>Comfirm</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </div>
      )}
    </>
  )
}