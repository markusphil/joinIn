import React, { Component } from 'react';
import {Spinner} from '../components/Spinner/Spinner'
import AuthContext from '../context/auth-context';

class BookingsPage extends Component {
    state = {
        isLoading: false,
        bookings: []
    }
    static contextType  = AuthContext;

    componentDidMount() {
        this.fetchBookings();
    }

    fetchBookings = () => {
        this.setState({isLoading: true})
        const requestBody = {
            query: `
             query {
                bookings {
                    _id
                    createdAt
                    updatedAt
                    event {
                        _id
                        title
                        date
                        price
                    }
                }
            }`
        };

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
            'Content-Type':'application/json',
            Authorization: 'Bearer '+ this.context.token
            }
        })
        .then(res => {
            if(res.status !==200 && res.status !== 201){ //throw error when status is not ok
                throw new Error('connection failed!');
            }
            return res.json();
        })
        .then(resData => {
            const fetchedBookings = resData.data.bookings;
                this.setState({bookings: fetchedBookings, isLoading:false});
        })
        .catch(err => {
            console.log(err);
                this.setState({isLoading:false});
        })
    }

    render() {
        return (
        <React.Fragment>
            <h1>The Bookings Page</h1>
            {this.state.isLoading && <Spinner/>}
            {!this.state.isLoading && <ul className="data-list">{this.state.bookings.map(booking => (
                <li key={booking._id}> {booking.event.title} - Date: {new Date (booking.event.date).toLocaleDateString()} - Booked at: {new Date(booking.createdAt).toLocaleDateString()}</li>)
            )}</ul>}
        </React.Fragment>
        
        )
        
    }
}

export default BookingsPage;