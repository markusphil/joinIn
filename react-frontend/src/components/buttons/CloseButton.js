import React from "react";

import { CloseIcon } from "../../icons/CloseIcon";

export const CloseButton = props => (
  <button className="btn-close" type={props.type} onClick={props.action}>
    <CloseIcon width />
  </button>
);
