import useSWR from "swr";
import AutoForm from "../form/form";

const AddCalendarSubscription = ({ create }) => {
  const { data, mutate } = useSWR("/booking/item-pools/");

  const defaults = {
    include_bookings: false,
    include_events_attending: false,
    include_events_not_attending: false,
    include_bookable_items: data,
  };
  return (
    <AutoForm
      endpoint="/account/calendar-subscriptions/"
      customFetcher={create}
      defaults={defaults}
    />
  );
};

export default AddCalendarSubscription;
