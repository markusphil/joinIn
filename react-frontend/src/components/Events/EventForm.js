import React, { useRef } from "react";

import Modal from "../Modal/Modal";
import { createEventRequest } from "../../requests/createEvent";

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
      console.log("enter valid Data"); //show real error message here!
      return;
    }
    props.closeModal();

    createEventRequest(eventInput, props.token)
      .then(resData => {
        props.addEvent(resData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Modal
        title="Add Event"
        canCancel
        canConfirm
        onCancel={props.closeModal}
        onConfirm={confirmModalHandler}
        confirmText={"Create Event"}
      >
        <form>
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" ref={titleRef} />

            <label htmlFor="date">Date</label>
            <input type="datetime-local" id="date" ref={dateRef} />

            <label htmlFor="location">Location</label>
            <input type="text" id="location" ref={locationRef} />

            <label htmlFor="teaser-img">Teaser Image</label>
            <input type="text" id="teaser-img" ref={teaserImageRef} />

            <label htmlFor="description">Description</label>
            <textarea id="description" rows="4" ref={descriptionRef} />
          </div>
        </form>
      </Modal>
    </React.Fragment>
  );
};
