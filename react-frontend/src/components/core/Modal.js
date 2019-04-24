import React from "react";
import { CloseButton } from "../buttons/CloseButton";

const modal = props => (
  <React.Fragment>
    <div className="backdrop" />
    <div className="modal">
      <header>
        <h1>{props.title}</h1>
      </header>
      <CloseButton action={props.onCancel} type="close" />
      <section className="modal-content">{props.children}</section>
    </div>
  </React.Fragment>
);

export default modal;
