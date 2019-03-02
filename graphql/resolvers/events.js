//Import models
const Event = require('../../models/event');
const User = require('../../models/user');
//Import helpers
const {transformedEvent} = require('./utils')

module.exports = {
    events: async () => {
        try {
        const events = await Event.find();
            return events.map(event => {
                //_doc is a mongoose feature that returns the MongoDB data without unnessecary metadata
                //event.id is another mongoose feature that reaturns the id as string and not as object id. But it seems that it now works automaticly?
                return transformedEvent(event);
            })
        }
        catch(err) {
            throw err;
        }
    },
    createEvent: async (args, req) => {
        if (!req.isAuth){
            throw new Error('You must be logged in to create an event')
        }
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: req.userId
        });
        let createdEvent;
        try {
        const result = await event.save()
            createdEvent = transformedEvent(result);
            const creator = await User.findById(req.userId); 

            if (!creator) {
                throw new Error ('User not found.')
            }
            creator.createdEvents.push(event._id); //let mongoose handle the update of the user
            await creator.save();

            return createdEvent;
        }
        catch(err) {
            console.log(err)
            throw err
        }
    }
}