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
        default: "2018-01-01",
        required: true
    },
    venue: {
        type: String,
        default: "TBD",
    },
    host: {
        type: [String],
        default: "DSC-RIT"
    },
    contact: {
        type: [String]
    },
    details: {
        description: {
            type: String,
            default: '-'
        },
        image: {
            type: String,
            default: "-"
        }
    }
});

// TODO: Add support for variable no. of images and contact and host details.

// This determines the collection where the data is stored
module.exports = Event = mongoose.model('event', EventSchema);