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
                    description
                    date
                    location
                    teaserImage
                    creator {
                      _id
                      name
                      profilePic
                    } 
                    attendees {
                        _id
                        name
                        profilePic
                    }
                  }
              }
          }`
  };
  return graphRequest(requestBody, token);
};
