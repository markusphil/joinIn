import React from "react";

export const DetailsBody = props => (
  <div className="event-details-body">
    <p>location: {props.selectedEvent.location}</p>
    <p>Date: {new Date(props.selectedEvent.date).toLocaleDateString()}</p>
    <p>Time: {new Date(props.selectedEvent.date).toLocaleTimeString()}</p>
    <p>Description: {props.selectedEvent.description}</p>
    {props.relatedBooking && (
      <p>
        You joined at:{" "}
        {new Date(props.relatedBooking.createdAt).toLocaleDateString()}
      </p>
    )}
  </div>
);
