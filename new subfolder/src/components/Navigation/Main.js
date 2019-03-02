import React from 'react';
import {NavLink} from 'react-router-dom';

import './Main.css';

export const MainNavigation = props => (
    <header className="main-nav">
        <div className="main-nav-logo">
            <h1>EventMon</h1>
        </div>
        <nav className="main-nav-items">
            <ul>
                <li><NavLink to="/events">Events</NavLink></li>
                <li><NavLink to="/bookings">Bookings</NavLink></li>
                <li><NavLink to="/auth">Login</NavLink></li>
            </ul>
        </nav>
    </header>
)
