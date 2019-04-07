import React, { Component } from 'react';

import Modal from '../components/Modal/Modal'
import {Backdrop} from '../components/Modal/Backdrop'
import {EventList} from '../components/Events/EventList'
import AuthContext from '../context/auth-context';
import {Spinner} from '../components/Spinner/Spinner'

class EventsPage extends Component {

    state={
        modalOpen: false,
        fetchedEvents: [],
        isLoading: false,
        selectedEvent: null
    };
    //Property to check if component is active (cleanup)
    isActive = true;

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.titelRef = React.createRef();
        this.priceRef = React.createRef();
        this.dateRef = React.createRef();
        this.descriptionRef = React.createRef();
    }
    //LifecycleMethods
    componentDidMount() {
        this.fetchEvents();
    }
    componentWillUnmount() {
    this.isActive = false;
    }

    fetchEvents() {
        this.setState({isLoading:true});
        const requestBody = {
            query: `
            query {
                events {
                    _id
                    title
                    description
                    date
                    price
                    creator {
                        _id
                        email
                    }
                }
            }`
        };

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
            'Content-Type':'application/json'
            }
        })
        .then(res => {
            if(res.status !==200 && res.status !== 201){ //throw error when status is not ok
                throw new Error('connection failed!');
            }
            return res.json();
        })
        .then(resData => {
            const events = resData.data.events;
            if (this.isActive) {
                this.setState({fetchedEvents: events, isLoading:false});
            }
        })
        .catch(err => {
            console.log(err);
            if (this.isActive) {
                this.setState({isLoading:false});
            }
        })
    }  

    openModalHandler = () => {
        this.setState({modalOpen: true});
    };
    closeModalHandler = () => {
        this.setState({modalOpen: false, selectedEvent: null});
    };
    confirmModalHandler = () => {
        const title = this.titelRef.current.value;
        const price = +this.priceRef.current.value;
        const date = this.dateRef.current.value;
        const description = this.descriptionRef.current.value;

        if (
            title.trim().length === 0 ||
            price < 0 ||
            date.trim().length === 0 ||
            description.trim().length === 0
        ) {
            console.log("enter valid Data")
            return;
        }
        this.setState({modalOpen: false});
        const requestBody = {
                query: `
                mutation CreateEvent ($title: String!, $desc:String!, $price: Float!, $date: String!){
                    createEvent(eventInput:{
                        title: $title,
                        price: $price,
                        description: $desc,
                        date: $date
                    
                    }) {
                        _id
                        title
                        description
                        date
                        price
                    }
                }`,
                variables: {
                    title: title,
                    desc: description, 
                    price: price,
                    date: date
                }
        };

        const token = this.context.token;
        
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
            'Content-Type':'application/json',
            Authorization: 'Bearer '+ token
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
                const updatedEvents = [...prevState.fetchedEvents];
                updatedEvents.push({
                    _id: resData.data.createEvent._id,
                    title: resData.data.createEvent.title,
                    description: resData.data.createEvent.description,
                    date: resData.data.createEvent.date,
                    price: resData.data.createEvent.price,
                    creator: {
                        _id: this.context.userId
                    }
                });
                return {fetchedEvents: updatedEvents}
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    showDetailHandler = eventId => {
        this.setState(prevState => {
            const selectedEvent = prevState.fetchedEvents.find(e => e._id === eventId)
            return {selectedEvent: selectedEvent}
        })
    }
    bookEventHandler = () => {
        if(!this.context.token) {
            this.setState({selectedEvent: null}) 
            return;
        }
        const requestBody = {
            query: `
             mutation BookEvent ($id: ID!) {
                bookEvent (eventId: $id) {
                    _id
                    createdAt
                    updatedAt
                }
            }`,
            variables: {
                id: this.state.selectedEvent._id
            }
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
            console.log(resData);
            this.setState({selectedEvent: null}) 
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
                
        return (
            <React.Fragment>
                {(this.state.modalOpen || this.state.selectedEvent) && <Backdrop/>}
                {this.state.modalOpen &&
                <Modal title="Add Event"
                    canCancel
                    canConfirm
                    onCancel={this.closeModalHandler}
                    onConfirm={this.confirmModalHandler}
                    confirmText={'Create Event'}
                >
                    <form>
                        <div className="form-control">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" ref={this.titelRef}/>

                            <label htmlFor="date">Date</label>
                            <input type="datetime-local" id="date" ref={this.dateRef}/>

                            <label htmlFor="price">Price</label>
                            <input type="number" id="price" ref={this.priceRef}/>

                            <label htmlFor="description">Description</label>
                            <textarea id="description" rows="4" ref={this.descriptionRef}></textarea>
                        </div>
                    </form>
                </Modal>}
                {this.state.selectedEvent && <Modal
                    title={this.state.selectedEvent.title}
                    canCancel
                    canConfirm
                    onCancel={this.closeModalHandler}
                    onConfirm={this.bookEventHandler}
                    confirmText={this.context.token ? 'Book Event' : 'go to Login'}>
                        <div>
                            <p>price: {this.state.selectedEvent.price}</p>
                            <p>Date: {this.state.selectedEvent.date}</p>
                            <p>Description: {this.state.selectedEvent.description}</p>
                        </div>
                    </Modal>}

                <div>
                    <h1>The Events Page</h1>
                    {this.context.token && <button className="btn" onClick={this.openModalHandler}>
                        Create Event
                    </button>}
                </div>
                {this.state.isLoading ? <Spinner/> : <EventList
                    events={this.state.fetchedEvents}
                    authUserId={this.context.userId}
                    onViewDetail={this.showDetailHandler}/>}
            </React.Fragment>
        )
        
    }
}

export default EventsPage;