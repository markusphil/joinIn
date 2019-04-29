//Import helpers
const { singleUser } = require("./utils");

module.exports = {
  user: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("You must be logged in see created Events");
    }
    try {
      return (user = await singleUser(req.userId));
    } catch (err) {
      throw err;
    }
  }
};
