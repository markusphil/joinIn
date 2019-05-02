import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import GlobalContext from "../../context/main-context";
import { Avatar } from "../user/Avatar";
import { Logo } from "./Logo";
import { UserMenu } from "./UserMenu";
import { UserForm } from "../user/UserForm";

export const MainNavigation = props => {
  const context = useContext(GlobalContext);
  const [umOpen, setUmOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const openUmHandler = () => {
    setUmOpen(!umOpen);
  };

  const logoutHandler = () => {
    context.logout();
    setUmOpen(false);
  };

  const openFormHandler = () => {
    setFormOpen(!formOpen);
    setUmOpen(false);
  };

  return (
    <React.Fragment>
      <header className="main-nav">
        <div className="main-nav-logo">
          <Logo />{" "}
          <h1>
            join<span className="title-contrast">in</span>
          </h1>
        </div>
        <nav className="main-nav-items">
          <ul>
            <li>
              <NavLink to="/explore" activeClassName="active">
                explore
              </NavLink>
            </li>
            {context.token && (
              <React.Fragment>
                <li>
                  <NavLink to="/myevents" activeClassName="active">
                    my events
                  </NavLink>
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
            <div className="main-nav-avatar" onClick={openUmHandler}>
              <Avatar img={context.profilePic} />
            </div>
            {umOpen && (
              <UserMenu logout={logoutHandler} openModal={openFormHandler} />
            )}
          </div>
        )}
      </header>
      {formOpen && <UserForm closeModal={openFormHandler} context={context} />}
    </React.Fragment>
  );
};
