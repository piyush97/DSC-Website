const express = require('express');
const path = require('path');

const router = express.Router();

// TODO: make sure to handle css responses too
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});


module.exports = router;