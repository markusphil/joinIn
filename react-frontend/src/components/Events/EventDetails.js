import React from "react";

import Modal from "../Modal/Modal";
import { graphRequest } from "../../requests/Request";
import { bookEventRequestBody } from "../../requests/bookEventBody";

export const EventDetails = props => {
  const { token, selectedEvent, closeModal } = props;

  const bookEventHandler = () => {
    if (!token) {
      closeModal();
      return;
    }

    graphRequest(bookEventRequestBody(selectedEvent._id), token)
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
        confirmText={token ? "Book Event" : "go to Login"}
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
