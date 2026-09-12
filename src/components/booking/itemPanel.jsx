import {
  bookingButtonContainer,
  itemDescription,
} from "../../scss/booking.module.scss";
import useModal from "../modal/useModal";
import { Button } from "../ui/buttons";
import ImageHeader from "../ui/imageHeader";
import BookingCalendar from "./bookingCalendar";
import EditBooking from "./editBooking";

const ItemPoolPanel = ({ pool, bookings, createBooking, loadAllBookings }) => {
  const [openModal] = useModal(EditBooking);

  return (
    <div>
      <ImageHeader
        title={pool.name}
        image={pool.image_processed ? pool.image_processed : null}
        TitleTag="h2"
      />
      {pool.items.length > 1 && (
        <>
          <h3>Antal</h3>
          <p className={itemDescription}>{pool.items.length}</p>
        </>
      )}
      <h3>Beskrivning</h3>
      <p className={itemDescription}>{pool.description}</p>
      <h3>Tillgänglighet</h3>
      <BookingCalendar bookings={bookings} />
      <h3>Boka</h3>
      {pool.terms && (
        <p>
          {`Genom att boka ${pool.name} godkänner du `}
          <a href={pool.terms} target="_blank" rel="noopener noreferrer">
            bokningsavtalet
          </a>
          {"."}
        </p>
      )}
      <div className={bookingButtonContainer}>
        <Button
          onClick={() =>
            openModal(`Boka ${pool.name}`, { itemPool: pool, createBooking })
          }
        >
          {`Boka ${pool.name}`}
        </Button>
        <Button onClick={loadAllBookings}>Ladda in äldre bokningar</Button>
      </div>
    </div>
  );
};

export default ItemPoolPanel;
