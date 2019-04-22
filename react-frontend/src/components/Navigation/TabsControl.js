import React from "react";

export const TabsControl = props => (
  <div className="tabs-control">
    <button
      type={props.tab1}
      className={props.activeTab === true ? "active" : ""}
      onClick={props.onChange}
    >
      <h2>{props.tab1}</h2>
    </button>
    <button
      type={props.tab2}
      className={props.activeTab === false ? "active" : ""}
      onClick={props.onChange}
    >
      <h2>{props.tab2}</h2>
    </button>
  </div>
);
