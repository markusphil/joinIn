//Import Dataloader
const DataLoader = require("dataloader");

//Import helpers
const { dateToString } = require("../../helpers/date");

//Import Models
const Event = require("../../models/event");
const User = require("../../models/user");

//Loaders
const eventLoader = new DataLoader(eventIds => {
  return events(eventIds);
});
const userLoader = new DataLoader(userIds => {
  return users(userIds);
});

//output transformations
const transformEvent = event => {
  return {
    ...event._doc, //._doc is a mongoose feature that returns the MongoDB data without unnessecary metadata
    _id: event.id, //.id is another mongoose feature that reaturns the id as string and not as object id.
    date: dateToString(event._doc.date),
    creator: singleUser.bind(this, event.creator.toString()),
    attendees: () =>
      userLoader.loadMany(event._doc.attendees.map(x => x.toString()))
  };
};

const transformBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
    user: singleUser.bind(this, booking._doc.user.toString()),
    event: singleEvent.bind(this, booking._doc.event.toString())
  };
};
const transformUser = user => {
  return {
    ...user._doc,
    _id: user.id,
    createdEvents: () =>
      eventLoader.loadMany(user._doc.createdEvents.map(x => x.toString()))
  };
};

//custom merger functions that add more flexibility then mongoose's .populate() method
const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.sort((x, y) => {
      return (
        eventIds.indexOf(x._id.toString()) - eventIds.indexOf(y._id.toString())
      );
    });
    return events.map(event => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const users = async userIds => {
  try {
    const userList = await User.find({ _id: { $in: userIds } });
    userList.sort((x, y) => {
      return (
        userIds.indexOf(x._id.toString()) - userIds.indexOf(y._id.toString())
      );
    });
    return userList.map(user => {
      return transformUser(user);
    });
  } catch (err) {
    throw err;
  }
};

//using eventloader vor single ids
const singleEvent = async eventId => {
  try {
    const event = await eventLoader.load(eventId);
    return event;
  } catch (err) {
    throw err;
  }
};
const singleUser = async userId => {
  try {
    const user = await userLoader.load(userId);
    return user;
  } catch (err) {
    throw err;
  }
};

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
