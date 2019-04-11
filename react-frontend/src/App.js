import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

//Import Pages
import AuthPage from "./pages/Auth";
import BookingsPage from "./pages/Bookings";
import EventsPage from "./pages/Events";
//Import Navbar
import { MainNavigation } from "./components/Navigation/Main";
//Import Context
import AuthContext from "./context/auth-context";

import "./App.css";

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  componentWillMount() {
    localStorage.getItem("token") &&
      this.setState({
        token: localStorage.getItem("token"),
        userId: localStorage.getItem("userId")
      });
  }

  login = (token, userId, userName, profilePic, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
    localStorage.setItem("profilePic", profilePic);
  };

  logout = () => {
    this.setState({ token: null, userId: null });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("profilePic");
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <MainNavigation />
            <main className="main-content">
              <Switch>
                {" "}
                {/*Switch makes sure that only the first fitting route will be rendered*/}
                {this.state.token && <Redirect path="/" to="/events" exact />}
                {this.state.token && (
                  <Redirect path="/auth" to="/events" exact />
                )}
                {!this.state.token && (
                  <Route path="/auth" component={AuthPage} />
                )}
                {this.state.token && (
                  <Route path="/bookings" component={BookingsPage} />
                )}
                <Route path="/events" component={EventsPage} />
                {!this.state.token && <Redirect to="/auth" exact />}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
