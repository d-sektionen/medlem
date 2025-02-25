import React, {useState} from "react";
import { formItem, popup, popupContent, textArea, wrapper, inlineInput, errorStyle} from "./bookingModal.module.scss";
import { Button } from "../ui/buttons";
import { post } from '../request'
import { useCloseModal } from '../modal/useModal'
import { formatDate } from "./bookingUtils";
export const BookingModal = ({selectedItem, formValues, mutateBooking, bookings}) => {
  const [restrictedTimeslot, setRestrictedTimeslot] = useState(false);
  const [description, setDescription] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [errors, setErrors] = useState({});
  console.log("Selecteditem", selectedItem)
  const close = useCloseModal()

  /*const formatDate = (dateString, hourString) => {
    return new Date(`${dateString}T${hourString}`);
  }*/

  const handleBooking = (e) => {
    e.preventDefault();
      if (!acceptTerms) {
        setErrors({
          ...errors,
          acceptTerms: "Du behöver godkänna villkoren för att gå vidare!"
        })
        return
      } 
      saveBooking();
  }

  const createBooking = async data => {
    const { data: newBooking } = await post('/booking/bookings/', data)
    mutateBooking([...bookings, newBooking])
    return newBooking
  }

  const saveBooking = () => {
    const request = createBooking({
      item_id: selectedItem.id,
      description,
      start: formatDate(formValues.startDate, formValues.startTime),
      end: formatDate(formValues.endDate, formValues.endTime),
      restricted_timeslot: restrictedTimeslot,
    })

    request
      .then(() => {
        setErrors({})
        close()
      })
      .catch(err => {
        console.log("error one:", err)
        setErrors({
          ...errors,
          ...err.response?.data
        })
        console.log("error two:", err)
        console.log(err.response?.data)
      })
  }
  
  if (!formValues) {
    return <p>Loading...</p>
  }
  return (
    <>
      <form onSubmit={handleBooking} className={wrapper}>
            <p>{`Startdatum: ${formValues?.startDate} ${formValues.startTime}`}</p>
            <p className={errorStyle}>{errors.start}</p>
            <p>{`Slutdatum: ${formValues?.endDate} ${formValues.endTime}`}</p>
            <p className={errorStyle}>{errors.end}</p>
            <br></br>
        <label for="description">Ändamål</label><br></br>
        <textarea name="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Skriv ditt ändamål här" className={textArea}></textarea>
        <p className={errorStyle}>{errors.description}</p>
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
        <p className={errorStyle}>{errors.restricted_timeslot}</p>
    
      <div className={inlineInput}>
      <input type="checkbox"
      checked={acceptTerms}
      onChange={(e)=> setAcceptTerms(e.target.checked)}/>
      <p>Jag har läst och godkänner <a href={selectedItem.terms}>bokningsavtalet</a>.</p>
      </div>
      <p className={errorStyle}>{errors.acceptTerms}</p>
      <p className={errorStyle}>{errors.non_field_errors}</p>
      
      <Button type="submit">Boka</Button> 
      </form>
    </>
  )
}