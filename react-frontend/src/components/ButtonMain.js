import React from "react";
import classnames from "classnames";

export const Button = props => (
  <button
    className={classnames("btn", props.status)}
    type={props.type}
    onClick={props.action}
  >
    {props.children}
  </button>
);
