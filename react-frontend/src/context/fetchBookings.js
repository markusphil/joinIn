import { bookingsRequest } from "../requests/bookings";

export const fetchBookings = context => {
  context.startLoading();

  return bookingsRequest(context.token, context.checkExpiration)
    .then(resData => {
      const fetchedBookings = resData.data.bookings;
      context.updateBookings(fetchedBookings);
      context.finishLoading();
      return fetchedBookings;
    })
    .catch(err => {
      console.log(err);
      context.finishLoading();
    });
};
