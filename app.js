//Imports (the node.js way)
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event');

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

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
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
                date: new Date(args.eventInput.date)
            });
            return event
            .save()
            .then(result => {
                console.log(result);
                return {...result._doc, _id: result._doc._id.toString()}
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

