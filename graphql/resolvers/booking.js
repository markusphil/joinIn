
//Import models
const Event = require('../../models/event');
const Booking = require('../../models/booking');
//Import helpers
const {transformedBooking, transformedEvent} = require('./utils')

module.exports = {
    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformedBooking(booking)
            });
        } catch(err) {
            throw err;
        }
    },
    bookEvent: async args => {
        const fetchedEvent = await Event.findOne({ _id: args.eventId });
        const booking = new Booking({
            user: '5c7670b73f33bd2c880883b4',
            event: fetchedEvent
        });
        const result = await booking.save();
        return transformedBooking(result);
    },
    cancelBooking: async args => {
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