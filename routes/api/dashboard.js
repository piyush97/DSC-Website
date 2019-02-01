const express = require('express');
const path = require('path');
const { ensureAuthenticated } = require('../../config/auth');

const router = express.Router();

router.get('/', ensureAuthenticated, (req, res) => {
    res.send('Dashboard displayed');
});

module.exports = router;