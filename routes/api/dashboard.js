const express = require('express');
const { ensureAuthenticated } = require('../../config/auth');

const router = express.Router();

router.get('/', ensureAuthenticated, (req, res) => {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render('dashboard', { username: req.user.name });
});

module.exports = router;