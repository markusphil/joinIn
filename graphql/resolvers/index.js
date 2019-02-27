const bcrypt= require('bcryptjs')

//Import modules
const Event = require('../../models/event');
const User = require('../../models/user')

//custom merger functions taht add more flexibility then mongoose's .populate() method 
const events = async eventIds => {
    try {
    const events = await Event.find({_id: {$in: eventIds} });
    return events.map(event => {
            return {
                ...event._doc,
                _id: event.id,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, event.creator)
            };
    });
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

module.exports = {
    events: async () => {
        try {
        const events = await Event.find();
            return events.map(event => {
                //_doc is a mongoose feature that returns the MongoDB data without unnessecary metadata
                //event.id is another mongoose feature that reaturns the id as string and not as object id. But it seems that it now works automaticly?
                return {
                    ...event._doc,
                    _id: event.id,
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event._doc.creator)}
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
            createdEvent = {
                ...result._doc,
                _id: result.id,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, result._doc.creator)
            };
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
    },
    createUser: async args => {
        //prevent the creation of mulitple users with same e-mail
        try {
        const existingUser = await User.findOne({email: args.userInput.email})
            if (existingUser) {
                throw new Error ('User already exists.')
            }
            //using becrypt to create hashed password
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
            
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await user.save();    
                //setting password to null so that it can't be retrieved.
                return {...result._doc, password:null, _id: result.id}
        }
        catch(err){
                throw err
            }
    }
 }