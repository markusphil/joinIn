import React, { Component } from "react";

import { Backdrop } from "../components/Modal/Backdrop";
import { EventList } from "../components/Events/EventList";
import AuthContext from "../context/auth-context";
import { Spinner } from "../components/Spinner/Spinner";
import { graphRequest } from "../requests/Request";
import { EventDetails } from "../components/Events/EventDetails";
import { EventForm } from "../components/Events/EventForm";
import { eventsRequestBody } from "../requests/eventsBody";

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

    graphRequest(eventsRequestBody)
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
        }
      });
      return { fetchedEvents: updatedEvents };
    });
  };

  render() {
    return (
      <React.Fragment>
        {(this.state.modalOpen || this.state.selectedEvent) && <Backdrop />}
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
