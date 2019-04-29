import { graphRequest } from "./Request";

export const cancelBookingRequest = (id, token, expfunc) => {
  let requestBody = {
    query: `
            mutation CancelBooking($id: ID!) {
                cancelBooking (bookingId: $id) {
                    _id
                    title        
                }
            }`,
    variables: { id: id }
  };
  return graphRequest(requestBody, token, expfunc);
};
