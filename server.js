const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');


const app = express();
app.set('view engine', 'ejs');


const events = require('./routes/api/events');
const blogs = require('./routes/api/blogs');
const dashboard = require('./routes/api/dashboard');
const admin = require('./routes/api/admin');

//Event model
const Event = require('./models/Event');



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
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true })

//Use routes
app.get('/', (req, res) => {
    Event.find()
        .sort({ date: -1 })
        .then(events => res.render('index', { events: events }))
        .catch(err => res.status(404).json(err))
});
app.get('/team', (req, res) => {
    res.render('team');
});
app.use('/events', events);
app.use('/blogs', blogs);
app.use('/admin', admin);
app.use('/dashboard', dashboard);
app.use(express.static(__dirname + '/views'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
