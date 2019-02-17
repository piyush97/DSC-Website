const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const router = express.Router();

const User = require('../../models/User');
const { ensureAuthenticated } = require('../../config/auth');

// @route   GET admin/
// @desc    Displays the login page
// @access  Public
router.get('/', (req, res) => {
    res.render('login');
});

// @route   POST admin/
// @desc    Login
// @access  Public
router.post('/', (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/admin',
        //failureFlash: true
    })(req, res, next);
});

// @route   GET admin/logout
// @desc    Logs out the user
// @access  Public
router.get('/logout', ensureAuthenticated, (req, res) => {
    // TODO: Make private access
    req.logout();
    //req.flash('success_msg', 'You are logged out');
    res.redirect('/admin');
});

// @route   POST admin/register
// @desc    Creates a new user
// @access  Public
router.post('/register', ensureAuthenticated, (req, res) => {
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