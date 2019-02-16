const express = require('express');
const router = express.Router();

//Event model
const Event = require('../../models/Event');

const { ensureAuthenticated } = require('../../config/auth');

// @route   GET /events
// @desc    Get all events
// @access  Public
router.get('/', (req, res) => {
    Event.find()
        .sort({ date: -1 })
        .then(events => res.json(events))
        .catch(err => res.status(404).json(err))
});

// @route   POST api/events
// @desc    Add new post
// @access  Private
router.post('/', ensureAuthenticated, (req, res) => {
    console.log(req.body);
    const newEvent = new Event({
        name: req.body.name,
        date: req.body.date,
        day: req.body.day,
        venue: req.body.venue,
        host: req.body.host,
        description: req.body.description,
        contact: {
            name: req.body.contact_name,
            phone: req.body.contact_phone,
            email: req.body.contact_email
        },
        image: req.body.image
    });
    newEvent.save()
        .then(event => res.json(event))
        .catch(err => res.json(err));

});

// @route   DELETE api/events
// @desc    Delete a post
// @access  Private
router.delete('/:id', ensureAuthenticated, (req, res) => {
    Event.findById(req.params.id)
        .then(event => event.remove().then(() => res.json({ Success: true })))
        .catch(err => res.status(404).json({ Success: false }))
});

module.exports = router;