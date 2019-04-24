import React from "react";

export default React.createContext({
  token: null,
  userId: null,
  userName: null,
  profilePic: null,
  login: (token, userId, userName, profilePic, tokenExpiration) => {},
  logout: () => {},
  isLoading: false,
  selectedEvent: null,
  startLoading: () => {},
  finishLoading: () => {},
  setSelected: event => {},
  clearSelected: () => {},
  events: [],
  bookings: [],
  updateEvents: newArray => {},
  updateBookings: newArray => {},
  clearLists: () => {},
  message: { status: null, text: null },
  updateMessage: (status, text) => {},
  clearMessage: () => {}
});
