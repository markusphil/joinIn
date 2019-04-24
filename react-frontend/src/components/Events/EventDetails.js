import React, { useContext } from "react";

import GlobalContext from "../../context/main-context";

import Modal from "../core/Modal";
import { Button } from "../buttons/ButtonMain";
import { bookEventRequest } from "../../requests/bookEvent";
import { cancelBookingRequest } from "../../requests/cancelBooking";
import { fetchBookings } from "../../context/fetchBookings";

/*this component handles a big chunk of the app's logic and therfore should become a page instead.
  But to archive that, I'll need dynamic routing and a good amount of restructuring. So for now I will focus on getting all functionality working...
  and use this component to practise Hooks :)*/

export const EventDetails = props => {
  const { closeModal, history } = props;

  const context = useContext(GlobalContext);

  const bookEventHandler = () => {
    if (!context.token) {
      closeModal();
      history.push("/auth");
      return;
    }

    bookEventRequest(context.selectedEvent._id, context.token)
      .then(resData => {
        //update the global event state
        let userData = {
          _id: context.userId,
          name: context.userName,
          profilePic: context.profilePic
        };
        let updatedEvents = [...context.events];
        updatedEvents
          .find(x => x._id === context.selectedEvent._id)
          .attendees.push(userData);
        context.updateEvents(updatedEvents);

        //update the global bookings state
        let updatedBookings = [...context.bookings];
        updatedBookings.push(resData.data.bookEvent);
        context.updateBookings(updatedBookings);

        closeModal();
        //display message!
      })
      .catch(err => {
        console.log(err);
      });
  };

  const cancelBookingHandler = async () => {
    /*
    maybe I should run this check in component did mount / useEffect
    set selected booking info to local state with hooks?
    then i could access it in render()
    */

    let fetchedBookings = null;
    //fetch bookings if aren't fetched allready
    if (context.bookings.length === 0) {
      fetchedBookings = await fetchBookings(context);
    } else {
      fetchedBookings = context.bookings;
    }
    let bookingId = fetchedBookings.find(
      x => x.event._id === context.selectedEvent._id
    )._id;
    console.log(bookingId);
    //--Cancel Booking Logic--

    cancelBookingRequest(bookingId, context.token);
    //update the global bookings state
    const updatedBookings = fetchedBookings.filter(booking => {
      return booking._id !== bookingId;
    });
    context.updateBookings(updatedBookings);

    //remove user from attendees Array of the event and update the global events state
    let updatedEvents = [...context.events];
    let userPosition = updatedEvents
      .find(x => x._id === context.selectedEvent._id)
      .attendees.findIndex(x => x._id === context.userId);
    updatedEvents
      .find(x => x._id === context.selectedEvent._id)
      .attendees.splice(userPosition, 1);
    context.updateEvents(updatedEvents);

    console.log("deleted booking");
    closeModal();
    //display message
  };

  const buttonTypeChecker = () => {
    if (!context.token) {
      return (
        <Button
          status="inactive"
          action={bookEventHandler}
          type="redirect_login"
        >
          to Login
        </Button>
      );
      //"to login" type = inactive action=redirect
    } else if (
      context.selectedEvent.attendees.some(x => x._id === context.userId)
    ) {
      return (
        <Button status="danger" action={cancelBookingHandler} type="cancel">
          Cancel
        </Button>
      );
      // "cancel "type= danger  action = cancelBooking handler
    } else if (context.selectedEvent.creator._id === context.userId) {
      return (
        <React.Fragment>
          <Button status="inactive" type="edit">
            edit
          </Button>
          <Button status="inactive" type="delete">
            delete
          </Button>
        </React.Fragment>
      );
    } else {
      return (
        <Button status="primary" action={bookEventHandler} type="join">
          Join
        </Button>
      );
      //"join" primary bookEventHandler
    }
  };

  return (
    <React.Fragment>
      <Modal title={context.selectedEvent.title} onCancel={props.closeModal}>
        <div>
          <p>location: {context.selectedEvent.location}</p>
          <p>Date: {context.selectedEvent.date}</p>
          <p>Description: {context.selectedEvent.description}</p>
        </div>

        <div className="modal-actions">{buttonTypeChecker()}</div>
      </Modal>
    </React.Fragment>
  );
};
