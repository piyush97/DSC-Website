const express = require('express');
const path = require('path');
const { ensureAuthenticated } = require('../../config/auth');

const router = express.Router();

router.get('/', ensureAuthenticated, (req, res) => {
    //res.send(`${req.user.name}`);
    res.sendFile(path.join(__dirname + '/../../public/dashboard_event.html'));
});

module.exports = router;