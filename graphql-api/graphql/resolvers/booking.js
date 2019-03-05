
//Import models
const Event = require('../../models/event');
const Booking = require('../../models/booking');
//Import helpers
const {transformedBooking, transformedEvent} = require('./utils')

module.exports = {
    bookings: async (args, req) => {
        if (!req.isAuth){
            throw new Error('You must be logged in to see bookings')
        }
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformedBooking(booking)
            });
        } catch(err) {
            throw err;
        }
    },
    bookEvent: async (args, req) => {
        if (!req.isAuth){
            throw new Error('You must be logged in to book an event')
        }
        const fetchedEvent = await Event.findOne({ _id: args.eventId });
        const booking = new Booking({
            user: req.userId,
            event: fetchedEvent
        });
        const result = await booking.save();
        return transformedBooking(result);
    },
    cancelBooking: async (args, req) => {
        if (!req.isAuth){
            throw new Error('You must be logged in to cancel a booking')
        }
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            const unbookedEvent = transformedEvent(booking.event);
            await Booking.deleteOne({_id: args.bookingId});
            return unbookedEvent;
        }catch(err){
                throw err
        }
    }
 };