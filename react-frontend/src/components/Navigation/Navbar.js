import React from "react";
import { NavLink } from "react-router-dom";

import GlobalContext from "../../context/main-context";
import { Avatar } from "../user/Avatar";
import { Logo } from "./Logo";

export const MainNavigation = props => (
  <GlobalContext.Consumer>
    {context => {
      //Context Consumer needs function as child, wich reuturns the component

      return (
        <header className="main-nav">
          <div className="main-nav-logo">
            <Logo /> <h1>joinIn</h1>
          </div>
          <nav className="main-nav-items">
            <ul>
              <li>
                <NavLink to="/explore" activeClassName="active">
                  Explore
                </NavLink>
              </li>
              {context.token && (
                <React.Fragment>
                  <li>
                    <NavLink to="/myevents" activeClassName="active">
                      MyEvents
                    </NavLink>
                  </li>
                  <li onClick={context.logout}>
                    <button>Logout</button>
                  </li>
                </React.Fragment>
              )}
              {!context.token && (
                <li>
                  <NavLink to="/auth" activeClassName="active">
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
          {context.token && (
            <div className="main-nav-user">
              <Avatar img={context.profilePic} />
              <span>{context.userName}</span>
            </div>
          )}
        </header>
      );
    }}
  </GlobalContext.Consumer>
);
