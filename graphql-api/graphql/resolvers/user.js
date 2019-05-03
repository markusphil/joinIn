//Import models
const User = require("../../models/user");

//Import helpers
const { singleUser, userLoader } = require("./utils");

module.exports = {
  user: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("You must be logged in see created Events");
    }
    try {
      const user = await singleUser(req.userId);
      return user;
    } catch (err) {
      throw err;
    }
  },

  updateUserInfo: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("You must be logged in to change user info");
    }
    try {
      const updatedUser = await User.findById(req.userId);
      updatedUser.profilePic = args.profilePic;
      const result = await updatedUser.save();
      userLoader.clearAll();
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  }
};
