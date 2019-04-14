import React from "react";

export const Avatar = props => {
  return (
    <div className="avatar-ring">
      <div
        className="avatar-img"
        style={props.img && { backgroundImage: `url("${props.img}")` }}
      />
    </div>
  );
};
