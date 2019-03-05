import React from 'react';

export const BookingList = props => (
    <ul className="data-list">
    {props.bookings.map(booking => {
        return (
        <li className="data-card" key={booking._id}>
            <div>
             <h3>{booking.event.title}</h3>
                <p>Date: {new Date (booking.event.date).toLocaleDateString()} - Booked at: {new Date(booking.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
                <button className="btn" onClick={props.onDelete.bind(this, booking._id)}>
                    Cancel
                </button>
            </div>
        </li>
        ); 
    })}
    </ul>)
    
    