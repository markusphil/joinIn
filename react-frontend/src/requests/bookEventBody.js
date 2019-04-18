export const bookEventRequestBody = id => {
  return {
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
};
