import React, {useState} from "react";
import { formItem, popup, popupContent, textArea, wrapper, inlineInput, errorStyle} from "./bookingModal.module.scss";
import { Button } from "../ui/buttons";
export const BookingModal = ({selectedItem, formValues}) => {
  const [restrictedTimeslot, setRestrictedTimeslot] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [purpose, setContent] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState('');

  const handleBooking = (e) => {
    e.preventDefault();
      if (!acceptTerms) {
        setError("Du behöver godkänna villkoren för att gå vidare!")
        return
      } 
      setError("")
      setShowPopup(true);
  }

  // const handleComfirm = () => {
  //   setShowPopup(false);
  // };

  // const handleCancel = () => {
  //   setShowPopup(false);
  //   saveBooking();
  // };

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
      <form onSubmit={handleBooking} className={wrapper}>
            <p>{`Startdatum: ${formValues.startDate} ${formValues.startTime}`}</p>
            <p>{`Slutdatum: ${formValues.endDate} ${formValues.endTime}`}</p>
            <br></br>
        <label for="purpose">Ändamål</label><br></br>
        <textarea name="purpose" value={purpose} onChange={e => setContent(e.target.value)} placeholder="Skriv ditt ändamål här" className={textArea}></textarea>
        <h3>
            {'Begränsad tidsperiod '}
        </h3>
        <div className={inlineInput}>
        <input
          type="checkbox"
          checked={restrictedTimeslot}
          onChange={(e) => setRestrictedTimeslot(e.target.checked)}
        />
        <p>
          En begränsad tidsperiod låter dig skapa en tidsperiod där du har
          prioritet att skapa bokningar. En begränsad tidsperiod måste bekräftas
          av en administratör.
        </p>

        </div>
    
      <div className={inlineInput}>
      <input type="checkbox"
      checked={acceptTerms}
      onChange={(e)=> setAcceptTerms(e.target.checked)}/>
      <p>Jag har läst och godkänner <a href={selectedItem.terms}>bokningsavtalet</a>.</p>
      </div>
      {error && <p className={errorStyle}>{error}</p>}
      
      <Button type="submit">Boka</Button> 
      </form>
    </>
  )
}