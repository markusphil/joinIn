import React, { Component } from "react";

//Import Context
import GlobalContext from "./main-context";

class GlobalState extends Component {
  state = {
    token: null,
    userId: null,
    userName: null,
    profilePic: null,
    isLoading: false,
    selectedEvent: null,
    events: [],
    bookings: [],
    message: {
      status: null,
      text: null
    }
  };
  //functions to handle login token
  componentWillMount() {
    localStorage.getItem("token") &&
      this.setState({
        token: localStorage.getItem("token"),
        userId: localStorage.getItem("userId"),
        userName: localStorage.getItem("userName"),
        profilePic: localStorage.getItem("profilePic")
      });
  }

  login = (token, userId, userName, profilePic, tokenExpiration) => {
    this.setState({
      token: token,
      userId: userId,
      userName: userName,
      profilePic: profilePic
    });
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
    localStorage.setItem("profilePic", profilePic);
  };

  logout = () => {
    this.setState({
      token: null,
      userId: null,
      userName: null,
      profilePic: null
    });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("profilePic");
  };
  //loading state
  startLoading = () => {
    this.setState({ isLoading: true });
  };

  finishLoading = () => {
    this.setState({ isLoading: false });
  };
  //selected event (Event Details)
  setSelected = event => {
    this.setState({ selectedEvent: event });
  };

  clearSelected = () => {
    this.setState({ selectedEvent: null });
  };
  //Events / Bookings lists
  updateEvents = newArray => {
    this.setState({ events: newArray });
  };

  updateBookings = newArray => {
    this.setState({ bookings: newArray });
  };
  clearLists = () => {
    this.setState({ events: [], bookings: [] });
  };
  //Handle Messages
  updateMessage = (status, text) => {
    let newMessage = {
      status: status,
      text: text
    };
    this.setState({ message: newMessage });
  };
  clearMessage = () => {
    this.setState({ message: { status: null, text: null } });
  };

  render() {
    return (
      <GlobalContext.Provider
        value={{
          token: this.state.token,
          userId: this.state.userId,
          userName: this.state.userName,
          profilePic: this.state.profilePic,
          login: this.login,
          logout: this.logout,
          isLoading: this.state.isLoading,
          startLoading: this.startLoading,
          finishLoading: this.finishLoading,
          selectedEvent: this.state.selectedEvent,
          setSelected: this.setSelected,
          clearSelected: this.clearSelected,
          events: this.state.events,
          updateEvents: this.updateEvents,
          bookings: this.state.bookings,
          updateBookings: this.updateBookings,
          clearLists: this.clearLists,
          message: this.state.message,
          updateMessage: this.updateMessage,
          clearMessage: this.clearMessage
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

export default GlobalState;
