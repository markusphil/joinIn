import React from "react";

export default React.createContext({
  token: null,
  userId: null,
  userName: null,
  profilePic: null,
  login: (token, userId, userName, profilePic, tokenExpiration) => {},
  logout: () => {}
});
