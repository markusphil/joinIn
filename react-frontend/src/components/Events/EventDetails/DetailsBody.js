import React from "react";
import { VistorTeaser } from "./VisitorTeaser";

export const DetailsBody = props => (
  <React.Fragment>
    <div
      className="event-details-teaser"
      style={
        props.selectedEvent.teaserImage
          ? { backgroundImage: `url("${props.selectedEvent.teaserImage}")` }
          : {
              backgroundImage: `url("https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png")`
            }
      }
    />
    <div className="event-details-body">
      <h1>{props.selectedEvent.title}</h1>
      <p>location: {props.selectedEvent.location}</p>
      <p>Date: {new Date(props.selectedEvent.date).toLocaleDateString()}</p>
      <p>Time: {new Date(props.selectedEvent.date).toLocaleTimeString()}</p>
      <VistorTeaser selectedEvent={props.selectedEvent} />
      <p>Description: {props.selectedEvent.description}</p>
      {props.relatedBooking && (
        <p>
          You joined at:{" "}
          {new Date(props.relatedBooking.createdAt).toLocaleDateString()}
        </p>
      )}
    </div>
  </React.Fragment>
);
