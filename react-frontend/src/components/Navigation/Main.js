import React from 'react';
import {NavLink} from 'react-router-dom';

import AuthContext from '../../context/auth-context'
import './Main.css';

export const MainNavigation = props => (
    <AuthContext.Consumer>
    { context => {     //Context Consumer needs function as child, wich reuturns the component
        
        return (
            <header className="main-nav">
                <div className="main-nav-logo">
                    <h1>EventMon</h1>
                </div>
                <nav className="main-nav-items">
                    <ul>
                        <li><NavLink to="/events">Events</NavLink></li>
                        {context.token && (
                        <React.Fragment>
                        <li><NavLink to="/bookings">Bookings</NavLink></li>
                        <li onClick={context.logout}><button>Logout</button></li>
                        </React.Fragment>
                        )}
                        {!context.token && (
                        <li><NavLink to="/auth">Login</NavLink></li>
                        )}
                    </ul>
                </nav>
            </header>
        );    
    }}
    </AuthContext.Consumer>
)
