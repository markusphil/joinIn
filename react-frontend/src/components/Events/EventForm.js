import React, { useRef } from "react";

import Modal from "../core/Modal";
import { createEventRequest } from "../../requests/createEvent";
import { Button } from "../buttons/ButtonMain";

export const EventForm = props => {
  //using Hooks for Refs
  const titleRef = useRef(null);
  const locationRef = useRef(null);
  const dateRef = useRef(null);
  const descriptionRef = useRef(null);
  const teaserImageRef = useRef(null);

  const confirmModalHandler = () => {
    const eventInput = {
      title: titleRef.current.value,
      location: locationRef.current.value,
      date: dateRef.current.value,
      description: descriptionRef.current.value,
      teaserImage: teaserImageRef.current.value
    };

    if (
      eventInput.title.trim().length === 0 ||
      eventInput.location.trim().length === 0 ||
      eventInput.date.trim().length === 0 ||
      eventInput.description.trim().length === 0
    ) {
      props.setMessage("error", "enter valid Data");
      return;
    } else if (
      eventInput.teaserImage.length > 0 &&
      eventInput.teaserImage.substring(0, 4) !== "http"
    ) {
      props.setMessage("error", "enter valid URL");
      return;
    }

    props.closeModal();

    createEventRequest(eventInput, props.token, props.expfunc)
      .then(resData => {
        props.addEvent(resData);
        props.setMessage("success", "created Event");
      })
      .catch(err => {
        props.setMessage("error", err.message);
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Modal onCancel={props.closeModal}>
        <form className="event-form">
          <h1 className="form-title">Add Event</h1>
          <div className="form-input-50">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" ref={titleRef} />
          </div>
          <div className="form-input-50">
            <label htmlFor="date">Date</label>
            <input type="datetime-local" id="date" ref={dateRef} />
          </div>
          <div className="form-input-50">
            <label htmlFor="location">Location</label>
            <input type="text" id="location" ref={locationRef} />
          </div>
          <div className="form-input-50">
            <label htmlFor="teaser-img">Teaser Image</label>
            <input type="text" id="teaser-img" ref={teaserImageRef} />
          </div>
          <div className="form-text-area">
            <label htmlFor="description">Description</label>
            <textarea id="description" rows="6" ref={descriptionRef} />
          </div>
        </form>
        <div className="modal-actions">
          <Button
            status="primary"
            action={confirmModalHandler}
            type="create_event"
          >
            Create Event
          </Button>
        </div>
      </Modal>
    </React.Fragment>
  );
};
