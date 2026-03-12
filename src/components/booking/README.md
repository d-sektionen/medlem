# Booking calendar
Booking calenendar was updated in may 2025. The previous implementation was based on an svg implementation. The new is responsive and built with html and css instead. Some code needed to be reused to fit with the old systems.

## New features

* New design in Figma
* BookingItemSelector component
* Alert-message component (for notifying about restricted periods)
* New responsive calendar component with:
* Unique color per user
* Booking name and time
* Restricted periods in background
* Info popup when clicking on booking
* Sidebar component for selecting booking time/date
* Popup for confirming and submitting booking details
* New component for displaying your own bookings

## Improvement suggestions

The following are some further improvements we did not have the time to implement:

* Edit button for the modal when clicking an event in the calendar
* Show preview in calendar when selecting times for new booking in the createNewBooking component
* Better error handling in the form
* Some css/styling cleanup
* Improve data fetching/sending and state management. Currently there is a lot of prop drilling and it could probably be improved.
* Dynamic stylings could probably be improved. Likr in the calendarEvent component
* The default colors for the calendar events is hardcoded and could probably be handled better
