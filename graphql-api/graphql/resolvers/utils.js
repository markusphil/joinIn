//Import Dataloader
const DataLoader = require('dataloader');

//Import helpers
const {dateToString} = require('../../helpers/date');

//Import Models
const Event = require('../../models/event');
const User = require('../../models/user');

//Loaders
const eventLoader = new DataLoader((eventIds) => {
    console.log('event Ids:', eventIds)
    return events(eventIds);
});
const userLoader = new DataLoader (userIds => {
    return User.find({_id: { $in: userIds}});
});
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

//custom merger functions that add more flexibility then mongoose's .populate() method 
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
    const event = await eventLoader.load(eventId.toString());
        return event;
    }
    catch(err) {
        throw err;
    }
};

const user = async userId => {
    try {
    const user = await userLoader.load(userId.toString());
        return {
            ...user._doc,
            _id: user.id,
            createdEvents: ()=> eventLoader.loadMany(user._doc.createdEvents)
        }
    }
     catch(err) {
            throw err;
        }
};

exports.transformedEvent = transformedEvent;
exports.transformedBooking = transformedBooking;
