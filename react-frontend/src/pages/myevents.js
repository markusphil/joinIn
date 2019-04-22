import React, { Component } from "react";

import GlobalContext from "../context/main-context";

import { bookingsRequest } from "../requests/bookings";
import { cancelBookingRequest } from "../requests/cancelBooking";

import { Spinner } from "../components/Spinner/Spinner";
import { EventList } from "../components/Events/EventList";
import { BookingChart } from "../components/MyEvents/BookingChart";
import { BookingList } from "../components/MyEvents/BookingList";
import { TabsControl } from "../components/Navigation/TabsControl";

class MyEventsPage extends Component {
  state = {
    bookings: [],
    isJoined: true
  };
  static contextType = GlobalContext;

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = () => {
    this.setState({ isLoading: true });

    bookingsRequest(this.context.token)
      .then(resData => {
        const fetchedBookings = resData.data.bookings;
        this.setState({ bookings: fetchedBookings, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };
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
      return { isJoined: !state.isJoined };
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
          activeTab={this.state.isJoined}
          onChange={this.changeTabHandler}
          tab1="Joined Events"
          tab2="Created Events"
        />
        {this.state.isJoined === true ? (
          this.context.isLoading ? (
            <Spinner />
          ) : (
            <div>
              <EventList
                events={this.getEvents(this.state.bookings)}
                closeModal={() => this.context.clearSelected()}
                history={this.props.history}
              />
              <h3>Old List for Debugging:</h3>
              <BookingList
                bookings={this.state.bookings}
                onDelete={this.deleteBookingHandler}
              />
            </div>
          )
        ) : (
          <BookingChart />
        )}
      </React.Fragment>
    );
  }
}

export default MyEventsPage;
