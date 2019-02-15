const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const app = express();

const events = require('./routes/api/events');
const blogs = require('./routes/api/blogs');
const dashboard = require('./routes/api/dashboard');
const admin = require('./routes/api/admin');

// Passport config
require('./config/passport')(passport);

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Bodyparser middleware
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

// mongoose
//     .connect(db)
//     .then(() => console.log('Database connected!'))
//     .catch(err => console.log(err));

//Use routes
app.use('/events', events);
app.use('/blogs', blogs);
app.use('/admin', admin);
app.use('/dashboard', dashboard);
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));