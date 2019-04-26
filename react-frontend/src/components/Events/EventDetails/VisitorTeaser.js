import React from "react";

import { Avatar } from "../../user/Avatar";
export const VistorTeaser = props => {
  const prevVisitors = props.selectedEvent.attendees.slice(0, 3);
  const visitorsCount =
    props.selectedEvent.attendees.length - prevVisitors.length;

  return (
    <div className="visitors-teaser-box">
      <Avatar img={props.selectedEvent.creator.profilePic} />
      {prevVisitors.map(vis => (
        <Avatar img={vis.profilePic} />
      ))}
      <p>+ {visitorsCount}</p>
    </div>
  );
};
