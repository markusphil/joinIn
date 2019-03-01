//Import resolvers
const authResolver = require('./auth');
const bookingResolver = require('./booking');
const eventsResolver = require('./events');

module.exports = rootResolver = {
    ...authResolver,
    ...eventsResolver,
    ...bookingResolver,
};