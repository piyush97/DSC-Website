const express = require('express');
const router = express.Router();

//Item model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

// @route   POST api/items
// @desc    Add new post
// @access  Public
// TODO: Make it private
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        eventID: req.body.eventID
    })
    newItem.save().then(item => res.json(item));

});

// @route   DELETE api/items
// @desc    Delete a post
// @access  Public
// TODO: Make it private
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ Success: true })))
        .catch(err => res.status(404).json({ Success: false }))

});

module.exports = router;