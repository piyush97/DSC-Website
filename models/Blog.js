const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Creating schema
const BlogSchema = new Schema({
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
    }
});

// TODO: Add support for variable no. of images and contact and host details.

// This determines the collection where the data is stored
module.exports = Blog = mongoose.model('blog', BlogSchema);