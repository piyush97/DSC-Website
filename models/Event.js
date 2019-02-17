const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Creating schema
const EventSchema = new Schema({
    name: {
        type: String,
        // TODO: Make unique true during production
        //unique: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    day: {
        type: String,
        required: true,
        default: "Saturday"
    },
    time: {
        type: String,
        default: "12:00"
    },
    venue: {
        type: String,
        default: "TBD",
    },
    host: {
        type: String,
        default: "DSC-RIT"
    },
    description: {
        type: String,
        default: ""
    },
    contact: {
        name: {
            type: String
        },
        phone: {
            type: Number
        },
        email: {
            type: String
        }
    },
    image: {
        url: {
            type: String
        },
        id: {
            type: String
        }
    }
});

// TODO: Add support for variable no. of images and contact and host details.

// This determines the collection where the data is stored
module.exports = Event = mongoose.model('event', EventSchema);