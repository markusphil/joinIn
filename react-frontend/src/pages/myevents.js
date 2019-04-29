import React, { Component } from "react";

import GlobalContext from "../context/main-context";

import { Spinner } from "../components/core/Spinner";
import { EventList } from "../components/events/EventList";
import { TabsControl } from "../components/navigation/TabsControl";
import { fetchBookings } from "../context/fetchBookings";
import { createdEventsRequest } from "../requests/userCreatedEvents";

class MyEventsPage extends Component {
  state = {
    createdEvents: [],
    isJoinedList: true
  };
  static contextType = GlobalContext;

  componentDidMount() {
    fetchBookings(this.context);
    this.context.token && this.fetchCreatedEvents();
  }

  fetchCreatedEvents = () => {
    this.context.startLoading();
    createdEventsRequest(this.context.token, this.context.checkExpiration)
      .then(resData => {
        const fetchedEvents = resData.data.user.createdEvents;
        this.setState({ createdEvents: fetchedEvents });
        this.context.finishLoading();
      })
      .catch(err => {
        this.context.updateMessage("error", err.message);
        this.context.finishLoading();
      });
  };

  changeTabHandler = () => {
    this.setState(state => {
      return { isJoinedList: !state.isJoinedList };
    });
  };

  getEvents = bookings => {
    const events = bookings.map(booking => booking.event);
    return events;
  };

  render() {
    return (
      <React.Fragment>
        <TabsControl
          activeTab={this.state.isJoinedList}
          onChange={this.changeTabHandler}
          tab1="Joined Events"
          tab2="Created Events"
        />
        {this.state.isJoinedList === true ? (
          this.context.isLoading ? (
            <Spinner />
          ) : (
            <EventList
              events={this.getEvents(this.context.bookings)}
              closeModal={() => this.context.clearSelected()}
              history={this.props.history}
            />
          )
        ) : (
          <EventList
            events={this.state.createdEvents}
            closeModal={() => this.context.clearSelected()}
            history={this.props.history}
          />
        )}
      </React.Fragment>
    );
  }
}

export default MyEventsPage;
