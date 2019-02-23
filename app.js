//Imports (the node.js way)
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql')

const app = express();

const events = [];

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
            return events;
        },
        createEvent: (args)=> {
            const event = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date
            };
            events.push(event);
            return event
        }
     },
     graphiql: true
    })
);

//define Port
app.listen(3000);