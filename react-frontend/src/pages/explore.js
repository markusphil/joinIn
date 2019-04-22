import React, { Component } from "react";

import GlobalContext from "../context/main-context";

import { eventsRequest } from "../requests/events";

import { EventList } from "../components/Events/EventList";
import { EventForm } from "../components/Events/EventForm";

class ExplorePage extends Component {
  state = {
    addEvent: false,
    fetchedEvents: []
  };
  //Property to check if component is active (cleanup)
  isActive = true;

  static contextType = GlobalContext;

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
    this.setState({ addEvent: true });
  };
  closeModalHandler = () => {
    this.setState({ addEvent: false });
    this.context.clearSelected();
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
        {this.state.addEvent && (
          <EventForm
            token={this.context.token}
            addEvent={this.addEventHandler}
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
        <EventList
          events={this.state.fetchedEvents}
          closeModal={this.closeModalHandler}
          history={this.props.history}
        />
      </React.Fragment>
    );
  }
}

export default ExplorePage;
