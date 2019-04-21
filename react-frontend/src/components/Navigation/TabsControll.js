import React from "react";

export const TabsControl = props => (
  <div className="tabs-control">
    <button
      className={props.activeTab === props.tab1 ? "active" : ""}
      onClick={props.onChange.bind(this, props.tab1)}
    >
      <h2>{props.tab1}</h2>
    </button>
    <button
      className={props.activeTab === props.tab2 ? "active" : ""}
      onClick={props.onChange.bind(this, props.tab2)}
    >
      <h2>{props.tab2}</h2>
    </button>
  </div>
);
