//Import models
const Event = require("../../models/event");
const User = require("../../models/user");
//Import helpers
const { transformEvent, userLoader } = require("./utils");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();

      return events.map(event => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("You must be logged in to create an event");
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      location: args.eventInput.location,
      date: new Date(args.eventInput.date),
      teaserImage: args.eventInput.teaserImage,
      creator: req.userId
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error("User not found.");
      }
      creator.createdEvents.push(event._id); //let mongoose handle the update of the user
      await creator.save();
      userLoader.clearAll();
      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
