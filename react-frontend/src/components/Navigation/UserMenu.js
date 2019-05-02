import React from "react";

export const UserMenu = props => (
  <div className="user-menu">
    <ul className="user-menu-list">
      <li onClick={props.openModal}>Change Info</li>
      <li onClick={props.logout}>logout</li>
    </ul>
  </div>
);
