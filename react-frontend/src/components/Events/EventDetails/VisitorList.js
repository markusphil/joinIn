import React from "react";
import SimpleBar from "simplebar-react";

import { Avatar } from "../../user/Avatar";
import { CloseButton } from "../../buttons/CloseButton";

import "simplebar/dist/simplebar.min.css";

export const VistorList = props => {
  return (
    <div className="visitors-list-wrapper">
      <CloseButton action={props.showVisitorsHandler} type="close" />
      <SimpleBar style={{ height: "100%" }}>
        <table className="visitors-table">
          <tbody>
            <tr>
              <td>
                <Avatar img={props.selectedEvent.creator.profilePic} />
              </td>
              <td> {props.selectedEvent.creator.name} </td>
            </tr>
            {props.selectedEvent.attendees.map(vis => (
              <tr key={vis._id}>
                <td>
                  <Avatar img={vis.profilePic} type="secondary" />
                </td>
                <td> {vis.name} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SimpleBar>
    </div>
  );
};
