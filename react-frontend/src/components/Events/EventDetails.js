import React from "react";

import Modal from "../core/Modal";
import { bookEventRequest } from "../../requests/bookEvent";

export const EventDetails = props => {
  const { token, selectedEvent, closeModal, history } = props;

  const bookEventHandler = () => {
    if (!token) {
      closeModal();
      history.push("/auth");
      return;
    }

    bookEventRequest(selectedEvent._id, token)
      .then(resData => {
        console.log(resData);
        closeModal();
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <React.Fragment>
      <Modal
        title={selectedEvent.title}
        canCancel
        canConfirm
        onCancel={closeModal}
        onConfirm={bookEventHandler}
        confirmText={token ? "Join" : "to Login"}
      >
        <div>
          <p>location: {selectedEvent.location}</p>
          <p>Date: {selectedEvent.date}</p>
          <p>Description: {selectedEvent.description}</p>
        </div>
      </Modal>
    </React.Fragment>
  );
};
