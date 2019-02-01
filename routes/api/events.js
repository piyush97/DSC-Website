const express = require('express');
const router = express.Router();

//Event model
const Event = require('../../models/Event');

// @route   GET /events
// @desc    Get all events
// @access  Public
router.get('/', (req, res) => {
    Event.find()
        .sort({ date: -1 })
        .then(events => res.json(events))
        .catch(err => res.status(404).json(err))
});

// @route   GET /events/hackathons
// @desc    Get all hackathons
// @access  Public
router.get('/hackathons', (req, res) => {
    Event.find({ type: 'Hackathon' })
        .sort({ date: -1 })
        .then(events => res.json(events))
        .catch(err => res.status(404).json(err))
});

// @route   POST api/events
// @desc    Add new post
// @access  Public
// TODO: Make it private
router.post('/', (req, res) => {
    console.log(req.body);
    const newEvent = new Event({
        name: req.body.name,
        kind: req.body.kind,
        date: req.body.date,
        venue: req.body.venue,
        host: req.body.host,
        contact: req.body.contact,
        details: req.body.details
    });
    newEvent.save()
        .then(event => res.json(event))
        .catch(err => res.json(err));

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