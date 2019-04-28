import React from "react";
import classnames from "classnames";

import { Textfit } from "react-textfit";
import { EventInfo } from "./EventDetails/EventInfo";

export const EventCard = props => (
  <li
    key={props.eventId}
    className={
      props.attendees.some(x => x._id === props.userId)
        ? classnames("event-card", "attendee")
        : "event-card"
    }
    style={
      props.img
        ? { backgroundImage: `url("${props.img}")` }
        : {
            backgroundImage: `url("https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png")`
          }
    }
    onClick={props.onDetail.bind(this, props.eventId)}
  >
    <div
      className={
        props.userId === props.creatorId
          ? classnames("event-card-body", "creator")
          : "event-card-body"
      }
    >
      <Textfit max={30} className="event-card-title">
        {props.title}
      </Textfit>
      <EventInfo location={props.location} date={props.date} />
    </div>
  </li>
);
