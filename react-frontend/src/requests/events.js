import { graphRequest } from "./Request";

export const eventsRequest = () => {
  let requestBody = {
    query: `
          query {
              events {
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
          }`
  };
  return graphRequest(requestBody);
};
