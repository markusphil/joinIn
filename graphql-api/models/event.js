const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    //Linking event to user. only one creator!
    creator: {
        type: Schema.Types.ObjectId,
            ref: "User"
    }
});
//Exports node.js way
module.exports = mongoose.model('Event', eventSchema)