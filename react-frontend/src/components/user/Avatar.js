import React from "react";
import classnames from "classnames";

export const Avatar = props => {
  return (
    <div className={classnames("avatar-ring", props.type)}>
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
