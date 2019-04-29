import { graphRequest } from "./Request";

export const createEventRequest = (input, token, expfunc) => {
  let requestBody = {
    query: `
                    mutation CreateEvent ($title: String!, $desc:String!, $location: String!, $date: String!, $teaserimage: String!){
                        createEvent(eventInput:{
                            title: $title,
                            location: $location,
                            description: $desc,
                            date: $date,
                            teaserImage: $teaserimage
                        
                        }) {
                            _id
                            title
                            description
                            date
                            location
                            teaserImage
                        }
                    }`,
    variables: {
      title: input.title,
      desc: input.description,
      location: input.location,
      date: input.date,
      teaserimage: input.teaserImage
    }
  };

  return graphRequest(requestBody, token, expfunc);
};
