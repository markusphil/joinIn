import React from "react";

import { Avatar } from "../../user/Avatar";
export const VistorTeaser = props => {
  const prevVisitors = props.selectedEvent.attendees.slice(0, 3);
  const visitorsCount =
    props.selectedEvent.attendees.length - prevVisitors.length;

  return (
    <div className="visitors-teaser-box" onClick={props.showVisitorsHandler}>
      <Avatar img={props.selectedEvent.creator.profilePic} />
      {prevVisitors.map(vis => (
        <Avatar img={vis.profilePic} type="secondary" key={vis._id} />
      ))}
      {visitorsCount > 0 && <p>+ {visitorsCount}</p>}
    </div>
  );
};
