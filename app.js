//Imports (the node.js way)
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt= require('bcryptjs')

//Import Modules
const Event = require('./models/event');
const User = require('./models/user')

const app = express();

//add bodyparser with json functionality
app.use(bodyParser.json());

app.use(
    '/graphql',
    graphqlHttp({
     schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type User {
            _id: ID!
            email: String!
            password: String
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input UserInput {
            email: String!
            password: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
     `),
     //bundle of all resolvers
     rootValue: {
        events: ()=> {
           return Event.find().then(events => {
                return events.map(event => {
                    //_doc is a mongoose feature that returns the MongoDB data without unnessecary metadata
                    return {...event._doc, _id: event.id}
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
                createdEvent = {...result._doc, _id: result.id};
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
     },
     graphiql: true
    })
);
//${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD} Parsing the passwort via env is not working somehow!
//Use mongoose to connect with MongoDB cluster
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:kH7ZFUffTx3R9v0q@graphql-tutorial-egoz3.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
    .then( () => {
        app.listen(3000);
    })
    .catch(err =>{console.log(err);})

