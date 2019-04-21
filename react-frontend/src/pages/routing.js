import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

//Import Pages
import AuthPage from "./auth";
import MyEventsPage from "./myevents";
import ExplorePage from "./explore";

//Import Context
import GlobalContext from "../context/main-context";

export const Routes = () => (
  <GlobalContext.Consumer>
    {context => {
      return (
        <Switch>
          {" "}
          {/*Switch makes sure that only the first fitting route will be rendered*/}
          {context.token && <Redirect path="/" to="/explore" exact />}
          {context.token && <Redirect path="/auth" to="/explore" exact />}
          {!context.token && <Route path="/auth" component={AuthPage} />}
          {context.token && <Route path="/myevents" component={MyEventsPage} />}
          <Route path="/explore" component={ExplorePage} />
          {!context.token && <Redirect to="/auth" exact />}
        </Switch>
      );
    }}
  </GlobalContext.Consumer>
);
