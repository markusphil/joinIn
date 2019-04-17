import React from "react";

export const Avatar = props => {
  return (
    <div className="avatar-ring">
      <div
        className="avatar-img"
        style={
          props.img
            ? { backgroundImage: `url("${props.img}")` }
            : {
                backgroundImage: `url("https://www.cw-enerji.com/wp-content/uploads/2016/08/avatar-placeholder.png")`
              }
        }
      />
    </div>
  );
};
