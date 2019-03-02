const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    //linking user to events. [] because one user can create multiple Events
    createdEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: "Event"
        }
    ]
});
//Exports node.js way
module.exports = mongoose.model('User', userSchema)