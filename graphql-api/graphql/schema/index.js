const { buildSchema } = require("graphql");

module.exports = buildSchema(`
        type Booking {
            _id: ID!
            event: Event!
            user: User!
            createdAt: String!
            updatedAt: String!
        }

        type Event {
            _id: ID!
            title: String!
            description: String!
            location: String!
            date: String!
            creator: User!
            attendees: [User!]
            teaserImage: String
        }

        type User {
            _id: ID!
            name: String!
            password: String!
            createdEvents: [Event!]
            profilePic: String
        }

        type AuthData {
            userId: ID!
            token: String!
            tokenExpiration: Int!
            userName: String!
            profilePic: String!
        }

        input EventInput {
            title: String!
            description: String!
            location: String!
            date: String!
            teaserImage: String
        }

        input UserInput {
            name: String!
            password: String!
            profilePic: String
            
        }

        type RootQuery {
            events: [Event!]!
            bookings: [Booking!]!
            login(name: String!, password: String!): AuthData!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
            bookEvent(eventId: ID!): Booking!
            cancelBooking(bookingId: ID!): Event!
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
     `);
