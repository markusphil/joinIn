export const cancelBookingRequestBody = id => {
  return {
    query: `
            mutation CancelBooking($id: ID!) {
                cancelBooking (bookingId: $id) {
                    _id
                    title        
                }
            }`,
    variables: { id: id }
  };
};
