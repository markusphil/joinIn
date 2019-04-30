import React, { Component } from "react";

import GlobalContext from "../context/main-context";

import { eventsRequest } from "../requests/events";

import { EventList } from "../components/events/EventList";
import { EventForm } from "../components/events/EventForm";
import { AddButton } from "../components/buttons/AddButton";

class ExplorePage extends Component {
  state = {
    addEvent: false
  };

  //Property to check if component is active (cleanup)
  isActive = true;

  static contextType = GlobalContext;

  componentDidMount() {
    this.fetchEvents();
  }
  componentWillUnmount() {
    this.isActive = false;
  }

  fetchEvents() {
    this.context.startLoading();

    eventsRequest()
      .then(resData => {
        const events = resData.data.events;
        if (this.isActive) {
          this.context.updateEvents(events);
          this.context.finishLoading();
        }
      })
      .catch(err => {
        this.context.updateMessage("error", err.message);
        console.log(err);
        if (this.isActive) {
          this.context.finishLoading();
        }
      });
  }

  openEventFromHandler = () => {
    this.setState({ addEvent: true });
  };
  closeModalHandler = () => {
    this.setState({ addEvent: false });
    this.context.clearSelected();
  };

  addEventHandler = resData => {
    const updatedEvents = [...this.context.events];
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
    this.context.updateEvents(updatedEvents);
  };

  render() {
    return (
      <React.Fragment>
        {this.state.addEvent && (
          <EventForm
            token={this.context.token}
            addEvent={this.addEventHandler}
            closeModal={this.closeModalHandler}
            expfunc={this.context.checkExpiration}
            setMessage={this.context.updateMessage}
          />
        )}
        <div>
          <h1>Explore upcoming Events</h1>
          {this.context.token && (
            <AddButton type="add-event" action={this.openEventFromHandler} />
          )}
        </div>
        <EventList
          events={this.context.events}
          closeModal={this.closeModalHandler}
          history={this.props.history}
        />
      </React.Fragment>
    );
  }
}

export default ExplorePage;
