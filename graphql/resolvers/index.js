const bcrypt= require('bcryptjs')

//Import modules
const Event = require('../../models/event');
const User = require('../../models/user')

//custom merger functions taht add more flexibility then mongoose's .populate() method 
const events = eventIds => {
    return Event.find({_id: {$in: eventIds} })
    .then(events => {
        return events.map(event => {
            return {
                ...event._doc,
                _id: event.id,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, event.creator)};
        });
    })
    .catch(err => {
        throw err;
    })
};

const user = userId => {
    return User.findById(userId)
        .then(user => {
            return {...user._doc, _id: user.id, createdEvents: events.bind(this, user._doc.createdEvents ) }
        })
        .catch(err => {
            throw err;
        });
};

module.exports = {
    events: ()=> {
       return Event.find().then(events => {
            return events.map(event => {
                //_doc is a mongoose feature that returns the MongoDB data without unnessecary metadata
                //event.id is another mongoose feature that reaturns the id as string and not as object id. But it seems that it now works automaticly?
                return {
                    ...event._doc,
                    _id: event.id,
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event._doc.creator)}
            })
        }).catch(err => {
            throw err
        })
    },
    createEvent: args => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5c71b81104597b1694441f84'
        });
        let createdEvent;
        return event
        .save()
        .then(result => {
            createdEvent = {
                ...result._doc,
                _id: result.id,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, result._doc.creator)};
            return User.findById('5c71b81104597b1694441f84') 
        })
        .then(user => {
            if (!user) {
                throw new Error ('User not found.')
            }
            user.createdEvents.push(event._id); //let mongoose handle the update of the user
            return user.save();
        })
        .then(result => {
            return createdEvent;
        })
        .catch(err => {
            console.log(err)
            throw err
        });
    },
    createUser: args => {
        //prevent the creation of mulitple users with same e-mail
        return User.findOne({email: args.userInput.email})
            .then(user => {
                if (user) {
                    throw new Error ('User already exists.')
                }
            //using becrypt to create hashed password
                return bcrypt
                .hash(args.userInput.password, 12)
            })
            .then(hashedPassword => {
                const user = new User({
                    email: args.userInput.email,
                    password: hashedPassword
                });
                return user.save();
                
            })
            .then(result => {
                console.log(result);
                //setting password to null so that it can't be retrieved.
                return {...result._doc, password:null, _id: result.id}
            })
            .catch(err => {
                console.log(err)
                throw err
            });

    }
 }