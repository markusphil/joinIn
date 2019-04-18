import React from "react";

import { EventItem } from "./EventItem";

export const EventList = props => {
  const events = props.events.map(event => {
    return (
      <EventItem
        key={event._id}
        eventId={event._id}
        title={event.title}
        location={event.location}
        date={event.date}
        img={event.teaserImage}
        creatorId={event.creator._id}
        userId={props.authUserId}
        onDetail={props.onViewDetail}
      />
    );
  });
  return <ul className="event-list">{events}</ul>;
};
