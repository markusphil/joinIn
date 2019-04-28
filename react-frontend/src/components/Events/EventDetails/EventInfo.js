import React from "react";
import { Textfit } from "react-textfit";

import { DateIcon } from "../../../icons/DateIcon";
import { TimeIcon } from "../../../icons/TimeIcon";
import { LocationIcon } from "../../../icons/LocationIcon";
export const EventInfo = props => (
  <table className="event-info">
    <tbody>
      <tr>
        <td>
          <LocationIcon />
        </td>
        <td>
          <Textfit max={14} className="location-text">
            {props.location}
          </Textfit>
        </td>
      </tr>
      <tr>
        <td>
          <DateIcon />
        </td>
        <td>{new Date(props.date).toLocaleDateString()}</td>
      </tr>
      <tr>
        <td>
          <TimeIcon />
        </td>
        <td>{new Date(props.date).toLocaleTimeString()}</td>
      </tr>
    </tbody>
  </table>
);
