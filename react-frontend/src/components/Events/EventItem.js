import React from "react";

export const EventItem = props => (
  <li
    key={props.eventId}
    className="event-card"
    style={
      props.img
        ? { backgroundImage: `url("${props.img}")` }
        : {
            backgroundImage: `url("https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png")`
          }
    }
  >
    <div className="event-card-body">
      <h2>{props.title}</h2>
      <p>{props.location}</p>
      <p>{new Date(props.date).toLocaleDateString()}</p>
      <div>
        {props.userId === props.creatorId ? (
          <p>You are the owner of this event.</p>
        ) : (
          <button
            className="btn"
            onClick={props.onDetail.bind(this, props.eventId)}
          >
            View Details
          </button>
        )}
      </div>
    </div>
  </li>
);
