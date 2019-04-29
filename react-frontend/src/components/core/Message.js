import React from "react";
import classnames from "classnames";

import { CloseButton } from "../buttons/CloseButton";

export const Message = props => (
  <div className={classnames("message-container", props.status)}>
    <div className="message-state">
      <strong>{props.status}:</strong>
    </div>
    <div className="message-text">{props.text}</div>
    <div className="message-button" onClick={props.action}>
      <CloseButton />
    </div>
  </div>
);
