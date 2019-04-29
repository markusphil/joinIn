import React, { useContext, useState, useEffect } from "react";

import GlobalContext from "../../context/main-context";

import Modal from "../core/Modal";
import { bookEventRequest } from "../../requests/bookEvent";
import { cancelBookingRequest } from "../../requests/cancelBooking";
import { fetchBookings } from "../../context/fetchBookings";
import { DetailsBody } from "./EventDetails/DetailsBody";
import { DetailsControl } from "./EventDetails/DetailsControl";

/*this component handles a big chunk of the app's logic and therfore should become a page instead.
  But to archive that, I'll need dynamic routing and a good amount of restructuring. So for now I will focus on getting all functionality working...
  and use this component to practise Hooks :)*/

export const EventDetails = props => {
  const { closeModal, history } = props;

  const context = useContext(GlobalContext);

  const [relatedBooking, setRelatedBooking] = useState(null);
  const [showVisitors, setShowVisitors] = useState(false);

  useEffect(() => {
    if (context.selectedEvent.attendees.some(x => x._id === context.userId)) {
      getRelatedBooking();
    }
  }, [context.bookings]);

  const getRelatedBooking = async () => {
    let fetchedBookings = null;
    //fetch bookings if aren't fetched allready
    if (context.bookings.length === 0) {
      fetchedBookings = await fetchBookings(context);
    } else {
      fetchedBookings = context.bookings;
    }
    let booking = fetchedBookings.find(
      x => x.event._id === context.selectedEvent._id
    );
    setRelatedBooking(booking);
  };

  const bookEventHandler = () => {
    if (!context.token) {
      closeModal();
      history.push("/auth");
      return;
    }

    bookEventRequest(
      context.selectedEvent._id,
      context.token,
      context.checkExpiration
    )
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
        context.updateMessage(
          "success",
          "You joined Event: " + context.selectedEvent.title
        );
      })
      .catch(err => {
        context.updateMessage("error", err.message);
      });
  };

  const cancelBookingHandler = async () => {
    //calling request
    cancelBookingRequest(
      relatedBooking._id,
      context.token,
      context.checkExpiration
    ).catch(err => {
      context.updateMessage("error", err.message);
    });
    //update the global bookings state
    const updatedBookings = context.bookings.filter(booking => {
      return booking._id !== relatedBooking._id;
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
    context.updateMessage("success", "you left the event");
    closeModal();
    //display message
  };

  const showVisitorsHandler = () => {
    let newState = !showVisitors;
    setShowVisitors(newState);
  };

  return (
    <React.Fragment>
      <Modal title={context.selectedEvent.title} onCancel={props.closeModal}>
        <DetailsBody
          selectedEvent={context.selectedEvent}
          userId={context.userId}
          relatedBooking={relatedBooking}
          showVisitors={showVisitors}
          showVisitorsHandler={showVisitorsHandler}
        />

        <DetailsControl
          context={context}
          relatedBooking={relatedBooking}
          bookEvent={bookEventHandler}
          cancelBooking={cancelBookingHandler}
        />
      </Modal>
    </React.Fragment>
  );
};
