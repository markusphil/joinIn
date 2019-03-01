//Import models
const Event = require('../../models/event');
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
    createEvent: async args => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5c7670b73f33bd2c880883b4'
        });
        let createdEvent;
        try {
        const result = await event.save()
            createdEvent = transformedEvent(result);
            const creator = await User.findById('5c7670b73f33bd2c880883b4'); 

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