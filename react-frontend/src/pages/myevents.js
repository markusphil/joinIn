import React, { Component } from "react";

import GlobalContext from "../context/main-context";

import { bookingsRequest } from "../requests/bookings";
import { cancelBookingRequest } from "../requests/cancelBooking";

import { Spinner } from "../components/Spinner/Spinner";
import { BookingList } from "../components/MyEvents/BookingList";
import { BookingChart } from "../components/MyEvents/BookingChart";
import { BookingTabs } from "../components/MyEvents/BookingTabs";

class MyEventsPage extends Component {
  state = {
    bookings: [],
    activeTab: "list"
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

  changeTabHandler = activeTab => {
    if (activeTab === "list") {
      this.setState({ activeTab: "list" });
    } else {
      this.setState({ activeTab: "chart" });
    }
  };

  render() {
    let content = <Spinner />;
    if (!this.state.isLoading) {
      content = (
        <React.Fragment>
          <BookingTabs
            activeTab={this.state.activeTab}
            onChange={this.changeTabHandler}
          />
          {this.state.activeTab === "list" ? (
            <BookingList
              bookings={this.state.bookings}
              onDelete={this.deleteBookingHandler}
            />
          ) : (
            <BookingChart />
          )}
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <h1>The Bookings Page</h1>
        {content}
      </React.Fragment>
    );
  }
}

export default MyEventsPage;
