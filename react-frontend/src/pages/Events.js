import React, { Component } from "react";

import Modal from "../components/Modal/Modal";
import { Backdrop } from "../components/Modal/Backdrop";
import { EventList } from "../components/Events/EventList";
import AuthContext from "../context/auth-context";
import { Spinner } from "../components/Spinner/Spinner";
import { graphRequest } from "../requests/Request";

class EventsPage extends Component {
  state = {
    modalOpen: false,
    fetchedEvents: [],
    isLoading: false,
    selectedEvent: null
  };
  //Property to check if component is active (cleanup)
  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titelRef = React.createRef();
    this.locationRef = React.createRef();
    this.dateRef = React.createRef();
    this.descriptionRef = React.createRef();
    this.teaserImageRef = React.createRef();
  }
  //LifecycleMethods
  componentDidMount() {
    this.fetchEvents();
  }
  componentWillUnmount() {
    this.isActive = false;
  }

  fetchEvents() {
    this.setState({ isLoading: true });
    const requestBody = {
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
  }

  openModalHandler = () => {
    this.setState({ modalOpen: true });
  };
  closeModalHandler = () => {
    this.setState({ modalOpen: false, selectedEvent: null });
  };
  confirmModalHandler = () => {
    const title = this.titelRef.current.value;
    const location = this.locationRef.current.value;
    const date = this.dateRef.current.value;
    const description = this.descriptionRef.current.value;
    const teaserImage = this.teaserImageRef.current.value;

    if (
      title.trim().length === 0 ||
      location.trim().length === 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      console.log("enter valid Data"); //Add a message!
      return;
    }
    this.setState({ modalOpen: false });
    const requestBody = {
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
        title: title,
        desc: description,
        location: location,
        date: date,
        teaserimage: teaserImage
      }
    };

    const token = this.context.token;

    graphRequest(requestBody, token)
      .then(resData => {
        this.setState(prevState => {
          const updatedEvents = [...prevState.fetchedEvents];
          updatedEvents.push({
            _id: resData.data.createEvent._id,
            title: resData.data.createEvent.title,
            description: resData.data.createEvent.description,
            date: resData.data.createEvent.date,
            location: resData.data.createEvent.location,
            creator: {
              _id: this.context.userId
            }
          });
          return { fetchedEvents: updatedEvents };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  showDetailHandler = eventId => {
    this.setState(prevState => {
      const selectedEvent = prevState.fetchedEvents.find(
        e => e._id === eventId
      );
      return { selectedEvent: selectedEvent };
    });
  };
  bookEventHandler = () => {
    if (!this.context.token) {
      this.setState({ selectedEvent: null });
      return;
    }
    const requestBody = {
      query: `
             mutation BookEvent ($id: ID!) {
                bookEvent (eventId: $id) {
                    _id
                    createdAt
                    updatedAt
                }
            }`,
      variables: {
        id: this.state.selectedEvent._id
      }
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          //throw error when status is not ok
          throw new Error("connection failed!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({ selectedEvent: null });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        {(this.state.modalOpen || this.state.selectedEvent) && <Backdrop />}
        {this.state.modalOpen && (
          <Modal
            title="Add Event"
            canCancel
            canConfirm
            onCancel={this.closeModalHandler}
            onConfirm={this.confirmModalHandler}
            confirmText={"Create Event"}
          >
            <form>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titelRef} />

                <label htmlFor="date">Date</label>
                <input type="datetime-local" id="date" ref={this.dateRef} />

                <label htmlFor="location">Location</label>
                <input type="text" id="location" ref={this.locationRef} />

                <label htmlFor="teaser-img">Teaser Image</label>
                <input type="text" id="teaser-img" ref={this.teaserImageRef} />

                <label htmlFor="description">Description</label>
                <textarea id="description" rows="4" ref={this.descriptionRef} />
              </div>
            </form>
          </Modal>
        )}
        {this.state.selectedEvent && (
          <Modal
            title={this.state.selectedEvent.title}
            canCancel
            canConfirm
            onCancel={this.closeModalHandler}
            onConfirm={this.bookEventHandler}
            confirmText={this.context.token ? "Book Event" : "go to Login"}
          >
            <div>
              <p>price: {this.state.selectedEvent.price}</p>
              <p>Date: {this.state.selectedEvent.date}</p>
              <p>Description: {this.state.selectedEvent.description}</p>
            </div>
          </Modal>
        )}

        <div>
          <h1>The Events Page</h1>
          {this.context.token && (
            <button className="btn" onClick={this.openModalHandler}>
              Create Event
            </button>
          )}
        </div>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <EventList
            events={this.state.fetchedEvents}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
          />
        )}
      </React.Fragment>
    );
  }
}

export default EventsPage;
