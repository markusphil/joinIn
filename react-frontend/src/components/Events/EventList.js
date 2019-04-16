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
        img="https://ichef.bbci.co.uk/news/660/cpsprodpb/B7B0/production/_101542074_gettyimages-956391468.jpg"
        creatorId={event.creator._id}
        userId={props.authUserId}
        onDetail={props.onViewDetail}
      />
    );
  });
  return <ul className="event-list">{events}</ul>;
};
