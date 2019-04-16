import React from "react";

export const EventItem = props => (
  <li key={props.eventId} className="event-card">
    <div
      className="event-card-teaser"
      style={props.img && { backgroundImage: `url("${props.img}")` }}
    />
    <div className="">
      <h2>{props.title}</h2>
      <p>
        {props.price}€ - {new Date(props.date).toLocaleDateString()}
      </p>
    </div>
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
  </li>
);
