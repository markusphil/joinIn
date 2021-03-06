import React, { useContext } from "react";

import GlobalContext from "../../context/main-context";

import { EventCard } from "./EventCard";
import { EventDetails } from "./EventDetails";
import { Spinner } from "../core/Spinner";

export const EventList = props => {
  const context = useContext(GlobalContext);

  const showDetailHandler = eventId => {
    const event = props.events.find(e => e._id === eventId);
    context.setSelected(event);
  };

  const events = props.events.map(event => {
    return (
      <EventCard
        key={event._id}
        eventId={event._id}
        title={event.title}
        location={event.location}
        date={event.date}
        img={event.teaserImage}
        creatorId={event.creator._id}
        userId={context.userId}
        onDetail={showDetailHandler}
        attendees={event.attendees}
      />
    );
  });

  return (
    <React.Fragment>
      {context.selectedEvent && (
        <EventDetails
          token={context.token}
          userId={context.userId}
          selectedEvent={context.selectedEvent}
          closeModal={props.closeModal}
          history={props.history}
        />
      )}
      {context.isLoading ? (
        <Spinner />
      ) : (
        <ul className="event-list">{events}</ul>
      )}
    </React.Fragment>
  );
};
