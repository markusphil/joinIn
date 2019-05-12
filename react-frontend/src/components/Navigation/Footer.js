import React from "react";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer>
      <NavLink to="/about" activeClassName="active">
        About
      </NavLink>
      <p>
        made to learn by{" "}
        <a href="https://github.com/markusphil">Markus Philipp</a> (April - May
        2019)
      </p>
    </footer>
  );
};
