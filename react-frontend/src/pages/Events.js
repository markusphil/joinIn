import React, { Component } from "react";

import AuthContext from "../context/auth-context";

import { eventsRequest } from "../requests/events";

import { EventList } from "../components/Events/EventList";
import { EventDetails } from "../components/Events/EventDetails";
import { EventForm } from "../components/Events/EventForm";
import { Spinner } from "../components/Spinner/Spinner";

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

  //LifecycleMethods
  componentDidMount() {
    this.fetchEvents();
  }
  componentWillUnmount() {
    this.isActive = false;
  }

  fetchEvents() {
    this.setState({ isLoading: true });

    eventsRequest()
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
  showDetailHandler = eventId => {
    this.setState(prevState => {
      const selectedEvent = prevState.fetchedEvents.find(
        e => e._id === eventId
      );
      return { selectedEvent: selectedEvent };
    });
  };
  addEventHandler = resData => {
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
        },
        attendees: []
      });
      return { fetchedEvents: updatedEvents };
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.modalOpen && (
          <EventForm
            token={this.context.token}
            addEvent={this.addEventHandler}
            closeModal={this.closeModalHandler}
          />
        )}
        {this.state.selectedEvent && (
          <EventDetails
            token={this.context.token}
            selectedEvent={this.state.selectedEvent}
            closeModal={this.closeModalHandler}
          />
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
