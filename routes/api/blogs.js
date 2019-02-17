const express = require('express');
const router = express.Router();

//Blog model
const Blog = require('../../models/Blog');
const { ensureAuthenticated } = require('../../config/auth');


// @route   GET api/blogs
// @desc    Get all blogs
// @access  Public
router.get('/', (req, res) => {
    Blog.find()
        .sort({ date: -1 })
        .then(blogs => res.render('blogs', { blogs: blogs }))
        .catch(err => res.status(404).json(err))
});

// @route   POST api/blogs
// @desc    Add new post
// @access  Public
// TODO: Make it private
router.post('/', ensureAuthenticated, (req, res) => {
    const newBlog = new Blog({
        name: req.body.name
    })
    newBlog.save()
        .then(blog => res.json(blog))
        .catch(err => res.json(err));

});

// @route   DELETE api/blogs
// @desc    Delete a post
// @access  Public
// TODO: Make it private
router.delete('/:id', ensureAuthenticated, (req, res) => {
    Blog.findById(req.params.id)
        .then(blog => blog.remove().then(() => res.json({ Success: true })))
        .catch(err => res.status(404).json({ Success: false }))

});

module.exports = router;