import React from "react";
import classnames from "classnames";

import { DateIcon } from "../../icons/DateIcon";
import { TimeIcon } from "../../icons/TimeIcon";
import { LocationIcon } from "../../icons/LocationIcon";

export const EventItem = props => (
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
      <h2>{props.title}</h2>
      <span className="event-card-info">
        <LocationIcon />
        {props.location}
      </span>
      <span>
        <DateIcon />
        {new Date(props.date).toLocaleDateString()}
      </span>
      <span>
        <TimeIcon />
        {new Date(props.date).toLocaleTimeString()}
      </span>
    </div>
  </li>
);
