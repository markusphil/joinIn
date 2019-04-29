//Import models
const Event = require("../../models/event");
const Booking = require("../../models/booking");
//Import helpers
const { transformBooking, transformEvent } = require("./utils");

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("You must be logged in to see bookings");
    }
    try {
      const bookings = await Booking.find({ user: req.userId });
      return bookings.map(booking => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("You must be logged in to join an event");
    }
    const fetchedEvent = await Event.findOne({ _id: args.eventId });
    if (fetchedEvent.attendees.some(x => x == req.userId)) {
      throw new Error("You already joined this event");
    }
    const booking = new Booking({
      user: req.userId,
      event: fetchedEvent._id
    });
    const result = await booking.save();
    fetchedEvent.attendees.push(req.userId);
    await fetchedEvent.save();
    return transformBooking(result);
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("You must be logged in to cancel a booking");
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const unbookedEvent = booking.event;
      unbookedEvent.attendees = unbookedEvent.attendees.filter(
        x => x != req.userId
      );
      await unbookedEvent.save();
      await Booking.deleteOne({ _id: args.bookingId });
      return transformEvent(unbookedEvent);
    } catch (err) {
      throw err;
    }
  }
};
