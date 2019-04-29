import { graphRequest } from "./Request";

export const bookEventRequest = (id, token, expfunc) => {
  let requestBody = {
    query: `
               mutation BookEvent ($id: ID!) {
                  bookEvent (eventId: $id) {
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
              }`,
    variables: {
      id: id
    }
  };
  return graphRequest(requestBody, token, expfunc);
};
