import React from "react";
import { CloseButton } from "../buttons/CloseButton";

const modal = props => (
  <React.Fragment>
    <div className="backdrop" />
    <div className="modal">
      <div className="close-btn-wrapper" onClick={props.onCancel}>
        <CloseButton type="close" />
      </div>
      {props.children}
    </div>
  </React.Fragment>
);

export default modal;
