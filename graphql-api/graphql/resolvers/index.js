//Import resolvers
const authResolver = require("./auth");
const bookingResolver = require("./booking");
const eventsResolver = require("./events");
const userResolver = require("./user");

module.exports = rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
  ...userResolver
};
