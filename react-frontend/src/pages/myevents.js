import React, { Component } from "react";

import GlobalContext from "../context/main-context";

import { cancelBookingRequest } from "../requests/cancelBooking";

import { Spinner } from "../components/core/Spinner";
import { EventList } from "../components/events/EventList";
import { BookingChart } from "../components/legacy/BookingChart";
import { TabsControl } from "../components/navigation/TabsControl";
import { fetchBookings } from "../context/fetchBookings";

class MyEventsPage extends Component {
  state = {
    bookings: [],
    isJoinedList: true
  };
  static contextType = GlobalContext;

  componentDidMount() {
    fetchBookings(this.context);
  }

  deleteBookingHandler = bookingId => {
    cancelBookingRequest(bookingId, this.context.token)
      .then(resData => {
        this.setState(prevState => {
          const updatedBookings = prevState.bookings.filter(booking => {
            return booking._id !== bookingId;
          });
          return { bookings: updatedBookings };
        });
        console.log(resData);
      })
      .catch(err => {
        console.log(err);
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
          <BookingChart />
        )}
      </React.Fragment>
    );
  }
}

export default MyEventsPage;
