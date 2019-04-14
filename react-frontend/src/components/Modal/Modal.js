import React from "react";

import "./Modal.css";
import { Button } from "../btn";

const modal = props => (
  <div className="modal">
    <header>
      <h1>{props.title}</h1>
    </header>
    <section className="modal-content">{props.children}</section>
    <section className="modal-actions">
      {props.canCancel && (
        <Button status="danger" action={props.onCancel}>
          Cancel
        </Button>
      )}
      {props.canConfirm && (
        <Button status="primary" action={props.onConfirm}>
          {props.confirmText}
        </Button>
      )}
    </section>
  </div>
);

export default modal;
