import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

//Import Pages
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
//Import Navbar
import {MainNavigation} from './components/Navigation/Main'

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <MainNavigation/>
          <main className="main-content">
            <Switch>  {/*Switch makes sure that only the first fitting route will be rendered*/}
              <Redirect path="/" to="/auth" exact/>
              <Route path="/auth" component={AuthPage}/>
              <Route path="/bookings" component={BookingsPage}/>
              <Route path="/events" component={EventsPage}/>
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
