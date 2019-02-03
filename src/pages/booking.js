import React from 'react'
import { LoadingContext } from '../components/layout'
import Booking from '../components/booking/'

const BookingPage = () => (
  <LoadingContext.Consumer>
    {loading => <Booking setLoading={loading.set} />}
  </LoadingContext.Consumer>
)

export default BookingPage
