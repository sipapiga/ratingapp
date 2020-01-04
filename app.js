const yelp = require('yelp-fusion');
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const flash = require('express-flash');
const flash = require('connect-flash');
const http = require('http');

const app = express();


const indexRoutes = require("./routes/index");
const usersRoutes = require('./routes/users');
const reviewRoutes = require('./routes/review');
const restaurantRoutes = require('./routes/restaurant');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const initiallizePassport = require('./config/passport');
initiallizePassport(passport);

app.use(express.json());
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true

}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use('/', indexRoutes);
app.use('/users', usersRoutes);
app.use('/reviews', reviewRoutes);
app.use('/restaurants', restaurantRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on ${port}`));
