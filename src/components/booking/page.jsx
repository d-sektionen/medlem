import { startOfISOWeek, subWeeks } from "date-fns";
import { useState } from "react";
import useSWR from "swr";
import BigPixels from "../layout/bigPixels";
import { del, post, put } from "../request";
import { GridContainer, GridItem } from "../ui/grid";
import TitleChooser from "../ui/titleChooser";
import usePageContext from "../usePageContext";
import BookingPanel from "./bookingPanel";
import ItemPoolPanel from "./itemPanel";

/*
 * Get the date 4 weeks ago relative to the start of the current week.
 **/
const getDate4WeeksAgo = (date) => {
  return subWeeks(startOfISOWeek(date), 4).toISOString();
};

const BookingPage = () => {
  const { title } = usePageContext();

  const [pool, setPool] = useState(null);
  const [afterDate, setAfterDate] = useState(getDate4WeeksAgo(new Date()));
  const { data: pools } = useSWR("/booking/item-pools/");

  const { data: bookings, mutate } = useSWR(
    () =>
      pool &&
      `/booking/bookings/?pool=${pool.id}${
        afterDate ? `&after=${afterDate}` : ""
      }`,
  );

  const categorizedPools = pools
    ? pools.reduce((accumulator, item) => {
        const category = item.category || "Okategoriserat";

        if (Object.hasOwn(accumulator, category)) {
          accumulator[category].push(item);
        } else {
          accumulator[category] = [item];
        }

        return accumulator;
      }, {})
    : {};

  const create = async (data) => {
    const { data: newBooking } = await post("/booking/bookings/", data);
    mutate([...bookings, newBooking]);
    return newBooking;
  };

  const update = async (bookingId, data) => {
    const { data: updatedBooking } = await put(
      `/booking/bookings/${bookingId}/`,
      data,
    );
    mutate([...bookings.filter((b) => b.id !== bookingId), updatedBooking]);
    return updatedBooking;
  };

  const destroy = async (bookingId) => {
    await del(`/booking/bookings/${bookingId}/`);
    mutate(bookings.filter((b) => b.id !== bookingId));
  };

  const confirm = async (bookingId, data) => {
    await put(`/booking/bookings/${bookingId}/confirm/`, data);
    mutate(
      bookings.map((b) => {
        if (bookingId !== b.id) return b;
        return { ...b, confirmed: true };
      }),
    );
  };

  const deny = async (bookingId, data) => {
    await post(`/booking/bookings/${bookingId}/deny/`, data);
    mutate(
      bookings.filter((b) => {
        return bookingId !== b.id;
      }),
    );
  };
  const loadAllBookings = async () => {
    // Removes the after parameter from the request, thus causing all bookings to load.
    setAfterDate(null);
  };

  return (
    <BigPixels>
      <GridContainer>
        <GridItem fullWidth>
          <TitleChooser
            title={title}
            choice={pool}
            setChoice={setPool}
            categorizedChoices={categorizedPools}
            label="name"
            onChange={() => setAfterDate(getDate4WeeksAgo(new Date()))}
          />
        </GridItem>
        {pool && bookings && (
          <>
            <GridItem>
              <ItemPoolPanel
                pool={pool}
                bookings={bookings}
                createBooking={create}
                loadAllBookings={loadAllBookings}
              />
            </GridItem>
            <GridItem>
              <BookingPanel
                bookings={bookings}
                updateBooking={update}
                destroyBooking={destroy}
                confirmBooking={confirm}
                denyBooking={deny}
              />
            </GridItem>
          </>
        )}
      </GridContainer>
    </BigPixels>
  );
};

export default BookingPage;
