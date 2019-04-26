import React from "react";
import { CloseButton } from "../buttons/CloseButton";

const modal = props => (
  <React.Fragment>
    <div className="backdrop" />
    <div className="modal">
      <CloseButton action={props.onCancel} type="close" />
      {props.children}
    </div>
  </React.Fragment>
);

export default modal;
