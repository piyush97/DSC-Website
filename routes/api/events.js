const express = require('express');
const router = express.Router();

//Event model
const Event = require('../../models/Event');

// @route   GET api/events
// @desc    Get all events
// @access  Public
router.get('/', (req, res) => {
    Event.find()
        .sort({ date: -1 })
        .then(events => res.json(events))
});

// @route   POST api/events
// @desc    Add new post
// @access  Public
// TODO: Make it private
router.post('/', (req, res) => {
    const newEvent = new Event({
        name: req.body.name,
        eventID: req.body.eventID
    })
    newEvent.save().then(event => res.json(event));

});

// @route   DELETE api/events
// @desc    Delete a post
// @access  Public
// TODO: Make it private
router.delete('/:id', (req, res) => {
    Event.findById(req.params.id)
        .then(event => event.remove().then(() => res.json({ Success: true })))
        .catch(err => res.status(404).json({ Success: false }))

});

module.exports = router;