import { graphRequest } from "./Request";
//future improvements: creator data must not be fetched since all user data are allready available

export const createdEventsRequest = (token, expfunc) => {
  let requestBody = {
    query: `
               query {
                  user {
                      createdEvents {
                        _id
                        title
                        description
                        date
                        location
                        teaserImage 
                        attendees {
                            _id
                            name
                            profilePic
                        }
                      }
                  }
              }`
  };
  return graphRequest(requestBody, token, expfunc);
};
