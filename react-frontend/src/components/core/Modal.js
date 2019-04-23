import React from "react";
import { Button } from "../buttons/ButtonMain";
import { CloseButton } from "../buttons/CloseButton";

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
          <CloseButton action={props.onCancel} type="close" />
        )}
        {props.canConfirm && (
          <Button
            status={props.buttonStatus}
            action={props.onConfirm}
            type={props.buttonType}
          >
            {props.confirmText}
          </Button>
        )}
      </section>
    </div>
  </React.Fragment>
);

export default modal;
