import React from "react";
import { Button } from "../ButtonMain";

const modal = props => (
  <React.Fragment>
    <div className="backdrop" />
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
          <Button status={props.buttonStatus} action={props.onConfirm}>
            {props.confirmText}
          </Button>
        )}
      </section>
    </div>
  </React.Fragment>
);

export default modal;
