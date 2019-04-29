import React from "react";
import classnames from "classnames";

export const Message = props => (
  <div
    className={classnames("message-container", props.status)}
    onClick={props.action}
  >
    <strong>{props.status}:</strong> {props.text}
  </div>
);
