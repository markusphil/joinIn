import React from "react";
import { AddIcon } from "../../icons/AddIcon";

export const AddButton = props => (
  <button className="btn-add" type={props.type} onClick={props.action}>
    <AddIcon />
  </button>
);
