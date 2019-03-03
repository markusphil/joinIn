import React, { Component } from 'react';

import Modal from '../components/Modal/Modal'
import {Backdrop} from '../components/Modal/Backdrop'

class EventsPage extends Component {

    state={
        modalOpen: false
    }

    openModalHandler = () => {
        this.setState({modalOpen: true});
    };
    closeModalHandler = () => {
        this.setState({modalOpen: false});
    };


    render() {
        return (
            <React.Fragment>
                {this.state.modalOpen && <React.Fragment>
                <Backdrop/>
                <Modal title="Add Event" canCancel canConfirm onCancel={this.closeModalHandler}>
                    <p>Modal content</p>
                </Modal>
                </React.Fragment>}
                <div>
                    <h1>The Events Page</h1>
                    <button onClick={this.openModalHandler}>
                        Create Event
                    </button>
                </div>
            </React.Fragment>
        )
        
    }
}

export default EventsPage;