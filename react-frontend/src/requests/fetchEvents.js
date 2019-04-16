import { graphRequest } from "./Request";

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

export const fetchEvents = () => {
  //this.setState({ isLoading: true }); How do I manage the state without redux? Can I use hooks??

  graphRequest(requestBody)
    .then(resData => {
      const events = resData.data.events;
      console.log(events);
      if (this.isActive) {
        this.setState({ fetchedEvents: events, isLoading: false });
      }
    })
    .catch(err => {
      console.log(err);
      if (this.isActive) {
        this.setState({ isLoading: false });
      }
    });
};
