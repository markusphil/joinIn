import React from "react";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer>
      <NavLink to="/about" activeClassName="active">
        About
      </NavLink>
    </footer>
  );
};
