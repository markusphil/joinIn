import React from "react";
import classnames from "classnames";

import { Textfit } from "react-textfit";
import { EventInfo } from "./EventDetails/EventInfo";
import { CreatorIcon } from "../../icons/CreatorIcon";

export const EventCard = props => (
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
    onClick={props.onDetail.bind(this, props.eventId)}
  >
    {props.userId === props.creatorId && <CreatorIcon />}
    <div
      className={
        props.attendees.some(x => x._id === props.userId) ||
        props.userId === props.creatorId
          ? classnames("event-card-body", "attendee")
          : "event-card-body"
      }
    >
      <Textfit max={26} className="event-card-title">
        {props.title}
      </Textfit>
      <EventInfo location={props.location} date={props.date} />
    </div>
  </li>
);
