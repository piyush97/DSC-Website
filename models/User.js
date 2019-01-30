const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Creating schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// This determines the collection where the data is stored
module.exports = User = mongoose.model('user', UserSchema);