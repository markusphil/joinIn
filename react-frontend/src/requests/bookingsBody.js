export const BookingsRequestBody = {
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
