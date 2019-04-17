import React, { useRef } from "react";

import Modal from "../Modal/Modal";
import { graphRequest } from "../../requests/Request";

export const EventForm = props => {
  //using Hooks for Refs
  const titleRef = useRef(null);
  const locationRef = useRef(null);
  const dateRef = useRef(null);
  const descriptionRef = useRef(null);
  const teaserImageRef = useRef(null);

  const confirmModalHandler = () => {
    const title = titleRef.current.value;
    const location = locationRef.current.value;
    const date = dateRef.current.value;
    const description = descriptionRef.current.value;
    const teaserImage = teaserImageRef.current.value;

    if (
      title.trim().length === 0 ||
      location.trim().length === 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      console.log("enter valid Data");
      return;
    }
    props.closeModal();
    const requestBody = {
      query: `
                    mutation CreateEvent ($title: String!, $desc:String!, $location: String!, $date: String!, $teaserimage: String!){
                        createEvent(eventInput:{
                            title: $title,
                            location: $location,
                            description: $desc,
                            date: $date,
                            teaserImage: $teaserimage
                        
                        }) {
                            _id
                            title
                            description
                            date
                            location
                            teaserImage
                        }
                    }`,
      variables: {
        title: title,
        desc: description,
        location: location,
        date: date,
        teaserimage: teaserImage
      }
    };

    graphRequest(requestBody, props.token)
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
