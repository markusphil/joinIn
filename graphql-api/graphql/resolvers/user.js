//Import models
const User = require("../../models/user");

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
  },

  changeUserInfo: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("You must be logged in to change user info");
    }
    try {
      const updatedUser = await User.findById(req.userId);
      updatedUser.profilePic = args.profilePic;
      const result = await updatedUser.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  }
};
