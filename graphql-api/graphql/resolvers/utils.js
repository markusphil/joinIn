//Import helpers
const {dateToString} = require('../../helpers/date');

//Import Models
const Event = require('../../models/event');
const User = require('../../models/user');

//Outsourced output transformation for event and booking
const transformedEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event.creator)
    };
}

const transformedBooking = booking => {
    return {
        ...booking._doc,
        _id: booking.id,
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt),
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event)
    };
}

//custom merger functions taht add more flexibility then mongoose's .populate() method 
const events = async eventIds => {
    try {
    const events = await Event.find({_id: {$in: eventIds} });
    return events.map(event => {
            return transformedEvent(event);
    });
    }
    catch(err) {
        throw err;
    }
};

const singleEvent = async eventId => {
    try {
    const event = await Event.findOne(eventId);
        return transformedEvent(event);
    }
    catch(err) {
        throw err;
    }
};

const user = async userId => {
    try {
    const user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id,
            createdEvents: events.bind(this, user._doc.createdEvents)
        }
    }
     catch(err) {
            throw err;
        }
};

exports.transformedEvent = transformedEvent;
exports.transformedBooking = transformedBooking;
