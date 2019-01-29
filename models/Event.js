const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Creating schema
const EventSchema = new Schema({
    eventID: {
        required: true,
        unique: true,
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    venue: {
        type: String,
        default: "TBD",
    },
    host: {
        type: String,
        default: "DSC-RIT"
    },
    contact: {
        type: String
    }
    // details: {
    //     description: {
    //         type: String,
    //         default: '-'
    //     },
    //     image: {
    //         type: URL,
    //     }
    // }
});

// TODO: Add support for variable no. of images and contact and host details.

// This determines the collection where the data is stored
module.exports = Event = mongoose.model('event', EventSchema);