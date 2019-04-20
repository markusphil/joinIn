import { graphRequest } from "./Request";

export const bookEventRequest = (id, token) => {
  let requestBody = {
    query: `
               mutation BookEvent ($id: ID!) {
                  bookEvent (eventId: $id) {
                      _id
                      createdAt
                      updatedAt
                  }
              }`,
    variables: {
      id: id
    }
  };
  return graphRequest(requestBody, token);
};
