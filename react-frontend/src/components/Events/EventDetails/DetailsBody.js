import React from "react";
import { VistorTeaser } from "./VisitorTeaser";
import { VistorList } from "./VisitorList";
import { EventInfo } from "./EventInfo";
import SimpleBar from "simplebar-react";

import "simplebar/dist/simplebar.min.css";

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
    {!props.showVisitors && (
      <VistorTeaser
        selectedEvent={props.selectedEvent}
        showVisitorsHandler={props.showVisitorsHandler}
      />
    )}
    {props.showVisitors && (
      <VistorList
        selectedEvent={props.selectedEvent}
        showVisitorsHandler={props.showVisitorsHandler}
      />
    )}
    <div className="event-details-body">
      <SimpleBar style={{ height: "100%", width: "100%" }}>
        <h1>{props.selectedEvent.title}</h1>
        <table>
          <tbody>
            <tr>
              <td>
                <EventInfo
                  location={props.selectedEvent.location}
                  date={props.selectedEvent.date}
                />
              </td>
              <td>
                {props.relatedBooking && (
                  <p>
                    You joined at:{" "}
                    {new Date(
                      props.relatedBooking.createdAt
                    ).toLocaleDateString()}
                  </p>
                )}
                {props.selectedEvent.creator._id === props.userId && (
                  <p>You are the creator of this event</p>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <p>{props.selectedEvent.description}</p>
      </SimpleBar>
    </div>
  </React.Fragment>
);
