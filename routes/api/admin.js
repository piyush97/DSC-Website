const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../../models/User');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../../public/login.html'));
})

router.get('/register', (req, res) => {
    // TODO: Add registration page
    res.send('New admin registration');
})

router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;

    let errors = [];

    //Check all fields are filled
    if (!(name && email && password && password2)) {
        errors.push({ msg: 'Please fill in all the details' });
    }

    //Check passwords match
    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //Check if password is at least 6 characters long
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters long' });
    }

    if (errors.length > 0) {
        // TODO: Render the page again with existing credentials in place
        res.send(errors);
    }
    else {
        User.findOne({ email: email })
            .then(user => {

                //If user exists
                if (user) {
                    // TODO: Render the original page again
                    errors.push({ msg: 'User already exists' });
                    res.send(errors);
                }

                //Creating new user
                else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err)
                                throw err;

                            //Set password to hashed
                            newUser.password = hash;

                            //Save the user
                            newUser.save()
                                .then(user => res.send("Registered successfully"))
                                .catch(err => console.log(err));
                        }))
                }
            });
    }
})




module.exports = router;