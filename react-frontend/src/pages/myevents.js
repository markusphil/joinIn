import React, { Component } from "react";

import GlobalContext from "../context/main-context";

import { bookingsRequest } from "../requests/bookings";
import { cancelBookingRequest } from "../requests/cancelBooking";

import { Spinner } from "../components/core/Spinner";
import { EventList } from "../components/events/EventList";
import { BookingChart } from "../components/legacy/BookingChart";
import { BookingList } from "../components/legacy/BookingList";
import { TabsControl } from "../components/navigation/TabsControl";
import { fetchBookings } from "../context/fetchBookings";

class MyEventsPage extends Component {
  state = {
    bookings: [],
    isJoinedList: true
  };
  static contextType = GlobalContext;

  componentDidMount() {
    //this.fetchBookings();
    fetchBookings(this.context);
  }

  /* fetchBookings = () => {
    this.context.startLoading();

    bookingsRequest(this.context.token)
      .then(resData => {
        const fetchedBookings = resData.data.bookings;
        this.context.updateBookings(fetchedBookings);
        this.context.finishLoading();
      })
      .catch(err => {
        console.log(err);
        this.context.finishLoading();
      });
  }; */

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
            <div>
              <EventList
                events={this.getEvents(this.context.bookings)}
                closeModal={() => this.context.clearSelected()}
                history={this.props.history}
              />
              <h3>Old List for Debugging:</h3>
              <BookingList
                bookings={this.context.bookings}
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
