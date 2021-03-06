import React from "react";

import { Button } from "../../buttons/ButtonMain";

export const DetailsControl = props => {
  const { context, relatedBooking, bookEvent, cancelBooking } = props;
  const placeholderAction = () => {
    context.updateMessage("warning", "Feature is not implemented yet!");
  };

  const buttonTypeChecker = () => {
    if (!context.token) {
      return (
        <Button status="inactive" action={bookEvent} type="redirect_login">
          to Login
        </Button>
      );
    } else if (relatedBooking) {
      return (
        <Button status="danger" action={cancelBooking} type="cancel">
          Cancel
        </Button>
      );
    } else if (context.selectedEvent.creator._id === context.userId) {
      return (
        <React.Fragment>
          <Button status="inactive" type="edit" action={placeholderAction}>
            edit
          </Button>
          <Button status="inactive" type="delete" action={placeholderAction}>
            delete
          </Button>
        </React.Fragment>
      );
    } else {
      return (
        <Button status="primary" action={bookEvent} type="join">
          Join
        </Button>
      );
    }
  };

  return <div className="modal-actions">{buttonTypeChecker()}</div>;
};
