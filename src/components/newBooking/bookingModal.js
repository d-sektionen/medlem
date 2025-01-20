import React, {useState} from "react";
import { formItem } from "./bookingModal.module.scss";
import { Button } from "../ui/buttons";
export const BookingModal = ({formValues}) => {
  const [restrictedTimeslot, setRestrictedTimeslot] = useState(false);
  return (
    <>
      <h3>Ny bokning</h3>
      <p>{`Bokning av .`}</p>
      <p></p>
      <p></p>

      <form>
        <label for="purpose">ändamål</label><br></br>
        <input name="purpose" type="textfield" placeholder="Skriv ditt ändamål här"></input>
        <h3>
          {'Begränsad tidsperiod '}
          <input
            type="checkbox"
            checked={restrictedTimeslot}
            onChange={e => setRestrictedTimeslot(e.target.checked)}
          />
        </h3>
        <p>
          En begränsad tidsperiod låter dig skapa en tidsperiod där du har
          prioritet att skapa bokningar. En begränsad tidsperiod måste bekräftas
          av en administratör.
        </p>
      <Button>Save</Button> 
      </form>
    </>
  )
}