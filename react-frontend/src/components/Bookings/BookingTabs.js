import React from 'react';

export const BookingTabs = props => (
    <div className="tabs-control">
        <button
            className={props.activeTab ==="list" ? "active" : ""}
            onClick= {props.onChange.bind(this, "list")}
        >List</button>
        <button 
            className={props.activeTab ==="chart" ? "active" : ""}
            onClick= {props.onChange.bind(this, "chart")}
            >Chart</button>
    </div>)