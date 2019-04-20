import { graphRequest } from "./Request";

export const bookingsRequest = token => {
  let requestBody = {
    query: `
           query {
              bookings {
                  _id
                  createdAt
                  updatedAt
                  event {
                      _id
                      title
                      date
                      location
                  }
              }
          }`
  };
  return graphRequest(requestBody, token);
};
