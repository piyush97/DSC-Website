const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Admin login');
})

router.get('/register', (req, res) => {
    res.send('New admin registration');
})

router.post('/register', (req, res) => {
    console.log(req.body);
    res.send('Hello');
})




module.exports = router;