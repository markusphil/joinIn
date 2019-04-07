import React, { Component } from 'react';
import {Spinner} from '../components/Spinner/Spinner'
import {BookingList} from '../components/Bookings/BookingList'
import {BookingChart} from '../components/Bookings/BookingChart'
import {BookingTabs} from '../components/Bookings/BookingTabs'
import AuthContext from '../context/auth-context';

class BookingsPage extends Component {
    state = {
        isLoading: false,
        bookings: [],
        activeTab: "list"
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
    deleteBookingHandler = bookingId => {

        const requestBody = {
            query: `
             mutation CancelBooking($id: ID!) {
                cancelBooking (bookingId: $id) {
                _id
                title        
                }
            }`,
            variables: {id: bookingId}
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
            this.setState(prevState => {
                const updatedBookings = prevState.bookings.filter( booking => {
                    return booking._id !== bookingId;
                });
                return { bookings: updatedBookings}
            });
            console.log(resData);
        })
        .catch(err => {
            console.log(err);
        })
    };

    changeTabHandler = activeTab => {
        if (activeTab === "list") {
            this.setState({activeTab: "list"})
        } else {
            this.setState({activeTab: "chart"})
        }
    }

    render() {

        let content = <Spinner />;
        if (!this.state.isLoading) {
            content = (
                <React.Fragment>
                    <BookingTabs 
                        activeTab = {this.state.activeTab}
                        onChange = {this.changeTabHandler}    
                    />
                    {this.state.activeTab === "list" ?
                    <BookingList
                        bookings={this.state.bookings}
                        onDelete={this.deleteBookingHandler}
                    /> : <BookingChart/>}
                </React.Fragment>
            )
        }
        return (
        <React.Fragment>
            <h1>The Bookings Page</h1>
            {content}
        </React.Fragment>
        
        )
        
    }
}

export default BookingsPage;